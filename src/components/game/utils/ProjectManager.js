import projectList from './projectList';

function isVisible(gameState, completeState, val) {
  return completeState[val.id] !== true && val.isActive(gameState, completeState);
}
function getCurrentProjects(gameState, completeState) {
  return projectList.filter(isVisible.bind(this, gameState, completeState)).map((val) => {
    const {
      id,
      title,
      total,
    } = val;
    return {
      id,
      title,
      total,
    };
  });
}

function setPercComplete(progressState, val) {
  const complete = progressState[val.id] || 0;
  return Object.assign({}, val, {
    complete,
  });
}

export function triggerProjectComplete(id, dispatch) {
  return projectList.find(val => val.id === id).completeProject(dispatch);
}
export function getProjectsMap(state) {
  return getCurrentProjects(state.gameState, state.complete, state.progress)
    .map(setPercComplete.bind(this, state.progress));
}
