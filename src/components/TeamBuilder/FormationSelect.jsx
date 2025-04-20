import React, { useContext } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { AppContext } from "../../contexts/AppContext";
import { FORMATIONS } from "../../constants/formations";

function FormationSelect() {
  const { selectFormation, team } = useContext(AppContext);

  const handleChange = (event) => {
    selectFormation(event.target.value);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, md: 3 },
        my: 3,
        maxWidth: "sm",
        mx: "auto",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6" textAlign="center" gutterBottom>
        Choose Your Formation
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <FormControl sx={{ m: 1, minWidth: 250 }} size="medium">
          <InputLabel id="formation-select-label">Formation</InputLabel>
          <Select
            labelId="formation-select-label"
            id="formation-select"
            value={team.formation || ""} // Controlling value from context
            label="Formation"
            onChange={handleChange}
          >
            {Object.keys(FORMATIONS).map((key) => (
              <MenuItem key={key} value={key}>
                {FORMATIONS[key].name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default FormationSelect;
