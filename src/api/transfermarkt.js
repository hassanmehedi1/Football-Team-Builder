/* eslint-disable no-undef */
import { transfermarktInstance } from "./axiosInstance";

export const getPlayerMarketValue = async (playerName, playerAge) => {
  if (
    !process.env.REACT_APP_RAPIDAPI_KEY ||
    !process.env.REACT_APP_TRANSFERMARKT_HOST
  ) {
    return null;
  }

  try {
    console.log(
      `Attempting to fetch market value for: ${playerName} (Age: ${playerAge})`
    );

    const response = await transfermarktInstance.get("/search", {
      params: {
        query: playerName,
      },
    });

    if (response && response.data && response.data.results) {
      const potentialMatch = response.data.results.find(
        (p) => p.age === playerAge
      );
      if (potentialMatch && potentialMatch.marketValue) {
        const valueString = potentialMatch.marketValue;
        const numericValue = parseFloat(valueString.replace(/[^0-9.]/g, ""));
        if (!isNaN(numericValue)) {
          if (valueString.toLowerCase().includes("m")) {
            return numericValue;
          } else if (valueString.toLowerCase().includes("k")) {
            return numericValue / 1000;
          }
          return numericValue;
        }
      }
    }

    console.warn(
      `Market value not found or parsed for ${playerName} on Transfermarkt.`
    );
    return null;
  } catch (error) {
    console.error(`Error fetching market value for ${playerName}:`, error);

    return null;
  }
};
