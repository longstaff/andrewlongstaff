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
export function callResponse(call, response) {
  const id = uuid();
  return (dispatch) => {
    dispatch(setLoading());
    dispatch(addCall(id, call));

    const time = Math.floor(Math.random() * 1000);
    setTimeout(() => {
      dispatch(updateResponse(id, response));
      dispatch(clearLoading());
    }, time);
  };
}
