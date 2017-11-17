export const SET_FLICKER = 'com.andrewlongstaff.monitor.flicker.set';
export const SET_ADMIN = 'com.andrewlongstaff.monitor.admin.set';
export const SET_GAME = 'com.andrewlongstaff.monitor.game.set';

export function setAppFlicker(flicker) {
  return {
    type: SET_FLICKER,
    flicker,
  };
}

export function setAdmin(admin = true) {
  return {
    type: SET_ADMIN,
    admin,
  };
}
export function startGame() {
  return {
    type: SET_GAME,
    game: true,
  };
}
export function endGame() {
  return {
    type: SET_GAME,
    game: false,
  };
}
