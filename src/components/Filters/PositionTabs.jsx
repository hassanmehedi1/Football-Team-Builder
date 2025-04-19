import React, { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { AppContext } from "../../contexts/AppContext";

const POSITIONS = [
  "All",
  "Forwards",
  "Midfielders",
  "Defenders",
  "Goalkeepers",
];

function PositionTabs() {
  const { filters, updateFilters } = useContext(AppContext);

  const handleChange = (event, newValue) => {
    updateFilters({ position: newValue });
  };

  return (
    <Paper
      elevation={1}
      sx={{ width: "100%", mb: 2, backgroundColor: "white" }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={filters.position}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Player position filter tabs"
          indicatorColor="primary"
          textColor="primary"
        >
          {POSITIONS.map((pos) => (
            <Tab
              label={pos}
              value={pos}
              key={pos}
              sx={{
                textTransform: "none",
                fontWeight: filters.position === pos ? 600 : 400,
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Paper>
  );
}

export default PositionTabs;
