import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../../hooks/useDebounce";
import { AppContext } from "../../contexts/AppContext";

function SearchBar() {
  const { searchTerm: globalSearchTerm, setSearchTerm } =
    useContext(AppContext);
  const [localSearch, setLocalSearch] = useState(globalSearchTerm);
  const debouncedSearchTerm = useDebounce(localSearch, 500); // 500ms debounce

  // Update local state if global state changes externally
  useEffect(() => {
    setLocalSearch(globalSearchTerm);
  }, [globalSearchTerm]);

  // Update global state only when debounced value changes
  useEffect(() => {
    // Prevent update if the initial global value caused debounce effect
    if (debouncedSearchTerm !== globalSearchTerm) {
      setSearchTerm(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, setSearchTerm, globalSearchTerm]);

  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search player by name..."
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "white" }} /> {/* Explicit color */}
          </InputAdornment>
        ),
        sx: {
          minWidth: { xs: "auto", md: "300px" }, // Ensure minimum width on larger screens
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Slightly less intense white
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
          borderRadius: "8px", // Match button rounding
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.4)", // Softer border
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.7)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          color: "white",
          "& input::placeholder": {
            // Style placeholder
            color: "rgba(255, 255, 255, 0.7)",
            opacity: 1,
          },
        },
      }}
      className="text-white" // Tailwind text color as fallback/complement
    />
  );
}

export default SearchBar;
