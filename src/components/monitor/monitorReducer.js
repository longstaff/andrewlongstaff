import { combineReducers } from 'redux';
import {
  CALL_ADD,
  CALL_CLEAR,
  CALL_UPDATE,
  MESSAGE_ADD,
  SET_LOADING,
  CLEAR_LOADING
} from './MonitorActions';

function getDateString(date) {
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const historyInit = [
  {
    id: 'intro_line_1',
    response: [
      'Welcome to Andrew Longstaff Terminal! (v 1.1.0)',
      getDateString(new Date())
    ]
  }, {
    id: 'intro_line_2',
    response: 'Documentation: type \'help\' for command list'
  }
];
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
