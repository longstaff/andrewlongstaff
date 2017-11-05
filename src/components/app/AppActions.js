export const SET_FLICKER = 'com.andrewlongstaff.monitor.flicker.set';

export function setAppFlicker(flicker) {
  return {
    type: SET_FLICKER,
    flicker,
  };
}
