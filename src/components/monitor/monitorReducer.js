import { combineReducers } from 'redux';
import {
  CALL_ADD,
  CALL_CLEAR,
  CALL_UPDATE,
  MESSAGE_ADD,
  SET_LOADING,
  CLEAR_LOADING
} from './MonitorActions';

const historyInit = [];
const editStateInit = { loading: false };

export function history(state = historyInit, action) {
  switch (action.type) {
    case CALL_ADD:
      return [
        ...state,
        {
          id: action.id,
          call: action.call,
          response: action.response
        }
      ];
    case CALL_UPDATE:
      return state.map((val) => {
        let newState = val;
        if (val.id === action.id) {
          newState = Object.assign({}, val, {
            response: action.response
          });
        }
        return newState;
      });
    case MESSAGE_ADD:
      return [
        ...state,
        {
          id: state + 1,
          response: action.message
        }
      ];
    case CALL_CLEAR:
      return [];
    default:
      return state;
  }
}

export function loader(state = editStateInit, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default combineReducers({
  loader,
  history
});
