import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "CREATE_ITEM" actions
function* createItem(action) {
  try {
		yield put({ type: 'ACTION_STARTING' }); // Set ready status to false.
		yield put({ type: 'CLEAR_ITEM_ERRORS' }); // Clear any existing errors.
		const response = yield axios.post('/items', action.payload); // Save data to database.
		yield put({ type: 'CREATE_ITEM_SUCCESS', payload: response.data }); // Update status message.
		yield put({ type: 'FETCH_ORG_ITEMS', id: action.id, payload: {}}) // Return to homepage.
		yield put({ type: 'SET_LIST_OR_NEW', payload: 'ItemList' })
		yield put({ type: 'ACTION_COMPLETED' });
  } catch (error) {
		console.log('Error creating item:', error.response);
		yield put({ type: 'CREATE_ITEM_ERROR', payload: error.respose.data });
		yield put({ type: 'ACTION_COMPLETED' });
  }
}

function* createItemSaga() {
	yield takeEvery('CREATE_ITEM', createItem);
}

export default createItemSaga;