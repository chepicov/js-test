import {
  FETCH_PLAYERS,
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
              type: group,
            })),
          ];
        }, []);
      return newState;
    }
    default:
      return state;
  }
};
