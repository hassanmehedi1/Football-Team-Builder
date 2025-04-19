import { apiFootballInstance } from "./axiosInstance";
import { API_CONFIG } from "../constants/config";

const { defaultLeagueId, defaultSeason, playersPerPage } = API_CONFIG;

export const getPlayers = async ({
  page = 1,
  search = "",
  league = defaultLeagueId,
  season = defaultSeason,
}) => {
  try {
    const params = {
      league,
      season,
      page,
      search: search || undefined,
    };

    console.log("Fetching players with params:", params);
    const response = await apiFootballInstance.get("/players", { params });

    const enrichedPlayers = (response.response || []).map((playerData) => ({
      ...playerData,
      marketValue: undefined,
    }));

    return {
      players: enrichedPlayers,
      paging: response.paging || { current: 1, total: 1 },
    };
  } catch (error) {
    console.error("Error fetching players from API-Football:", error);
    throw error;
  }
};

export const getPlayerDetails = async (playerId, season = defaultSeason) => {
  try {
    const params = { id: playerId, season };
    const response = await apiFootballInstance.get("/players", { params });
    const playerInfo = response.response?.[0];

    if (!playerInfo) {
      throw new Error(
        `Player with ID ${playerId} not found for season ${season}`
      );
    }

    return playerInfo;
  } catch (error) {
    console.error(`Error fetching details for player ${playerId}:`, error);
    throw error;
  }
};

export const getCountries = async () => {
  try {
    const response = await apiFootballInstance.get("/countries");
    return (response.response || [])
      .filter((c) => c.name)
      .sort((a, b) => a.name.localeCompare(b.name)); // Sorting alphabetically
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const getTeams = async (
  league = defaultLeagueId,
  season = defaultSeason
) => {
  try {
    const params = { league, season };
    const response = await apiFootballInstance.get("/teams", { params });
    return (response.response || [])
      .map((item) => item.team)
      .filter((t) => t.id && t.name)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error(
      `Error fetching teams for league ${league}, season ${season}:`,
      error
    );
    return [];
  }
};

export const getLeagues = async () => {
  try {
    const response = await apiFootballInstance.get("/leagues");
    return (response.response || [])
      .map((item) => item.league)
      .filter((l) => l.id && l.name)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching leagues:", error);
    return [];
  }
};
