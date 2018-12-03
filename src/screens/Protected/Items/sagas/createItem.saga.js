import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "CREATE_ITEM" actions
function* createItem(action) {
  try {
		// Set ready status to false.
		yield put({ type: 'ACTION_STARTING' })

		// Clear any existing errors.
		yield put({ type: 'CLEAR_ITEM_ERRORS' });

		// Save data to database.
		const response = yield axios.post('/items', action.payload);

		// Update status message.
		yield put({ type: 'CREATE_ITEM_SUCCESS', payload: response.data });

		// Get 
		yield put
		
		// Clear item data information in redux state.
		yield put({ type: 'CLEAR_ITEM_DATA' });

		// Get list of items.
		const items = yield axios.get('/items');

		// Display list of items.
		yield put({ type: 'SET_ITEM_LIST', payload: items.data });

		// Set ready status to true.
		yield put({ type: 'ACTION_COMPLETED' });

  } catch (error) {
			console.log('Error creating item:', error.response);
			yield put({ type: 'CREATE_ITEM_ERROR', payload: error });
			yield put({ type: 'ACTION_COMPLETED' });
  }
}

function* createItemSaga() {
  yield takeEvery('CREATE_ITEM', createItem);
}

export default createItemSaga;