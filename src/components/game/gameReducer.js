import { combineReducers } from 'redux';
import {
  CODE_ADD,
  PROJECT_COMPLETE,
  PROJECT_PROGRESS,
  BUTTON_ACTIVE,
  BUTTON_DISABLED,
} from './GameActions';
import {
  BASE_AI_ID,
  BASE_KETTLE_ID,
  BASE_AI_CODE,
  BASE_KETTLE_CODE,
  BASE_CODE_TOTAL,
  BUTTON_CODE,
} from './constants';

const gameStateInit = {
  totalCodeLines: BASE_CODE_TOTAL,
  stage: 0,
  activeButtons: {
    [BUTTON_CODE]: true
  },
  disabledButtons: {},
};
const progressInit = {
  [BASE_AI_ID]: BASE_AI_CODE,
  [BASE_KETTLE_ID]: BASE_KETTLE_CODE,
};

export function gameState(state = gameStateInit, action) {
  switch (action.type) {
    case CODE_ADD:
      return Object.assign({}, state, {
        totalCodeLines: state.totalCodeLines + action.count,
      });
    case BUTTON_ACTIVE:
      return Object.assign({}, state, {
        activeButtons: Object.assign({}, state.activeButtons, {
          [action.id]: action.active
        })
      });
    case BUTTON_DISABLED:
      return Object.assign({}, state, {
        disabledButtons: Object.assign({}, state.disabledButtons, {
          [action.id]: action.disabled
        })
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


export function progress(state = progressInit, action) {
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
