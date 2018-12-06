const newItemReducer = (state = {}, action) => {
  switch(action.type) {
		case 'SET_ITEM_DATA':
      return {
        ...state,
        basicData: action.payload
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

export default newItemReducer;