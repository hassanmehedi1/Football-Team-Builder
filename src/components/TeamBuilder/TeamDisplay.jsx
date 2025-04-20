import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { AppContext } from "../../contexts/AppContext";
import { FORMATIONS } from "../../constants/formations";
import TeamSlot from "./TeamSlot";
import { formatMarketValue, formatAge } from "../../utils/helpers";

function TeamDisplay() {
  const { team } = useContext(AppContext);
  const formation = FORMATIONS[team.formation];

  if (!formation) return null;

  const gridContainerStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${formation.gridSettings.rows}, minmax(100px, auto))`,
    gridTemplateColumns: `repeat(${formation.gridSettings.cols}, 1fr)`,
    gap: "12px",
    padding: "16px",
    backgroundColor: "#388e3c",
    border: "2px solid #1b5e20",
    borderRadius: "8px",
    maxWidth: "800px",
    margin: "16px auto",
    position: "relative",
  };

  const getSlotStyle = (slot) => ({
    gridRow: slot.gridRow,
    gridColumn: `${slot.gridCol} / span 1`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <Paper elevation={3} sx={{ mt: 3, mb: 3, overflow: "hidden" }}>
      <Box
        sx={{
          p: 1.5,
          backgroundColor: "primary.dark",
          color: "white",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
        }}
      >
        <Typography variant="h6" component="div" textAlign="center">
          Team Overview ({team.formation})
        </Typography>
        <Box display="flex" justifyContent="space-around" mt={1}>
          <Typography variant="body2">
            Players: {Object.keys(team.players).length} / 11
          </Typography>
          <Typography variant="body2">
            Budget: {formatMarketValue(team.budget)}
          </Typography>
          <Typography variant="body2">
            Avg Age: {formatAge(team.averageAge.toFixed(1))}
          </Typography>
        </Box>
      </Box>
      <Box sx={gridContainerStyle}>
        {formation.slots.map((slot) => (
          <Box key={slot.id} sx={getSlotStyle(slot)}>
            <TeamSlot
              slotId={slot.id}
              slotType={slot.type}
              player={team.players[slot.id]}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default TeamDisplay;
