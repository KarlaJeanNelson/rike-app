import { combineReducers } from 'redux';
import errorMessage from './errorMessage.reducer';
import loginMode from './loginMode.reducer';
import user from './user.reducer';

const authReducer = combineReducers({
	loginMode, // login or registration mode
	errorMessage, // contains auth error message
  user, // will have an id and username if someone is logged in
});

export default authReducer;
