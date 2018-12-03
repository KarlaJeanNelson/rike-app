import { all } from 'redux-saga/effects';
import createItemSaga from './createItem.saga';
import fetchItemsSaga from './fetchItems.saga';

// bundle all of the item sagas
export default function* itemSaga() {
  yield all([
		createItemSaga(),
		fetchItemsSaga(),
  ]);
}