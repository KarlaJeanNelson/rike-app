import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "TOGGLE_MODE" actions
function* toggleMode(action) {
  try {
    // clear any existing auth errors
		yield put({ type: 'CLEAR_AUTH_ERRORS' });
		
		// set loginMode
		yield put({ type: action.payload })
  } catch (error) {
      console.log(error.response);
  }
}

function* toggleModeSaga() {
  yield takeEvery('TOGGLE_MODE', toggleMode);
}

export default toggleModeSaga;