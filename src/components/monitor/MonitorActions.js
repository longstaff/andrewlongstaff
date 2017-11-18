import ReactGA from 'react-ga';
import commandFactory from './commandFactory';
import {
  setAppFlicker,
  startGame,
  setAdmin,
} from '../app/AppActions';
import writeToConsole from '../console/Console';

export const CALL_UPDATE = 'com.andrewlongstaff.monitor.call.update';
export const CALL_ADD = 'com.andrewlongstaff.monitor.call.add';
export const CALL_CLEAR = 'com.andrewlongstaff.monitor.call.clear';
export const MESSAGE_ADD = 'com.andrewlongstaff.monitor.message.add';
export const SET_LOADING = 'com.andrewlongstaff.monitor.loading.set';
export const CLEAR_LOADING = 'com.andrewlongstaff.monitor.loading.clear';

const uuid = require('uuid/v1');

export function addCall(id, call, response) {
  return {
    type: CALL_ADD,
    id,
    call,
    response
  };
}
export function updateResponse(id, response) {
  return {
    type: CALL_UPDATE,
    id,
    response
  };
}
export function clearHistory() {
  return {
    type: CALL_CLEAR
  };
}
export function addMessage(message) {
  return {
    type: MESSAGE_ADD,
    message
  };
}

export function setLoading() {
  return {
    type: SET_LOADING
  };
}
export function clearLoading() {
  return {
    type: CLEAR_LOADING
  };
}

// Thunk for async results
function mockAsync(time = Math.floor(Math.random() * 1000)) {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
}
function loopAsync(arr, ind, dispatch, update) {
  const time = ind !== 0 ? 100 : undefined;
  return mockAsync(time).then(() => {
    dispatch(update(arr.slice(0, ind)));
    if (ind < arr.length) {
      return loopAsync(arr, ind + 1, dispatch, update);
    }
    return true;
  });
}
export function callResponse(call, response, errorState = 0, specialLog = '') {
  const id = uuid();
  return (dispatch) => {
    dispatch(setLoading());
    dispatch(addCall(id, call));

    if (Array.isArray(response)) {
      loopAsync(response, 1, dispatch, updateResponse.bind(this, id)).then(() => {
        dispatch(clearLoading());
      });
    } else {
      mockAsync().then(() => {
        dispatch(updateResponse(id, response));
        dispatch(clearLoading());
      });
    }

    writeToConsole(`User request: exec(${call})`);
    writeToConsole(specialLog, errorState);
  };
}

// Thunk for async results
export function sendCall(call, fromConsole = false) {
  return (dispatch, getState) => {
    ReactGA.event({
      category: fromConsole ? 'console' : 'command',
      action: call,
    });
    const state = getState();
    const response = commandFactory(call, state.gameState);
    dispatch(response());
  };
}

export function setFlicker(flicker, call, response) {
  return (dispatch) => {
    dispatch(setAppFlicker(flicker));
    dispatch(callResponse(call, response));
  };
}

export function setStartGame(call, response, errorState = 0, specialLog = '') {
  return (dispatch) => {
    dispatch(callResponse(call, response, errorState, specialLog));

    mockAsync(1500).then(() => {
      dispatch(startGame());
    });
  };
}

export function setAdminStatus(status, call, response, errorState = 0, specialLog = '') {
  return (dispatch) => {
    dispatch(setAdmin(status));
    dispatch(callResponse(call, response, errorState, specialLog));
  };
}

export function addWelcomeMessageIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const { admin } = state.gameState;

    if (
      state.monitor.history &&
      state.monitor.history.length &&
      state.monitor.history[state.monitor.history.length - 1].response !== 'Welcome Back, Guest' &&
      state.monitor.history[state.monitor.history.length - 1].response !== 'Welcome Back, Andrew'
    ) {
      ReactGA.event({
        category: 'return',
        action: admin ? 'admin' : 'guest',
      });
      dispatch(addMessage(`Welcome Back, ${admin ? 'Andrew' : 'Guest'}`));
    }
  };
}
