
export const ADD_TEAM = 'addTeam';
export const EDIT_TEAM = 'editTeam';
export const SET_CURRENT_TEAM = 'setCurrentTeam';

export const addTeam = payload => dispatch => dispatch({
  type: ADD_TEAM,
  payload: {
    ...payload, id: Math.trunc(Math.random() * 100), score: 0,
  },
});

export const editTeam = payload => dispatch => dispatch({ type: EDIT_TEAM, payload });

export const setCurrentTeam = id => dispatch => dispatch({ type: SET_CURRENT_TEAM, payload: id });
