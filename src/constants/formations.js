export const mapPlayerPositionToType = (apiPosition) => {
  const pos = apiPosition?.toLowerCase() || "";
  if (pos.includes("goalkeeper")) return "Goalkeeper";
  if (pos.includes("defender")) return "Defender";
  if (pos.includes("midfielder")) return "Midfielder";
  if (pos.includes("attacker") || pos.includes("forward")) return "Forward";
  return "Unknown";
};

export const FORMATIONS = {
  "4-3-3": {
    name: "4-3-3",
    slots: [
      // Row 1 (GK)
      { id: "GK", type: "Goalkeeper", gridRow: 1, gridCol: 2 },
      // Row 2 (DEF)
      { id: "DEF1", type: "Defender", gridRow: 2, gridCol: 1 },
      { id: "DEF2", type: "Defender", gridRow: 2, gridCol: 2 },
      { id: "DEF3", type: "Defender", gridRow: 2, gridCol: 3 },
      { id: "DEF4", type: "Defender", gridRow: 2, gridCol: 4 },
      // Row 3 (MID)
      { id: "MID1", type: "Midfielder", gridRow: 3, gridCol: 1.5 },
      { id: "MID2", type: "Midfielder", gridRow: 3, gridCol: 2.5 },
      { id: "MID3", type: "Midfielder", gridRow: 3, gridCol: 3.5 },
      // Row 4 (FWD)
      { id: "FWD1", type: "Forward", gridRow: 4, gridCol: 1.5 },
      { id: "FWD2", type: "Forward", gridRow: 4, gridCol: 2.5 },
      { id: "FWD3", type: "Forward", gridRow: 4, gridCol: 3.5 },
    ],
    constraints: { Goalkeeper: 1, Defender: 4, Midfielder: 3, Forward: 3 },
    gridSettings: { rows: 4, cols: 4 },
  },
  "4-4-2": {
    name: "4-4-2",
    slots: [
      { id: "GK", type: "Goalkeeper", gridRow: 1, gridCol: 2.5 },
      { id: "DEF1", type: "Defender", gridRow: 2, gridCol: 1 },
      { id: "DEF2", type: "Defender", gridRow: 2, gridCol: 2 },
      { id: "DEF3", type: "Defender", gridRow: 2, gridCol: 3 },
      { id: "DEF4", type: "Defender", gridRow: 2, gridCol: 4 },
      { id: "MID1", type: "Midfielder", gridRow: 3, gridCol: 1 },
      { id: "MID2", type: "Midfielder", gridRow: 3, gridCol: 2 },
      { id: "MID3", type: "Midfielder", gridRow: 3, gridCol: 3 },
      { id: "MID4", type: "Midfielder", gridRow: 3, gridCol: 4 },
      { id: "FWD1", type: "Forward", gridRow: 4, gridCol: 2 },
      { id: "FWD2", type: "Forward", gridRow: 4, gridCol: 3 },
    ],
    constraints: { Goalkeeper: 1, Defender: 4, Midfielder: 4, Forward: 2 },
    gridSettings: { rows: 4, cols: 4 },
  },
  "3-4-3": {
    name: "3-4-3",
    slots: [
      { id: "GK", type: "Goalkeeper", gridRow: 1, gridCol: 2.5 },
      { id: "DEF1", type: "Defender", gridRow: 2, gridCol: 1.5 },
      { id: "DEF2", type: "Defender", gridRow: 2, gridCol: 2.5 },
      { id: "DEF3", type: "Defender", gridRow: 2, gridCol: 3.5 },
      { id: "MID1", type: "Midfielder", gridRow: 3, gridCol: 1 },
      { id: "MID2", type: "Midfielder", gridRow: 3, gridCol: 2 },
      { id: "MID3", type: "Midfielder", gridRow: 3, gridCol: 3 },
      { id: "MID4", type: "Midfielder", gridRow: 3, gridCol: 4 },
      { id: "FWD1", type: "Forward", gridRow: 4, gridCol: 1.5 },
      { id: "FWD2", type: "Forward", gridRow: 4, gridCol: 2.5 },
      { id: "FWD3", type: "Forward", gridRow: 4, gridCol: 3.5 },
    ],
    constraints: { Goalkeeper: 1, Defender: 3, Midfielder: 4, Forward: 3 },
    gridSettings: { rows: 4, cols: 4 },
  },
  "5-2-3": {
    name: "5-2-3",
    slots: [
      { id: "GK", type: "Goalkeeper", gridRow: 1, gridCol: 3 },
      { id: "DEF1", type: "Defender", gridRow: 2, gridCol: 1 },
      { id: "DEF2", type: "Defender", gridRow: 2, gridCol: 2 },
      { id: "DEF3", type: "Defender", gridRow: 2, gridCol: 3 },
      { id: "DEF4", type: "Defender", gridRow: 2, gridCol: 4 },
      { id: "DEF5", type: "Defender", gridRow: 2, gridCol: 5 },
      { id: "MID1", type: "Midfielder", gridRow: 3, gridCol: 2 },
      { id: "MID2", type: "Midfielder", gridRow: 3, gridCol: 4 },
      { id: "FWD1", type: "Forward", gridRow: 4, gridCol: 1.5 },
      { id: "FWD2", type: "Forward", gridRow: 4, gridCol: 3 },
      { id: "FWD3", type: "Forward", gridRow: 4, gridCol: 4.5 },
    ],
    constraints: { Goalkeeper: 1, Defender: 5, Midfielder: 2, Forward: 3 },
    gridSettings: { rows: 4, cols: 5 },
  },
  "5-3-2": {
    name: "5-3-2",
    slots: [
      { id: "GK", type: "Goalkeeper", gridRow: 1, gridCol: 3 },
      { id: "DEF1", type: "Defender", gridRow: 2, gridCol: 1 },
      { id: "DEF2", type: "Defender", gridRow: 2, gridCol: 2 },
      { id: "DEF3", type: "Defender", gridRow: 2, gridCol: 3 },
      { id: "DEF4", type: "Defender", gridRow: 2, gridCol: 4 },
      { id: "DEF5", type: "Defender", gridRow: 2, gridCol: 5 },
      { id: "MID1", type: "Midfielder", gridRow: 3, gridCol: 1.5 },
      { id: "MID2", type: "Midfielder", gridRow: 3, gridCol: 3 },
      { id: "MID3", type: "Midfielder", gridRow: 3, gridCol: 4.5 },
      { id: "FWD1", type: "Forward", gridRow: 4, gridCol: 2 },
      { id: "FWD2", type: "Forward", gridRow: 4, gridCol: 4 },
    ],
    constraints: { Goalkeeper: 1, Defender: 5, Midfielder: 3, Forward: 2 },
    gridSettings: { rows: 4, cols: 5 },
  },
};
