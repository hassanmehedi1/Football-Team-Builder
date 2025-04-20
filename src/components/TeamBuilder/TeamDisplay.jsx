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

  // Group slots by row, sorted by original column order for consistency
  const slotsByRow = formation.slots.reduce((acc, slot) => {
    const row = slot.gridRow;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(slot);
    acc[row].sort((a, b) => a.gridCol - b.gridCol); 
    return acc;
  }, {});

  return (
    <Paper elevation={3} sx={{ mt: 3, mb: 3, overflow: "hidden" }}>
      <Box
        sx={{
          p: 1.5,
          backgroundColor: 'primary.dark',
          color: 'white',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
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

      <div
        className="grid p-6 gap-y-4 border-2 border-[#1b5e20] rounded-b-lg max-w-[800px] mx-auto my-4 relative bg-[#388e3c]"
        style={{
          gridTemplateRows: `repeat(${formation.gridSettings.rows}, minmax(100px, auto))`,
          gridTemplateColumns: '1fr', 
        }}
      >
        {Object.entries(slotsByRow).map(([rowNumber, slotsInRow]) => (
          <div
            key={`row-${rowNumber}`}
            className="flex justify-center items-center gap-x-36 w-full"
            style={{ gridRow: rowNumber, gridColumn: '1 / -1' }} 
          >
            {slotsInRow.map((slot) => (
              <TeamSlot
                key={slot.id}
                slotId={slot.id}
                slotType={slot.type}
                player={team.players[slot.id]}
              />
            ))}
          </div>
        ))}
      </div>
    </Paper>
  );
}

export default TeamDisplay;
