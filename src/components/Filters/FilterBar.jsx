import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { AppContext } from "../../contexts/AppContext";
import { formatMarketValue } from "../../utils/helpers";

function FilterBar() {
  const {
    filters,
    updateFilters,
    availableCountries,
    availableClubs,
    loadingFilters,
  } = useContext(AppContext);

  const [localAgeRange, setLocalAgeRange] = useState(filters.ageRange);
  const [localValueRange, setLocalValueRange] = useState(
    filters.marketValueRange
  );

  const handleCountryChange = (event, newValue) => {
    updateFilters({ country: newValue }); // newValue is the country object or null
  };

  const handleClubChange = (event, newValue) => {
    updateFilters({ club: newValue }); // newValue is the club object or null
  };

  const handleAgeChange = (event, newValue) => {
    setLocalAgeRange(newValue); // Update local state while sliding
  };

  const handleAgeChangeCommitted = (event, newValue) => {
    updateFilters({ ageRange: newValue }); // Update context state on release
  };

  const handleValueChange = (event, newValue) => {
    setLocalValueRange(newValue);
  };

  const handleValueChangeCommitted = (event, newValue) => {
    updateFilters({ marketValueRange: newValue });
  };

  return (
    <Paper elevation={2} sx={{ mb: 3, p: 2 }}>
      <div className="flex items-center justify-start gap-10">
        {/* Country Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            sx={{ width: "100%" }}
            options={availableCountries}
            getOptionLabel={(option) => option.name || ""}
            value={filters.country}
            onChange={handleCountryChange}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            size="small"
            loading={loadingFilters}
            slotProps={{
              paper: {
                sx: { minWidth: 300 },
              },
            }}
            componentsProps={{
              popper: {
                style: { width: "fit-content", minWidth: "300px" },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Filter by Country"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingFilters ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                  style: { fontSize: "0.875rem", width: "200px" },
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.flag && (
                  <img loading="lazy" width="20" src={option.flag} alt="" />
                )}
                {option.name} ({option.code || "N/A"})
              </Box>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...getTagProps({ index })}
                >
                  {option.flag && (
                    <img loading="lazy" width="20" src={option.flag} alt="" />
                  )}
                  {option.name} ({option.code || "N/A"})
                </Box>
              ))
            }
          />
        </Grid>

        {/* Club Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            sx={{ width: "100%" }}
            options={availableClubs}
            getOptionLabel={(option) => option.name || ""}
            value={filters.club}
            onChange={handleClubChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            size="small"
            loading={loadingFilters}
            disabled={loadingFilters || availableClubs.length === 0}
            slotProps={{
              paper: {
                sx: { minWidth: 300 },
              },
            }}
            componentsProps={{
              popper: {
                style: { width: "fit-content", minWidth: "300px" },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Filter by Club"
                placeholder={
                  availableClubs.length === 0 && !loadingFilters
                    ? "No clubs for league/season"
                    : "Select club..."
                }
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingFilters ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                  style: { fontSize: "0.875rem", width: "200px" },
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.logo && (
                  <img loading="lazy" width="20" src={option.logo} alt="" />
                )}
                {option.name}
              </Box>
            )}
          />
        </Grid>

        {/* Age Range Filter */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography gutterBottom variant="caption">
            Age Range
          </Typography>
          <Slider
            getAriaLabel={() => "Age range filter"}
            value={localAgeRange}
            onChange={handleAgeChange}
            onChangeCommitted={handleAgeChangeCommitted}
            valueLabelDisplay="auto"
            min={15}
            max={45}
            sx={{ mx: 1 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">{localAgeRange[0]}</Typography>
            <Typography variant="caption">{localAgeRange[1]}</Typography>
          </Box>
        </Grid>

        {/* Market Value Range Filter */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography gutterBottom variant="caption">
            Market Value Range (€ Millions)
          </Typography>
          <Slider
            getAriaLabel={() => "Market value range filter"}
            value={localValueRange}
            onChange={handleValueChange}
            onChangeCommitted={handleValueChangeCommitted}
            valueLabelDisplay="auto"
            valueLabelFormat={formatMarketValue}
            min={0}
            max={250}
            step={5}
            sx={{ mx: 1 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">
              {formatMarketValue(localValueRange[0])}
            </Typography>
            <Typography variant="caption">
              {formatMarketValue(localValueRange[1])}
            </Typography>
          </Box>
        </Grid>
      </div>
    </Paper>
  );
}

export default FilterBar;
