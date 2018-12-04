import { combineReducers } from 'redux';

const setUserHome = (state = {view: 'ItemList', status: ''} , action) => {
	switch(action.type) {
		case 'SET_LIST_OR_NEW':
			return {...state, view: action.payload};
		case 'MENU_CLICK':
			return {...state, status: action.payload};
		default:
			return state;
	}
}

export default setUserHome;