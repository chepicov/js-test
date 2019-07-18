import {
  FETCH_PLAYERS,
  FETCH_PLAYER,
} from './player.actions';

export const initialState = {
  players: [],
  currentPlayer: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYERS: {
      const newState = { ...state };

      newState.players = action.payload
        .reduce((acc, groupObj) => {
          const [group] = Object.keys(groupObj);
          return [
            ...acc,
            ...groupObj[group].map(player => ({
              ...player,
              name: player.player,
              type: group,
            })),
          ];
        }, []);
      return newState;
    }
    case FETCH_PLAYER: {
      const newState = { ...state };
      const { id, ...details } = action.payload;

      newState.players = state.players.map((player) => {
        if (player.id !== id) {
          return player;
        }

        return {
          ...player,
          details,
        };
      });
      return newState;
    }
    default:
      return state;
  }
};
