import { combineReducers } from 'redux';
import { SET_FLICKER } from './AppActions';
import monitor from '../monitor/monitorReducer';

export function flicker(state = true, action) {
  switch (action.type) {
    case SET_FLICKER:
      return action.flicker;
    default:
      return state;
  }
}

export default combineReducers({
  flicker,
  monitor
});
