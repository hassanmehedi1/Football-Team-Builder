import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e",
      light: "#534bae",
      dark: "#000051",
    },
    secondary: {
      main: "#f44336",
      light: "#ff7961",
      dark: "#ba000d",
    },
    success: {
      main: "#4caf50", // Green
    },
    warning: {
      main: "#ff9800", // Orange
    },
    background: {
      default: "#f4f5f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121", // Dark grey for text
      secondary: "#757575", // Lighter grey
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: "#1a237e",
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a237e", // Primary dark
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: "#1a237e",
        },
      },
    },
  },
});

export default theme;
