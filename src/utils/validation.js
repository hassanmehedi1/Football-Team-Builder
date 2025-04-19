import { mapPlayerPositionToType } from "../constants/formations";
import { TEAM_CONSTRAINTS } from "../constants/config";

const {
  MAX_PLAYERS_SAME_COUNTRY,
  MAX_PLAYERS_SAME_CLUB,
  MIN_BUDGET,
  MAX_BUDGET,
  MIN_AVG_AGE,
  MAX_AVG_AGE,
  TOTAL_PLAYERS,
} = TEAM_CONSTRAINTS;

export const validateTeamConstraints = (teamState, formationDefinition) => {
  const players = Object.values(teamState.players);
  const violations = [];
  const playerCount = players.length;

  if (!formationDefinition) {
    return { isValid: true, violations: [] };
  }

  const positionCounts = {
    Goalkeeper: 0,
    Defender: 0,
    Midfielder: 0,
    Forward: 0,
    Unknown: 0,
  };
  const countryCounts = {};
  const clubCounts = {};
  let totalAge = 0;
  let totalBudget = 0;
  let validPlayerCountForAvg = 0;

  players.forEach((p) => {
    const type = mapPlayerPositionToType(p.position);
    positionCounts[type]++;

    const country = p.nationality || "Unknown";
    countryCounts[country] = (countryCounts[country] || 0) + 1;

    const club = p.clubId || p.club || "Unknown";
    clubCounts[club] = (clubCounts[club] || 0) + 1;

    if (p.age !== null && !isNaN(p.age)) {
      totalAge += p.age;
      validPlayerCountForAvg++;
    }
    if (p.marketValue !== null && !isNaN(p.marketValue)) {
      totalBudget += p.marketValue;
    }
  });

  const averageAge =
    validPlayerCountForAvg > 0 ? totalAge / validPlayerCountForAvg : 0;

  for (const [type, count] of Object.entries(positionCounts)) {
    if (
      type !== "Unknown" &&
      formationDefinition.constraints[type] !== undefined
    ) {
      if (count > formationDefinition.constraints[type]) {
        violations.push(
          `Too many ${type}s (Max: ${formationDefinition.constraints[type]}, Have: ${count})`
        );
      }
    }
  }

  for (const [country, count] of Object.entries(countryCounts)) {
    if (count > MAX_PLAYERS_SAME_COUNTRY) {
      violations.push(
        `Too many players from ${country} (Max: ${MAX_PLAYERS_SAME_COUNTRY}, Have: ${count})`
      );
    }
  }

  for (const [clubIdentifier, count] of Object.entries(clubCounts)) {
    if (count > MAX_PLAYERS_SAME_CLUB) {
      violations.push(
        `Too many players from ${
          typeof clubIdentifier === "number"
            ? `Club ID ${clubIdentifier}`
            : clubIdentifier
        } (Max: ${MAX_PLAYERS_SAME_CLUB}, Have: ${count})`
      );
    }
  }

  if (totalBudget > MAX_BUDGET) {
    violations.push(
      `Budget exceeds limit (€${MAX_BUDGET} M, Current: €${totalBudget.toFixed(
        1
      )} M)`
    );
  }
  if (playerCount === TOTAL_PLAYERS && totalBudget < MIN_BUDGET) {
    violations.push(
      `Budget too low (€${MIN_BUDGET} M, Current: €${totalBudget.toFixed(1)} M)`
    );
  }

  if (averageAge > 0) {
    if (averageAge > MAX_AVG_AGE) {
      violations.push(
        `Average age too high (${MAX_AVG_AGE.toFixed(
          1
        )}, Current: ${averageAge.toFixed(1)})`
      );
    }
    if (playerCount === TOTAL_PLAYERS && averageAge < MIN_AVG_AGE) {
      violations.push(
        `Average age too low (${MIN_AVG_AGE.toFixed(
          1
        )}, Current: ${averageAge.toFixed(1)})`
      );
    }
  }

  const isComplete = playerCount === TOTAL_PLAYERS;

  return {
    isValid: violations.length === 0,
    violations: violations,
    calculatedBudget: totalBudget,
    calculatedAvgAge: averageAge,
    isComplete: isComplete,
  };
};
