import projectList from './projectList';

/*
  projectCompletion: {
    project1: 1000,
    project2: 500,
    project3: 200,
  },
  projectSelected: 'project1',
*/

function isVisible(gameState, completeState, val) {
  return completeState[val.id] !== true && val.isActive(gameState);
}
function getCurrentProjects(gameState, completeState) {
  return projectList.filter(isVisible.bind(this, gameState, completeState)).map((val) => {
    const { id, title, total } = val;
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

export default function(state) {
  return getCurrentProjects(state.gameState, state.complete).map(setPercComplete.bind(this, state.progress));
}
