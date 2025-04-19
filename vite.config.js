import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_APIFOOTBALL_KEY": JSON.stringify(
      process.env.VITE_APIFOOTBALL_KEY
    ),
    "process.env.VITE_APIFOOTBALL_HOST": JSON.stringify(
      process.env.VITE_APIFOOTBALL_HOST
    ),
    "process.env.VITE_RAPIDAPI_KEY": JSON.stringify(
      process.env.VITE_RAPIDAPI_KEY
    ),
    "process.env.VITE_TRANSFERMARKT_HOST": JSON.stringify(
      process.env.VITE_TRANSFERMARKT_HOST
    ),
  },
});
