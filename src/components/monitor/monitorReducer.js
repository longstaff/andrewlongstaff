import { combineReducers } from 'redux';
import {
  CALL_ADD,
  CALL_CLEAR,
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
          id: state + 1,
          call: action.call,
          response: action.response
        }
      ];
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
