import { combineReducers } from 'redux';
import statusMessage from './statusMessage.reducer';
import data from './itemData.reducer';

const itemReducer = combineReducers({
	statusMessage, // contains item error/success messages
	data, // item data
});

export default itemReducer;