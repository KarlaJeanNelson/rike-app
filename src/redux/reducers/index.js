import { combineReducers } from 'redux';
import loginMode from '../../screens/Auth/Login/reducers/mode';
import loginMessage from '../../screens/Auth/Login/reducers/message';
import user from '../../screens/User/reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
	loginMode, // login or registration mode
	loginMessage, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
});

export default rootReducer;
