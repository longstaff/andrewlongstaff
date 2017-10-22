/* global localStorage */
export const STATE_CONFIG = 'com.andrewlongstaff.state.config';

export const loadState = (key) => {
  try {
    let retVal;
    const state = localStorage.getItem(key);
    if (state !== null) {
      retVal = JSON.parse(state);
    }
    return retVal;
  } catch (err) {
    console.error(`Load state ${key} failed with err ${err}`);
    return undefined;
  }
};
export const saveState = (key, val) => {
  try {
    const json = JSON.stringify(val);
    return localStorage.setItem(key, json);
  } catch (err) {
    console.error(`Save state ${key} failed with err ${err}`);
    return false;
  }
};

export const loadConfig = loadState.bind(this, STATE_CONFIG);
export const saveConfig = saveState.bind(this, STATE_CONFIG);
