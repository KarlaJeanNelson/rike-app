import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateItem(action) {
  try {
		yield put({ type: 'ACTION_STARTING' }) // Set ready status to false.
		yield put({ type: 'CLEAR_ITEM_ERRORS' }); // Clear any existing errors.
		const response = yield axios.put(`/items/${action.item_id}`, action.payload); // Save data to database.
		yield put({ type: 'ACTION_SUCCESS', payload: `${response.status} ${response.statusText}` }); // Update status message.
		yield put({ type: 'FETCH_ITEMS', payload: {status: action.next_screen} });

  } catch (error) {
		console.log('Error updating item:', error.response);
		yield put({ type: 'ACTION_ERROR', payload: error.response.data });
		yield put({ type: 'ACTION_COMPLETED' });
  }
}

function* updateItemSaga() {
  yield takeEvery('UPDATE_ITEM', updateItem);
}

export default updateItemSaga;