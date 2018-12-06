const setUserHome = (state = 'ItemList', action) => {
	switch(action.type) {
		case 'SET_LIST_OR_NEW':
			return action.payload;
		default:
			return state;
	}
}

export default setUserHome;