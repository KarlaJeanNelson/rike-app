import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* renderUserHome(action) {
	try {
		yield put({ type: 'ACTION_STARTING' });
		yield put({ type: 'SET_LIST_OR_NEW', payload: action.payload });
		yield put({ type: 'ACTION_COMPLETED'});
	} catch (error) {
		console.log('Error creating item:', error.response);
		yield put({ type: 'CREATE_ITEM_ERROR', payload: error.respose.data });
		yield put({ type: 'ACTION_COMPLETED' });
	}
}

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

function* createPickup(action) {
	try {
		yield put({ type: 'ACTION_STARTING' });
		yield put({ type: 'CLEAR_ITEM_ERRORS' });
		const response = yield axios.post('/items/pickups', action.payload);
		yield put({ type: 'CREATE_ITEM_SUCCESS', payload: response.data });
		yield put({
			type: 'UPDATE_ITEM',
			item_id: action.payload.item_id,
			payload: { 
				status: 'scheduled',
				updated_by: action.payload.updated_by
			}
		})
		yield put({ type: 'FETCH_AVAILABLE_ITEMS' });
		yield put({ type: 'ACTION_COMPLETED' });
	} catch (e) {
		yield put({ type: 'CREATE_ITEM_ERROR', payload: e.response.data });
		yield put({ type: 'ACTION_COMPLETED' });
	}
}

function* createItemSaga() {
	yield takeEvery('CREATE_ITEM', createItem);
	yield takeEvery('CREATE_PICKUP', createPickup);
	yield takeEvery('RENDER_USER_HOME', renderUserHome);
}

export default createItemSaga;