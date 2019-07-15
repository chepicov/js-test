import {
  SAVE_TEAM,
} from './user.actions';

export const initialState = {
  team: {},
  email: '',
  name: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TEAM: {
      const newState = { ...state };

      newState.team = action.payload;
      return newState;
    }
    default:
      return state;
  }
};
