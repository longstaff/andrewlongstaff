let historyInit = [];
let editState = { loading: false };

export function history(state = historyInit, action) {
	switch(action.type) {
		case "CALL_ADD":
			return [
				...state,
				{
					id: state + 1,
					call: action.call,
					response: action.response
				}
			];
			break;
		case "CALL_CLEAR":
			return [];
			break;
		default:
			return state;
			break;
	}
}

export function editState(state = editState, action) {
	switch(action.type) {
		case "SET_LOADING":
			state.loading = true;
			return state
			break;
		case "CLEAR_LOADING":
			state.loading = false;
			return state
			break;
		default:
			return state;
			break;
	}
}