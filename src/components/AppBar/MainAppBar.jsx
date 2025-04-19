import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchBar from "./SearchBar";
import { AppContext } from "../../contexts/AppContext";
import AppLogo from "../../assets/images/f-logo.png";

function MainAppBar() {
  const { isBuildingTeam, startTeamBuilding, exitTeamBuilding } =
    useContext(AppContext);

  return (
    <AppBar position="sticky">
      <Toolbar className="flex flex-wrap justify-between items-center gap-y-2 gap-x-4 px-2 py-1 md:px-4 md:py-2">
        <Box className="flex items-center grow md:grow-0">
          <img
            src={AppLogo}
            alt="App Logo"
            className="h-8 w-8 md:h-10 md:w-10 mr-2"
          />
          <Typography
            variant="h6"
            component="div"
            className="text-white font-semibold hidden sm:block"
          >
            Football Team Builder
          </Typography>
        </Box>

        <Box className="w-full md:w-auto order-3 md:order-2 flex justify-center md:justify-start">
          {!isBuildingTeam && <SearchBar />}
        </Box>

        <Box className="order-2 md:order-3">
          {isBuildingTeam ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={exitTeamBuilding}
            >
              Back to Players
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={startTeamBuilding}
            >
              Create Team
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
