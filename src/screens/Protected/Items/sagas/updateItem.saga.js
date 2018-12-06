import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateItem(action) {
  try {
		yield put({ type: 'ACTION_STARTING' }) // Set ready status to false.
		yield put({ type: 'CLEAR_ITEM_ERRORS' }); // Clear any existing errors.
		const response = yield axios.put(`/items/${action.payload.item_id}`, action.payload); // Save data to database.
		yield put({ type: 'CREATE_ITEM_SUCCESS', payload: response.data }); // Update status message.
		yield put({ type: 'ACTION_COMPLETED' });
  } catch (error) {
		console.log('Error creating item:', error.response);
		yield put({ type: 'CREATE_ITEM_ERROR', payload: error.respose.data });
		yield put({ type: 'ACTION_COMPLETED' });
  }
}

function* updateItemSaga() {
  yield takeEvery('UPDATE_ITEM', updateItem);
}

export default createItemSaga;