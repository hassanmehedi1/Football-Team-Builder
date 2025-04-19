import PlaceholderImg from "../assets/images/placeholder.png";

export const formatMarketValue = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "N/A";
  return `€${value.toFixed(1)} M`;
};

export const formatAge = (age) => {
  return age ? `${age}` : "N/A";
};

export const extractPlayerData = (apiPlayerResponse) => {
  const playerInfo = apiPlayerResponse?.player || {};
  const stats = apiPlayerResponse?.statistics?.[0] || {};
  const teamInfo = stats?.team || {};
  const gamesInfo = stats?.games || {};

  const marketValue =
    apiPlayerResponse.marketValue !== undefined
      ? apiPlayerResponse.marketValue
      : Math.floor(Math.random() * 100) + 5;

  return {
    id: playerInfo.id,
    name:
      playerInfo.firstname && playerInfo.lastname
        ? `${playerInfo.firstname} ${playerInfo.lastname}`
        : playerInfo.name || "Unknown Player",
    fullName: playerInfo.name || "Unknown Player",
    photo: playerInfo.photo || PlaceholderImg,
    age: playerInfo.age || null,
    nationality: playerInfo.nationality || "N/A",
    height: playerInfo.height || "N/A",
    weight: playerInfo.weight || "N/A",
    club: teamInfo.name || "Unknown Club",
    clubId: teamInfo.id || null,
    clubLogo: teamInfo.logo,
    position: gamesInfo.position || "Unknown",
    appearences: gamesInfo.appearences || 0,
    rating: gamesInfo.rating ? parseFloat(gamesInfo.rating).toFixed(1) : "N/A",
    marketValue: marketValue || "N/A",
  };
};
