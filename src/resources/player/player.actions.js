import playerList from 'mock/playerList';
import * as api from './player.api';

export const FETCH_PLAYERS = 'fetchPlayers';

export const fetchPlayers = () => dispatch =>
  api.fetchPlayers()
    .then(payload => dispatch({ type: FETCH_PLAYERS, payload }))
    .catch(err => dispatch({ type: FETCH_PLAYERS, payload: playerList }));
