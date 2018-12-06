import { all } from 'redux-saga/effects';
import loginSaga from '../Login/saga';
import registrationSaga from '../Register/saga';
import toggleModeSaga from './toggleMode.saga';
import userSaga from './user.saga';

// bundle all of the auth sagas
export default function* authSaga() {
  yield all([
    loginSaga(),
		registrationSaga(),
		toggleModeSaga(),
    userSaga(),
  ]);
}