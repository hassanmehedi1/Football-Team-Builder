import React, { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { AppProvider, AppContext } from "./contexts/AppContext";
import theme from "./styles/theme"; // Your custom theme
import MainAppBar from "./components/AppBar/MainAppBar";
import PlayerGrid from "./components/PlayerGrid/PlayerGrid";
import PlayerModal from "./components/PlayerGrid/PlayerModal";
import TeamBuilderWorkflow from "./components/TeamBuilder/TeamBuilderWorkflow";

function AppContent() {
  const { isBuildingTeam } = useContext(AppContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <MainAppBar />
      {/* Main content: switches between Player Grid and Team Builder */}
      <Box
        component="main"
        sx={{ flexGrow: 1, width: "100%", overflowX: "hidden" }}
      >
        {/* If building, TeamBuilderWorkflow handles showing PlayerGrid internally */}
        {isBuildingTeam ? <TeamBuilderWorkflow /> : <PlayerGrid />}
      </Box>
      {/* Player details modal */}
      <PlayerModal />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
