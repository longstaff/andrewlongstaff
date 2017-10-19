export function addCall(call, response) {
  return {
    type: 'CALL_ADD',
    call,
    response
  };
}
export function clearHistory() {
  return {
    type: 'CALL_CLEAR'
  };
}

export function setLoading() {
  return {
    type: 'SET_LOADING'
  };
}
export function clearLoading() {
  return {
    type: 'CLEAR_LOADING'
  };
}
