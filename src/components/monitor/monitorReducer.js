import { combineReducers } from 'redux';
import {
  CALL_ADD,
  CALL_CLEAR,
  CALL_UPDATE,
  MESSAGE_ADD,
  SET_LOADING,
  CLEAR_LOADING
} from './MonitorActions';

const uuid = require('uuid/v1');

const MAX_INPUT_LENGTH = 200;
const MAX_HISTORY_LENGTH = 20;

function getDateString(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const historyInit = [
  {
    id: 'intro_line_1',
    response: [
      'Welcome to Andrew Longstaff Terminal! (v 1.1.0)',
      getDateString(new Date()),
    ]
  }, {
    id: 'intro_line_2',
    response: 'Documentation: type \'help\' for command list'
  }
];
const editStateInit = { loading: false };
const callListInit = [];

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
      ].slice(-MAX_HISTORY_LENGTH);
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
          id: uuid(),
          response: action.message
        }
      ].slice(-MAX_HISTORY_LENGTH);
    case CALL_CLEAR:
      return [];
    default:
      return state;
  }
}
export function callList(state = callListInit, action) {
  switch (action.type) {
    case CALL_ADD:
      return [
        action.call,
        ...state
      ].slice(0, MAX_INPUT_LENGTH);
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
  history,
  callList
});
