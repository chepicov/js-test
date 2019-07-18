export const getPlayers = ({ player }) => {
  return player.players;
};

export const getFreePlayers = ({ player, team }) => {
  return player.players
    .filter(({ id }) => !team.teams.find(({ players }) => Object.values(players).includes(id)));
};
