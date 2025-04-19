import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import { AppContext } from "../../contexts/AppContext";
import PlaceholderImg from "../../assets/images/placeholder.png";
import {
  formatMarketValue,
  formatAge,
  extractPlayerData,
} from "../../utils/helpers";
import {
  mapPlayerPositionToType,
  FORMATIONS,
} from "../../constants/formations";

function PlayerCard({ player: apiPlayerResponse }) {
  const {
    openPlayerModal,
    isBuildingTeam,
    addPlayerToTeam,
    team,
    selectedSlotId,
    selectTeamSlot,
  } = useContext(AppContext);

  const player = extractPlayerData(apiPlayerResponse);

  const handleCardClick = () => {
    if (isBuildingTeam && selectedSlotId) {
      addPlayerToTeam(apiPlayerResponse);
    } else if (isBuildingTeam) {
      console.log("Select an empty team slot first to add a player.");
    } else {
      openPlayerModal(player);
    }
  };

  let canAddToSelectedSlot = false;
  let isSelectable = false;
  if (isBuildingTeam && selectedSlotId && team.formation) {
    const formationDef = FORMATIONS[team.formation];
    const targetSlotDef = formationDef?.slots.find(
      (s) => s.id === selectedSlotId
    );
    const playerType = mapPlayerPositionToType(player.position);

    if (targetSlotDef && playerType === targetSlotDef.type) {
      canAddToSelectedSlot = true;
      isSelectable = true;
    }
  }

  const isAlreadyInTeam = Object.values(team.players).some(
    (p) => p.id === player.id
  );

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: 200,
        boxSizing: "border-box",
        border: "2px solid",
        borderColor: isSelectable ? "success.main" : "transparent",
        minWidth: 180,
        cursor: isBuildingTeam && !isAlreadyInTeam ? "copy" : "pointer",
        opacity: isAlreadyInTeam ? 0.6 : 1,
        pointerEvents: isAlreadyInTeam ? "none" : "auto",
      }}
      onClick={handleCardClick}
      title={
        isAlreadyInTeam
          ? `${player.name} is already in your team`
          : isBuildingTeam
          ? `Click to add ${player.name} to selected slot`
          : `View details for ${player.name}`
      }
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          maxWidth: "100%",
          height: 160,
          objectFit: "contain",
          backgroundColor: "#e0e0e0",
          p: 1,
        }}
        image={player.photo || PlaceholderImg}
        alt={player.name}
        onError={(e) => {
          e.target.src = PlaceholderImg;
        }}
      />
      <CardContent
        sx={{
          p: 1.5,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          sx={{
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {player.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {player.position} • {player.nationality}
        </Typography>
        <Tooltip title={player.club} placement="top">
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
            }}
          >
            {player.clubLogo && (
              <img
                src={player.clubLogo}
                alt=""
                style={{
                  height: "16px",
                  width: "16px",
                  marginRight: "4px",
                  flexShrink: 0,
                }}
              />
            )}
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {player.club}
            </span>
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            width: "100%",
            mt: "auto", // Push age/value towards bottom if space allows
          }}
        >
          Age: {formatAge(player.age)}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          fontWeight="bold"
          sx={{ width: "100%" }}
        >
          Value: {formatMarketValue(player.marketValue)}
        </Typography>
      </CardContent>
      {isSelectable && (
        <Box
          sx={{
            p: 1,
            textAlign: "center",
            backgroundColor: "success.light",
            color: "white",
          }}
        >
          <Typography variant="caption">Add to Slot</Typography>
        </Box>
      )}
    </Card>
  );
}

export default PlayerCard;
