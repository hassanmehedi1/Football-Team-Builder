import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { validateTeamConstraints } from "../utils/validation";
import { FORMATIONS, mapPlayerPositionToType } from "../constants/formations";
import { getCountries, getTeams } from "../api/apiFootball";
import { API_CONFIG } from "../constants/config";
import { extractPlayerData } from "../utils/helpers";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    position: "All",
    country: null,
    club: null,
    marketValueRange: [0, 250],
    ageRange: [16, 45],
    league: API_CONFIG.defaultLeagueId,
    season: API_CONFIG.defaultSeason,
  });

  const [isBuildingTeam, setIsBuildingTeam] = useState(false);
  const [team, setTeam] = useState({
    formation: null,
    players: {},
    budget: 0,
    averageAge: 0,
    constraintViolations: [],
    isComplete: false,
  });

  const [selectedPlayerModal, setSelectedPlayerModal] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const [availableCountries, setAvailableCountries] = useState([]);
  const [availableClubs, setAvailableClubs] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);

  useEffect(() => {
    const fetchFilterData = async () => {
      setLoadingFilters(true);
      try {
        const [countriesData, teamsData] = await Promise.all([
          getCountries(),
          getTeams(filters.league, filters.season),
        ]);
        setAvailableCountries(countriesData || []);
        setAvailableClubs(teamsData || []);
      } catch (error) {
        console.error("Failed to load filter data:", error);
      } finally {
        setLoadingFilters(false);
      }
    };
    fetchFilterData();
  }, [filters.league, filters.season]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      if (newFilters.league || newFilters.season) {
        updated.club = null;
      }
      return updated;
    });
    setSelectedSlotId(null);
  }, []);

  const openPlayerModal = useCallback((player) => {
    setSelectedPlayerModal(player);
  }, []);

  const closePlayerModal = useCallback(() => {
    setSelectedPlayerModal(null);
  }, []);

  const startTeamBuilding = useCallback(() => {
    setIsBuildingTeam(true);
    setSelectedSlotId(null);
    setTeam({
      formation: null,
      players: {},
      budget: 0,
      averageAge: 0,
      constraintViolations: [],
      isComplete: false,
    });
  }, []);

  const exitTeamBuilding = useCallback(() => {
    setIsBuildingTeam(false);
    setSelectedSlotId(null);
  }, []);

  const selectFormation = useCallback((formationKey) => {
    setTeam((prev) => ({
      ...prev,
      formation: formationKey,
      players: {},
      budget: 0,
      averageAge: 0,
      constraintViolations: [],
      isComplete: false,
    }));
    setSelectedSlotId(null);
  }, []);

  const selectTeamSlot = useCallback(
    (slotId) => {
      if (isBuildingTeam && team.formation && !team.players[slotId]) {
        setSelectedSlotId((prev) => (prev === slotId ? null : slotId));
      } else {
        setSelectedSlotId(null);
      }
    },
    [isBuildingTeam, team.formation, team.players]
  );

  const addPlayerToTeam = useCallback(
    (playerData) => {
      if (!team.formation || !selectedSlotId || !playerData) return;

      const formationDef = FORMATIONS[team.formation];
      if (!formationDef) return;

      const targetSlotDef = formationDef.slots.find(
        (s) => s.id === selectedSlotId
      );
      if (!targetSlotDef) return;

      const player = extractPlayerData(playerData);

      const playerType = mapPlayerPositionToType(player.position);
      if (playerType !== targetSlotDef.type && playerType !== "Unknown") {
        alert(
          `Cannot add ${player.name} (${playerType}) to a ${targetSlotDef.type} slot.`
        );
        console.warn(
          `Position mismatch: Player ${player.name} (${playerType}) cannot go into ${selectedSlotId} (${targetSlotDef.type})`
        );
        setSelectedSlotId(null);
        return;
      }
      if (Object.values(team.players).some((p) => p.id === player.id)) {
        alert(`${player.name} is already in the team.`);
        console.warn(
          `Player ${player.id} (${player.name}) is already in the team.`
        );
        setSelectedSlotId(null);
        return;
      }

      setTeam((prevTeam) => {
        const potentialNewPlayers = {
          ...prevTeam.players,
          [selectedSlotId]: player,
        };
        const potentialTeamState = {
          ...prevTeam,
          players: potentialNewPlayers,
        };

        const {
          isValid,
          violations,
          calculatedBudget,
          calculatedAvgAge,
          isComplete,
        } = validateTeamConstraints(potentialTeamState, formationDef);

        if (isValid) {
          setSelectedSlotId(null);
          return {
            ...potentialTeamState,
            budget: calculatedBudget,
            averageAge: calculatedAvgAge,
            constraintViolations: [],
            isComplete: isComplete,
          };
        } else {
          console.warn("Invalid pick:", violations);
          setSelectedSlotId(null);
          return { ...prevTeam, constraintViolations: violations };
        }
      });
    },
    [team.formation, selectedSlotId]
  );

  const removePlayerFromTeam = useCallback(
    (slotIdToRemove) => {
      setTeam((prevTeam) => {
        const { [slotIdToRemove]: removedPlayer, ...remainingPlayers } =
          prevTeam.players;
        if (!removedPlayer) return prevTeam;

        const formationDef = FORMATIONS[prevTeam.formation];
        if (!formationDef) return prevTeam;

        const updatedTeamState = { ...prevTeam, players: remainingPlayers };

        const { violations, calculatedBudget, calculatedAvgAge, isComplete } =
          validateTeamConstraints(updatedTeamState, formationDef);

        return {
          ...updatedTeamState,
          budget: calculatedBudget,
          averageAge: calculatedAvgAge,
          constraintViolations: violations,
          isComplete: isComplete,
        };
      });
      setSelectedSlotId(null);
    },
    [team.formation]
  );

  const contextValue = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      filters,
      updateFilters,
      availableCountries,
      availableClubs,
      loadingFilters,
      isBuildingTeam,
      startTeamBuilding,
      exitTeamBuilding,
      team,
      selectFormation,
      addPlayerToTeam,
      removePlayerFromTeam,
      selectedPlayerModal,
      openPlayerModal,
      closePlayerModal,
      selectedSlotId,
      selectTeamSlot,
    }),
    [
      searchTerm,
      filters,
      availableCountries,
      availableClubs,
      loadingFilters,
      isBuildingTeam,
      team,
      selectedPlayerModal,
      selectedSlotId,
      updateFilters,
      startTeamBuilding,
      exitTeamBuilding,
      selectFormation,
      addPlayerToTeam,
      removePlayerFromTeam,
      openPlayerModal,
      closePlayerModal,
      selectTeamSlot,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
