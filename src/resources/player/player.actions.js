import playerList from 'mock/playerList';
import playerDetails from 'mock/player';
import * as api from './player.api';

export const FETCH_PLAYERS = 'fetchPlayers';
export const FETCH_PLAYER = 'fetchPlayer';

export const fetchPlayers = () => dispatch => api.fetchPlayers()
  .then(payload => dispatch({ type: FETCH_PLAYERS, payload }))
  .catch(err => dispatch({ type: FETCH_PLAYERS, payload: playerList }));

export const fetchSinglePlayer = id => dispatch => api.fetchSinglePlayer(id)
  .then(payload => dispatch({ type: FETCH_PLAYER, payload: { ...payload, id } }))
  .catch(err => dispatch({
    type: FETCH_PLAYER,
    payload: {
      ...(playerDetails[id]
      || Object.values(playerDetails)[Math.trunc(Math.random() * 5)]),
      id,
    },
  }));
