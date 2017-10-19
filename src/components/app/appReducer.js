import { history, editState } from '../monitor/monitorReducer';

export default function AppReducer(state = {}, action) {
  return {
    history: history(state.history, action),
    editState: editState(state.editState, action)
  };
}
