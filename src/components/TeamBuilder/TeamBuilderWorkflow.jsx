import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Alert from "@mui/material/Alert";

import { AppContext } from "../../contexts/AppContext";
import FormationSelect from "./FormationSelect";
import TeamDisplay from "./TeamDisplay";
import ConstraintAlerts from "./ConstraintAlerts";
import PlayerGrid from "../PlayerGrid/PlayerGrid";

function TeamBuilderWorkflow() {
  const { isBuildingTeam, team, selectedSlotId } = useContext(AppContext);

  if (!isBuildingTeam) return null;

  const handleFinalizeTeam = () => {
    if (team.isComplete && team.constraintViolations.length === 0) {
      alert(
        "Team Finalized (Implementation Pending)! \n" +
          JSON.stringify(team.players, null, 2)
      );
    } else if (!team.isComplete) {
      alert("Team is not complete (11 players required).");
    } else {
      alert(
        "Team has constraint violations. Please fix them before finalizing."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: 2,
        p: { xs: 1, md: 2 },
      }}
    >
      {/* Left Side: Team Display and Controls (takes more space on large screens) */}
      <Box sx={{ width: { xs: "100%", lg: "55%" }, order: { xs: 1, lg: 1 } }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ mt: 1 }}>
          Build Your Team
        </Typography>

        {!team.formation ? (
          <FormationSelect />
        ) : (
          <>
            {/* Display Constraint Violations */}
            <ConstraintAlerts violations={team.constraintViolations} />

            {/* Team Display Pitch */}
            <TeamDisplay />

            {/* Guidance Text */}
            {selectedSlotId && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Selected Slot: <strong>{selectedSlotId}</strong>. Click a
                compatible player from the grid to add.
              </Alert>
            )}
            {!selectedSlotId && Object.keys(team.players).length < 11 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Click an empty slot on the pitch above, then click a player from
                the grid to add them.
              </Alert>
            )}

            {/* Finalize Button (Conditional) */}
            <Box sx={{ textAlign: "center", my: 2 }}>
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<SaveIcon />}
                onClick={handleFinalizeTeam}
                disabled={
                  !team.isComplete || team.constraintViolations.length > 0
                } // Disable if incomplete or invalid
                title={
                  !team.isComplete
                    ? "Team must have 11 players"
                    : team.constraintViolations.length > 0
                    ? "Resolve constraint violations first"
                    : "Save your team"
                }
              >
                Finalize Team
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* Right Side: Player Grid for Selection (takes less space on large screens) */}
      {/* Only showing player grid if a formation is selected */}
      {team.formation && (
        <Box
          sx={{
            width: { xs: "100%", lg: "45%" },
            order: { xs: 2, lg: 2 },
            maxHeight: "calc(100vh - 80px)",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", my: 1 }}>
            Available Players
          </Typography>
          <PlayerGrid />
        </Box>
      )}
    </Box>
  );
}

export default TeamBuilderWorkflow;
