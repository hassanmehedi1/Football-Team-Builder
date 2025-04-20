import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Tooltip from "@mui/material/Tooltip";
import { AppContext } from "../../contexts/AppContext";
import PlaceholderImg from "../../assets/images/placeholder.png";

function TeamSlot({ slotId, slotType, player }) {
  const {
    removePlayerFromTeam,
    openPlayerModal,
    selectedSlotId,
    selectTeamSlot,
  } = useContext(AppContext);

  const isSelected = selectedSlotId === slotId;

  const handleRemove = (e) => {
    e.stopPropagation();
    removePlayerFromTeam(slotId);
  };

  const handleSlotClick = () => {
    if (player) {
      openPlayerModal(player);
    } else {
      selectTeamSlot(slotId);
    }
  };

  let tooltipTitle = `Empty ${slotType} Slot`;
  if (isSelected) {
    tooltipTitle = `Selected - Click a compatible player card to add`;
  } else if (player) {
    tooltipTitle = `View ${player.name}`;
  } else {
    tooltipTitle = `Click to select this empty ${slotType} slot`;
  }

  return (
    <Tooltip title={tooltipTitle} placement="top" arrow>
      <Box
        onClick={handleSlotClick}
        className={`relative flex flex-col items-center justify-center text-center p-1 rounded-lg border min-h-[90px] md:min-h-[100px] transition-all duration-200 ease-in-out ${
          player
            ? "bg-green-100 border-green-300"
            : "bg-gray-100 border-dashed border-gray-400 hover:bg-gray-200"
        } ${
          isSelected
            ? "border-blue-500 border-solid border-2 animate-pulseGlow"
            : ""
        } ${player ? "cursor-pointer" : "cursor-pointer"}`}
      >
        {player ? (
          <>
            <IconButton
              aria-label="remove player"
              onClick={handleRemove}
              size="small"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 2,
                color: "rgba(0, 0, 0, 0.6)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "2px",
                "&:hover": {
                  backgroundColor: "rgba(255, 0, 0, 0.7)",
                  color: "white",
                },
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
            <Avatar
              src={player.photo || PlaceholderImg}
              alt={player.name}
              sx={{
                width: { xs: 32, md: 40 },
                height: { xs: 32, md: 40 },
                mb: 0.5,
                border: "1px solid #ccc",
              }}
              imgProps={{
                onError: (e) => {
                  e.target.src = PlaceholderImg;
                },
              }}
            />
            <Typography
              variant="caption"
              display="block"
              noWrap
              fontWeight="bold"
              sx={{ fontSize: "0.7rem", lineHeight: 1.2, width: "95%" }}
            >
              {player.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ fontSize: "0.65rem" }}
            >
              ({player.position.substring(0, 3)})
            </Typography>
          </>
        ) : (
          <>
            <PersonAddAlt1Icon
              sx={{ fontSize: { xs: 24, md: 30 }, color: "grey.500", mb: 0.5 }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.7rem" }}
            >
              {slotType}
            </Typography>
          </>
        )}
      </Box>
    </Tooltip>
  );
}

export default TeamSlot;
