import { takeEvery, put, call, all } from "redux-saga/effects";
import { listsAPI, CreateListResponse } from "../API";
import {
  REQUIRE_LISTS,
  List,
  setLists,
  CREATE_LIST,
  CreateListAction,
  requireLists,
} from "./toDoReducer";

export function* requireListsWatcher() {
  yield takeEvery(REQUIRE_LISTS, requireListsWorker);
}
export function* requireListsWorker() {
  try {
    const listsData: Array<List> = yield call(listsAPI.getLists);
    console.log("listsData--- ", listsData);

    yield put(setLists(listsData));
  } catch (err) {
    console.log(err);
  }
}

export function* createListWatcher() {
  yield takeEvery(CREATE_LIST, createListWorker);
}
export function* createListWorker(action: CreateListAction) {
  try {
    const data: CreateListResponse = yield call(
      listsAPI.createList,
      action.payload.title
    );
    console.log("createList--- ", data);
    if (data.resultCode === 0) yield put(requireLists());
    else
      yield console.log("Ошибка при создании нового Листа: ", data.messages[0]);
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield all([requireListsWatcher(), createListWatcher()]);
}
