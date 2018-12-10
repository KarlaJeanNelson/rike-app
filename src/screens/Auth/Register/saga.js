import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
	try {
		// clear any existing error on the registration page
		yield put({ type: 'CLEAR_AUTH_ERRORS' });
		console.log(action.payload);

		// passes the username and password from the payload to the server
		yield axios.post('api/user/register', action.payload);

		// automatically log a user in after registration
		yield put({ type: 'LOGIN', payload: action.payload });
    
		// set to 'login' mode so they see the login screen
		// after registration or after they log out
		yield put({type: 'SET_TO_LOGIN_MODE'});
	} catch (error) {
		console.log('Error with user registration:', error.response);
		if (error.response.data.code === 23505) {
			// PostgreSQL will throw a 23505 error if username is already taken.
			yield put({ type: 'USERNAME_TAKEN' });
		} else if (error.response.data.code === 23503) {
			// PostgreSQL will throw a 23503 error if location id does not exist in locations table.
			yield put({ type: 'INCORRECT_LOCATION'});
		} else {
			// Got some other error.
			// Could be anything, but most common cause is that the server is not started.
			yield put({ type: 'AUTH_FAILED_NO_CODE', payload: error.response });
		}
		// yield put({type: 'AUTH_FAILED_NO_CODE'});
	}
}

function* registrationSaga() {
	yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
