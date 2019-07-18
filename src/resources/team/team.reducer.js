import defaultTeams from 'mock/teams';
import {
  ADD_TEAM,
  EDIT_TEAM,
  SET_CURRENT_TEAM,
} from './team.actions';

export const initialState = {
  currentTeam: null,
  teams: defaultTeams,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEAM: {
      const newState = { ...state };

      newState.teams = [
        ...state.teams,
        action.payload,
      ];
      newState.currentTeam = action.payload;
      return newState;
    }
    case EDIT_TEAM: {
      const newState = { ...state };

      newState.teams = state.teams.map((team) => {
        if (team.id !== action.payload.id) {
          return team;
        }
        return action.payload;
      });
      newState.currentTeam = action.payload;
      return newState;
    }
    case SET_CURRENT_TEAM: {
      const newState = { ...state };

      newState.currentTeam = state.teams.find(({ id }) => id === action.payload);
      return newState;
    }
    default:
      return state;
  }
};
