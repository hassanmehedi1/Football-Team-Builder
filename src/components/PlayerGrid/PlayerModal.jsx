import React, { useContext } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { AppContext } from "../../contexts/AppContext";
import PlaceholderImg from "../../assets/images/placeholder.png";
import { formatMarketValue, formatAge } from "../../utils/helpers";

// Style for the modal content
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "550px" },
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: 24,
  p: { xs: 2, sm: 3 },
  maxHeight: "90vh",
  overflowY: "auto",
};

function PlayerModal() {
  // Expects 'selectedPlayerModal' to be the processed player object from extractPlayerData
  const { selectedPlayerModal: player, closePlayerModal } =
    useContext(AppContext);

  if (!player) return null;

  return (
    <Modal
      open={Boolean(player)}
      onClose={closePlayerModal}
      aria-labelledby="player-detail-modal-title"
      aria-describedby="player-detail-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={closePlayerModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header with Name and Club Logo */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {player.clubLogo && (
            <Avatar
              src={player.clubLogo}
              sx={{ width: 40, height: 40, mr: 2 }}
            />
          )}
          <Typography
            id="player-detail-modal-title"
            variant="h5"
            component="h2"
          >
            {player.fullName || player.name}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Main Content Area */}
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={3}>
          {/* Left Side: Photo */}
          <Box sx={{ textAlign: "center", flexShrink: 0 }}>
            <img
              src={player.photo || PlaceholderImg}
              alt={player.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
                border: "1px solid #eee",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
              }}
              onError={(e) => {
                e.target.src = PlaceholderImg;
              }}
            />
          </Box>

          {/* Right Side: Details */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <b>Position:</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{player.position}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">
                  <b>Club:</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{player.club}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">
                  <b>Nationality:</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{player.nationality}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">
                  <b>Age:</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{formatAge(player.age)}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">
                  <b>Height:</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{player.height}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">
                  <b>Weight:</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{player.weight}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">
                  <b>Market Value:</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">
                  {formatMarketValue(player.marketValue)}
                </Typography>
              </Grid>

              {/* Add more stats if available in 'player' object */}
              <Grid item xs={6}>
                <Typography variant="body1">
                  <b>Rating (Avg):</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{player.rating}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default PlayerModal;
