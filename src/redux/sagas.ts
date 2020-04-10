import { takeEvery, put, call, all } from "redux-saga/effects";
import {
  listsAPI,
  CreateListResponse,
  tasksAPI,
  CreateTaskResponse,
  GetTasksResponse,
  DeleteListResponse,
  DeleteTaskResponse,
  UpdateTaskResponse,
} from "../API";
import {
  REQUIRE_LISTS,
  List,
  setLists,
  CREATE_LIST,
  CreateListAction,
  requireLists,
  CREATE_TASK,
  CreateTaskAction,
  requireTasks,
  REQUIRE_TASKS,
  RequireTasksAction,
  setTasks,
  DELETE_LIST,
  DeleteListAction,
  DELETE_TASK,
  DeleteTaskAction,
  UPDATE_TASK,
  UpdateTaskAction,
} from "./toDoReducer";

export default function* rootSaga() {
  yield all([
    requireListsWatcher(),
    createListWatcher(),
    requireTasksWatcher(),
    createTaskWatcher(),
    deleteListWatcher(),
    deleteTaskWatcher(),
    updateTaskWatcher(),
  ]);
}

// ---LIST---
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
    const data: CreateListResponse = yield call(listsAPI.createList, action.payload.title);

    if (data.resultCode === 0) {
      yield put(requireLists());
    } else {
      yield console.log("Ошибка при создании нового Листа: ", data.messages[0]);
    }
  } catch (err) {
    console.log(err);
  }
}

export function* deleteListWatcher() {
  yield takeEvery(DELETE_LIST, deleteListWorker);
}
export function* deleteListWorker(action: DeleteListAction) {
  try {
    const data: DeleteListResponse = yield call(listsAPI.deleteList, action.payload.listId);

    if (data.resultCode === 0) {
      yield put(requireLists());
    } else {
      console.log(`Возникла ошибка при удалении Листа: ${data.messages[0]}`);
    }
  } catch (err) {
    console.log("Ошибка при удалении List: ", err);
  }
}

// ---TASK---

export function* requireTasksWatcher() {
  yield takeEvery(REQUIRE_TASKS, requireTasksWorker);
}
export function* requireTasksWorker(action: RequireTasksAction) {
  try {
    const data: GetTasksResponse = yield call(tasksAPI.getTasks, action.payload.listId);
    console.log("tasks--- ", data.items);

    yield put(setTasks(data.items, data.totalCount));
  } catch (err) {
    console.log("Ошибка при загрузке списка задач: ", err);
  }
}

export function* createTaskWatcher() {
  yield takeEvery(CREATE_TASK, createTaskWorker);
}
export function* createTaskWorker(action: CreateTaskAction) {
  try {
    const data: CreateTaskResponse = yield call(
      tasksAPI.createTask,
      action.payload.listId,
      action.payload.title
    );
    console.log("createTask--- ", data);

    if (data.resultCode === 0) {
      yield put(requireTasks(action.payload.listId));
    } else {
      yield console.log("Ошибка при создании Таски: ", data.messages[0]);
    }
  } catch (err) {
    console.log("Ошибка при создании Таски:", err);
  }
}

export function* deleteTaskWatcher() {
  yield takeEvery(DELETE_TASK, deleteTaskWorker);
}
export function* deleteTaskWorker(action: DeleteTaskAction) {
  const { listId, taskId } = action.payload;
  try {
    const data: DeleteTaskResponse = yield call(tasksAPI.deleteTask, listId, taskId);
    if (data.resultCode === 0) {
      yield put(requireTasks(listId));
    } else {
      console.log(`Возникла ошибка на сервере во время удаления Таски: ${data.messages[0]}`);
    }
  } catch (err) {
    console.log(`Возникла ошибка во время удаления Таски: ${err}`);
  }
}

export function* updateTaskWatcher() {
  yield takeEvery(UPDATE_TASK, updateTaskWorker);
}
export function* updateTaskWorker(action: UpdateTaskAction) {
  console.log("Сработал апдейт");

  const { listId, taskId, newTaskStatus } = action.payload;
  try {
    const data: UpdateTaskResponse = yield call(tasksAPI.updateTask, listId, taskId, newTaskStatus);

    if (data.resultCode === 0) {
      yield put(requireTasks(listId));
    } else {
      console.log(`Возникла ошибка на сервере во время изменения Таски: ${data.messages[0]}`);
    }
  } catch (err) {
    console.log("Произошла ошибка при изменении Таски: ", err);
  }
}
