import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>{message}</Typography>
    </Box>
  );
}

export default LoadingSpinner;
