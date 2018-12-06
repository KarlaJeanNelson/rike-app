import { combineReducers } from 'redux';
import statusMessage from './statusMessage.reducer';
import data from './itemData.reducer';
import renderScreen from './setUserHome.reducer'

const itemReducer = combineReducers({
	statusMessage, // contains item error/success messages
	data, // item data,
	renderScreen,
});

export default itemReducer;