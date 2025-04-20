import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

function ConstraintAlerts({ violations }) {
  const [visibleViolations, setVisibleViolations] = useState([]);

  // Updating visible violations smoothly when they change
  useEffect(() => {
    setVisibleViolations(violations || []);
  }, [violations]);

  if (!visibleViolations || visibleViolations.length === 0) {
    return null;
  }

  return (
    // Positioning alerts prominently, maybe fixed or sticky if needed
    <Stack
      sx={{ width: "100%", my: 2, position: "sticky", top: "70px", zIndex: 10 }}
      spacing={1}
    >
      {visibleViolations.map((message, index) => (
        <Collapse in={true} key={index}>
          <Alert severity="warning" variant="filled" sx={{ boxShadow: 3 }}>
            {message}
          </Alert>
        </Collapse>
      ))}
    </Stack>
  );
}

export default ConstraintAlerts;
