import { combineReducers } from 'redux';
import {
  CODE_ADD,
  PROJECT_COMPLETE,
  PROJECT_PROGRESS,
} from './GameActions';

const gameStateInit = {
  totalCodeLines: 15232,
  stage: 0
};

export function gameState(state = gameStateInit, action) {
  switch (action.type) {
    case CODE_ADD:
      return Object.assign({}, state, {
        totalCodeLines: state.totalCodeLines + action.count,
      });
    default:
      return state;
  }
}

export function complete(state = {}, action) {
  switch (action.type) {
    case PROJECT_COMPLETE:
      return Object.assign({}, state, {
        [action.id]: action.complete
      });
    default:
      return state;
  }
}


export function progress(state = {}, action) {
  let newProgress;
  switch (action.type) {
    case PROJECT_COMPLETE:
      newProgress = Object.assign({}, state);
      delete newProgress[action.id];
      return newProgress;
    case PROJECT_PROGRESS:
      return Object.assign({}, state, {
        [action.id]: (state[action.id] || 0) + action.progress
      });
    default:
      return state;
  }
}

export default combineReducers({
  gameState,
  complete,
  progress,
});
