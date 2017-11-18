import { combineReducers } from 'redux';
import {
  CODE_REDUCE,
  CODE_ADD,
} from './GameActions';

const gameStateInit = {
  totalCodeLines: 15232,
  codeLines: 0,
  stage: 0,
  unlockMap: {}
};

export function gameState(state = gameStateInit, action) {
  switch (action.type) {
    case CODE_REDUCE:
      return Object.assign({}, state, {
        codeLines: state.codeLines - action.count
      });
    case CODE_ADD:
      return Object.assign({}, state, {
        codeLines: state.codeLines + action.count,
        totalCodeLines: state.totalCodeLines + action.count,
      });
    default:
      return state;
  }
}

export default combineReducers({
  gameState,
});
