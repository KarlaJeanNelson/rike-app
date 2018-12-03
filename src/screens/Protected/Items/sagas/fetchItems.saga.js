import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllItems(action) {

}

function* fetchAvailableItems(action) {
	try {
		yield put({ type: 'ACTION_STARTING' }) // Set ready status to false.
		yield put({ type: 'CLEAR_ITEM_ERRORS' }); // Clear any existing errors.
		yield put({ type: 'CLEAR_ITEM_DATA' }); // Clear item data information in redux state.
		const response = yield axios.get('/items/browse'); // Get data.
		yield put({ type: 'FETCH_ITEMS_SUCCESS', payload: response.statusText }); // Update status message.
		yield put({ type: 'SET_ITEM_LIST', payload: response.data }); // Display list of items.
		yield put({ type: 'ACTION_COMPLETED' }); // Set ready status to true.
	} catch (error) {
		console.log('Error fetching items:', error.response);
		yield put({ type: 'FETCH_ITEMS_ERROR', payload: error.response.data });
		yield put({ type: 'ACTION_COMPLETED' });
	}
}

function* fetchOrgItems(action) {
  try {
		console.log(action);
		yield put({ type: 'ACTION_STARTING' }) // Set ready status to false.
		yield put({ type: 'CLEAR_ITEM_ERRORS' }); // Clear any existing errors.
		yield put({ type: 'CLEAR_ITEM_DATA' }); // Clear item data information in redux state.
		
		// Get data.
		const response = yield axios.get(`/items/org/${action.id}`, { params: { ...action.payload } });
		yield put({ type: 'FETCH_ITEMS_SUCCESS', payload: response.statusText }); // Update status message.
		yield put({ type: 'SET_ITEM_LIST', payload: response.data }); // Display list of items.
		yield put({ type: 'ACTION_COMPLETED' }); // Set ready status to true.
  } catch (error) {
		console.log('Error fetching items:', error.response);
		yield put({ type: 'FETCH_ITEMS_ERROR', payload: error.response.data });
		yield put({ type: 'ACTION_COMPLETED' });
  }
}

function* fetchItems(action) {
  try {
		console.log(action);
		yield put({ type: 'ACTION_STARTING' }) // Set ready status to false.
		yield put({ type: 'CLEAR_ITEM_ERRORS' }); // Clear any existing errors.
		yield put({ type: 'CLEAR_ITEM_DATA' }); // Clear item data information in redux state.
		const response = yield axios.get('/items', { params: { ...action.payload } }); // Get data.
		yield put({ type: 'FETCH_ITEMS_SUCCESS', payload: response.statusText }); // Update status message.
		yield put({ type: 'SET_ITEM_LIST', payload: response.data }); // Display list of items.
		yield put({ type: 'ACTION_COMPLETED' }); // Set ready status to true.
  } catch (error) {
		console.log('Error fetching items:', error.response);
		yield put({ type: 'FETCH_ITEMS_ERROR', payload: error });
		yield put({ type: 'ACTION_COMPLETED' });
  }
}

function* fetchItemsSaga() {
	yield takeEvery('FETCH_ALL_ITEMS', fetchAllItems);
	yield takeEvery('FETCH_AVAILABLE_ITEMS', fetchAvailableItems);
	yield takeEvery('FETCH_ORG_ITEMS', fetchOrgItems);
	yield takeEvery('FETCH_ITEMS', fetchItems);
}

export default fetchItemsSaga;