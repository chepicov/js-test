export const getTeam = ({ team }) => {
  return team.currentTeam;
};

export const getTeams = ({ team }) => {
  return team.teams
    .sort((a, b) => b.score - a.score);
};
