const statusMessage = (state = null, action) => {
  switch(action.type) {
		case 'CLEAR_ITEM_ERRORS':
			return null;
		case 'CREATE_ITEM_ERROR':
			return action.payload;
		case 'CREATE_ITEM_SUCCESS':
			return action.payload;
		case 'FETCH_ITEMS_ERROR':
			return action.payload;
		case 'FETCH_ITEMS_SUCCESS':
			return action.payload;
		case 'ACTION_SUCCESS':
			return action.payload;
		case 'ACTION_ERROR':
			return action.payload;
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

export default statusMessage;