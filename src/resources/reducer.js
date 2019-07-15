import { combineReducers } from 'redux';

import player from './player/player.reducer';
import user from './user/user.reducer';

export default combineReducers({
  player,
  user,
});
