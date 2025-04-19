import axios from "axios";

// Instance for API-Football
const apiFootballInstance = axios.create({
  baseURL: `https://${import.meta.env.VITE_APIFOOTBALL_HOST}`,
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_APIFOOTBALL_KEY,
    "x-rapidapi-host": import.meta.env.VITE_APIFOOTBALL_HOST,
  },
});

// Instance for Transfermarkt
const transfermarktInstance = axios.create({
  baseURL: `https://${import.meta.env.VITE_TRANSFERMARKT_HOST}`,
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
    "x-rapidapi-host": import.meta.env.VITE_TRANSFERMARKT_HOST,
  },
});

// Interceptor to handle successful responses
apiFootballInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Football Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || { message: error.message });
  }
);

transfermarktInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(
      "Transfermarkt API Error:",
      error.response?.data || error.message
    );
    return Promise.reject(error.response?.data || { message: error.message });
  }
);

export { apiFootballInstance, transfermarktInstance };
