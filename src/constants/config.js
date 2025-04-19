/* eslint-disable no-undef */
export const API_CONFIG = {
  defaultLeagueId: process.env.VITE_DEFAULT_LEAGUE_ID || 39,
  defaultSeason: process.env.VITE_DEFAULT_SEASON || 2023,
  playersPerPage: 20,
};

export const TEAM_CONSTRAINTS = {
  MAX_PLAYERS_SAME_COUNTRY: 2,
  MAX_PLAYERS_SAME_CLUB: 2,
  MIN_BUDGET: 300, // In Millions
  MAX_BUDGET: 700, // In Millions
  MIN_AVG_AGE: 25.0,
  MAX_AVG_AGE: 27.0,
  TOTAL_PLAYERS: 11,
};
