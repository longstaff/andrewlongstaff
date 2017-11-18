import { combineReducers } from 'redux';
import {
  SET_FLICKER,
  SET_ADMIN,
  SET_GAME,
} from './AppActions';
import monitor from '../monitor/monitorReducer';
import game from '../game/gameReducer';

export function flicker(state = true, action) {
  switch (action.type) {
    case SET_FLICKER:
      return action.flicker;
    default:
      return state;
  }
}

const gameStateInit = {
  admin: false,
  game: false
};
export function gameState(state = gameStateInit, action) {
  switch (action.type) {
    case SET_ADMIN:
      return {
        ...state,
        admin: action.admin,
      };
    case SET_GAME:
      return {
        ...state,
        game: action.game,
      };
    default:
      return state;
  }
}

export default combineReducers({
  flicker,
  gameState,
  monitor,
  game,
});
