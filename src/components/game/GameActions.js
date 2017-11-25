export const CODE_REDUCE = 'com.andrewlongstaff.game.code.reduce';
export const CODE_ADD = 'com.andrewlongstaff.game.code.add';
export const PROJECT_COMPLETE = 'com.andrewlongstaff.game.project.complete';
export const PROJECT_PROGRESS = 'com.andrewlongstaff.game.project.progress';

export function addCodeLines(count) {
  return {
    type: CODE_ADD,
    count
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
