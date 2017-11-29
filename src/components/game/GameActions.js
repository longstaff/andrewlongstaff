export const CODE_REDUCE = 'com.andrewlongstaff.game.code.reduce';
export const CODE_ADD = 'com.andrewlongstaff.game.code.add';
export const PROJECT_COMPLETE = 'com.andrewlongstaff.game.project.complete';
export const PROJECT_PROGRESS = 'com.andrewlongstaff.game.project.progress';
export const BUTTON_ACTIVE = 'com.andrewlongstaff.game.button.active';
export const BUTTON_DISABLED = 'com.andrewlongstaff.game.button.disabled';

export function addCodeLines(count) {
  return {
    type: CODE_ADD,
    count
  };
}
export function unlockButton(id) {
  return {
    type: BUTTON_ACTIVE,
    id,
    active: true
  };
}
export function disableButton(id) {
  return {
    type: BUTTON_DISABLED,
    id,
    disabled: true,
  };
}
export function enableButton(id) {
  return {
    type: BUTTON_DISABLED,
    id,
    disabled: false,
  };
}

export function setProjectComplete(id) {
  return {
    type: PROJECT_COMPLETE,
    id,
    complete: true,
  };
}
export function setProjectProgress(id, progress) {
  return {
    type: PROJECT_PROGRESS,
    id,
    progress,
  };
}

export function addProjectProgress(id, progress) {
  return (dispatch) => {
    dispatch(addCodeLines(progress));
    dispatch(setProjectProgress(id, progress));
  };
}
