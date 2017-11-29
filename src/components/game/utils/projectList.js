import Project from './Project';
import {
  BASE_AI_ID,
  BASE_KETTLE_ID,
  BASE_AI_CODE,
  BASE_KETTLE_CODE,
  BASE_CODE_TOTAL,
  BUTTON_TEA,
} from '../constants';
import {
  unlockButton,
  disableButton,
  enableButton,
} from '../GameActions';

function isProjectUnlocked(completeState, id) {
  return completeState[id] === true;
}
function isTotalLinesOver(gameState, count) {
  return gameState.totalCodeLines - BASE_CODE_TOTAL > count;
}
function unlockAction(id) {
  return unlockButton(id);
}

const phase1 = [
  new Project(
    BASE_KETTLE_ID,
    'Auto Kettle',
    BASE_KETTLE_CODE + 10,
    gameState => isTotalLinesOver(gameState, 5),
    (dispatch) => {
      return dispatch(unlockAction(BUTTON_TEA));
    }
  ),
  new Project(
    BASE_AI_ID,
    'AI Project',
    BASE_AI_CODE + 20,
    () => true,
    () => {}
  )
];


export default [].concat(phase1);

/*
  new Project(
    'project1',
    'AI Project',
    2000,
    (state) => {
      return true;
    },
    () => {}
  ),
  new Project(
    'project2',
    'Other Project',
    2000,
    (state) => {
      return true;
    },
    () => {}
  ),
  new Project(
    'project3',
    'Disabled Project',
    2000,
    (state) => {
      return true;
    },
    () => {}
  ),
];
*/
