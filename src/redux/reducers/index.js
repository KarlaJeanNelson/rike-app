import { combineReducers } from 'redux';
import auth from '../../screens/Auth/reducers/index';
import item from '../../screens/Protected/Items/reducers/index';

// Reducer used to indicate whether app is busy (e.g. fetching data) or ready
const ready = (state = true, action) => {
	switch (action.type) {
		case 'ACTION_STARTING':
			return false;
		case 'ACTION_COMPLETED':
			return true;
		default:
			return state;
	}
}

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
	auth, // loginMode, errorMessage, and user
	item,
	ready,
});

export default rootReducer;