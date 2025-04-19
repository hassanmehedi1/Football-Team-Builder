import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function ErrorMessage({ message = "An error occurred.", title = "Error" }) {
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
}

export default ErrorMessage;
