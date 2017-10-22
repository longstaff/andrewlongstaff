export const CALL_ADD = 'com.andrewlongstaff.monitor.call.add';
export const CALL_CLEAR = 'com.andrewlongstaff.monitor.call.clear';
export const MESSAGE_ADD = 'com.andrewlongstaff.monitor.message.add';
export const SET_LOADING = 'com.andrewlongstaff.monitor.loading.set';
export const CLEAR_LOADING = 'com.andrewlongstaff.monitor.loading.clear';

export function addCall(call, response) {
  return {
    type: CALL_ADD,
    call,
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
