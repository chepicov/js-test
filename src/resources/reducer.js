import { combineReducers } from 'redux';

import player from './player/player.reducer';
import user from './user/user.reducer';
import team from './team/team.reducer';

export default combineReducers({
  player,
  user,
  team,
});
