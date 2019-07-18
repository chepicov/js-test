import {
  SET_SESSION_USER,
} from './user.actions';

export const initialState = {
  sessionUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION_USER: {
      const newState = { ...state };

      newState.sessionUser = action.payload;
      return newState;
    }
    default:
      return state;
  }
};
