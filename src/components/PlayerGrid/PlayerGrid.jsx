import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import PlayerCard from "./PlayerCard";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorMessage from "../Shared/ErrorMessage";
import FilterBar from "../Filters/FilterBar";
import PositionTabs from "../Filters/PositionTabs";
import { AppContext } from "../../contexts/AppContext";
import { getPlayers } from "../../api/apiFootball";
import { useDebounce } from "../../hooks/useDebounce";
import { extractPlayerData } from "../../utils/helpers";
import { mapPlayerPositionToType } from "../../constants/formations";

function PlayerGrid() {
  const { filters, searchTerm, isBuildingTeam } = useContext(AppContext);
  const [allPlayers, setAllPlayers] = useState([]); // Holds all fetched players *before* client-side filtering
  const [filteredPlayers, setFilteredPlayers] = useState([]); // Players currently displayed after filters
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialLoadComplete = useRef(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const debouncedFilters = useDebounce(filters, 300);

  const applyFilters = useCallback(
    (playersToFilter) => {
      const { position, country, club, ageRange, marketValueRange } =
        debouncedFilters;

      return playersToFilter.filter((pResponse) => {
        const p = extractPlayerData(pResponse);

        if (!p) return false; // Skip if data extraction fails

        // Position Filter
        let passPosition = true;
        if (position !== "All") {
          const playerPosType = mapPlayerPositionToType(p.position);
          const filterPosLower = position.toLowerCase();

          if (filterPosLower === "forwards")
            passPosition = playerPosType === "Forward";
          else if (filterPosLower === "midfielders")
            passPosition = playerPosType === "Midfielder";
          else if (filterPosLower === "defenders")
            passPosition = playerPosType === "Defender";
          else if (filterPosLower === "goalkeepers")
            passPosition = playerPosType === "Goalkeeper";
          else passPosition = false; // Fallback, shouldn't happen with current tabs
        }

        // Country Filter
        const passCountry = !country || p.nationality === country.name;

        // Club Filter
        const passClub = !club || p.clubId === club.id;

        // Age Range Filter
        const passAge =
          p.age === null || (p.age >= ageRange[0] && p.age <= ageRange[1]);

        // Market Value Range Filter
        const passValue =
          p.marketValue === null ||
          (p.marketValue >= marketValueRange[0] &&
            p.marketValue <= marketValueRange[1]);

        return passPosition && passCountry && passClub && passAge && passValue;
      });
    },
    [debouncedFilters]
  );

  const fetchPlayers = useCallback(
    async (currentPage, isNewSearchOrFilter = false) => {
      // Don't fetch from API if we're in team building view
      // if (isBuildingTeam) return;

      setLoading(true);
      setError(null);
      if (isNewSearchOrFilter) {
        setAllPlayers([]);
        setFilteredPlayers([]); // Clear filtered players too
        setHasMore(true); // Reset pagination state
      }

      try {
        const params = {
          page: currentPage,
          search: debouncedSearchTerm,
          league: filters.league, // Use league/season from filters
          season: filters.season,
        };

        const data = await getPlayers(params);

        // Append new players if loading more, otherwise replace
        setAllPlayers((prev) =>
          isNewSearchOrFilter ? data.players : [...prev, ...data.players]
        );

        setPage(data.paging.current + 1);
        setHasMore(data.paging.current < data.paging.total);
        initialLoadComplete.current = true; // Mark that we've loaded at least one page
      } catch (err) {
        setError("Failed to fetch players. Check API key or network.");
        console.error(err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearchTerm, filters.league, filters.season, isBuildingTeam]
  );

  useEffect(() => {
    // Fetch page 1 and reset lists (isNewSearchOrFilter = true)
    fetchPlayers(1, true);
  }, [fetchPlayers]);

  useEffect(() => {
    // Avoid filtering the initial empty array before the first fetch completes
    if (initialLoadComplete.current || allPlayers.length > 0) {
      const newlyFiltered = applyFilters(allPlayers);
      setFilteredPlayers(newlyFiltered);
    }
  }, [allPlayers, applyFilters]);

  const loadMorePlayers = () => {
    if (!loading && hasMore && !isBuildingTeam) {
      fetchPlayers(page); // Fetch next page (isNewSearchOrFilter = false by default)
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Filter Components */}
      <PositionTabs />
      <FilterBar />
      {error && <ErrorMessage message={error} />}
      <InfiniteScroll
        dataLength={filteredPlayers.length}
        next={loadMorePlayers}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage={
          !loading && filteredPlayers.length > 0 ? (
            <Typography
              sx={{ textAlign: "center", p: 3, color: "text.secondary" }}
            >
              <b>End of results.</b>
            </Typography>
          ) : null
        }
        style={{ overflow: "visible" }}
      >
        <Grid container spacing={2}>
          {filteredPlayers.length > 0
            ? filteredPlayers.map((playerResponse) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={4}
                  key={playerResponse.player.id}
                >
                  <PlayerCard player={playerResponse} />
                </Grid>
              ))
            : !loading &&
              initialLoadComplete.current && (
                <Grid item xs={12}>
                  <Typography
                    sx={{ textAlign: "center", p: 4, color: "text.secondary" }}
                  >
                    No players match the current filters.
                  </Typography>
                </Grid>
              )}
        </Grid>
      </InfiniteScroll>
      {/* Show central spinner only during initial load when list is empty */}
      {loading && filteredPlayers.length === 0 && <LoadingSpinner />}
    </Box>
  );
}

export default PlayerGrid;
