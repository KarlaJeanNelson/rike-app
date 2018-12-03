const itemData = (state = null, action) => {
  switch(action.type) {
		case 'CLEAR_ITEM_DATA':
			return null;
		case 'SET_SINGLE_ITEM':
			return action.payload;
		case 'SET_ITEM_LIST':
			return action.payload;
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

export default itemData;