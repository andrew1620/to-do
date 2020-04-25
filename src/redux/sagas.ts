import { takeEvery, put, call, all, select } from "redux-saga/effects";
import { reset } from "redux-form";

import {
  listsAPI,
  CreateListResponse,
  tasksAPI,
  CreateTaskResponse,
  GetTasksResponse,
  DeleteListResponse,
  DeleteTaskResponse,
  UpdateTaskResponse,
  authorizeAPI,
  MeResponse,
  LoginResponse,
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
  CHECK_AUTHORIZATION,
  setAuthorizeData,
  LOGIN,
  LoginAction,
  checkAuthorization,
  login,
  setTasksAmountToRequire,
} from "./toDoReducer";
import { getTasksAmountToRequire } from "./toDoSelectors";

export default function* rootSaga() {
  yield all([
    requireListsWatcher(),
    createListWatcher(),
    requireTasksWatcher(),
    createTaskWatcher(),
    deleteListWatcher(),
    deleteTaskWatcher(),
    updateTaskWatcher(),
    checkAuthorizationWatcher(),
    loginWatcher(),
  ]);
}

// ----AUTHORIZE----

const loginData = {
  email: "forNetworkServer@yandex.ru",
  password: "6832115",
  rememberMe: true,
};

export function* checkAuthorizationWatcher() {
  yield takeEvery(CHECK_AUTHORIZATION, checkAuthorizationWorker);
}
export function* checkAuthorizationWorker() {
  try {
    const data: MeResponse = yield call(authorizeAPI.me);
    if (data.resultCode === 0) {
      const { id, email, login } = data.data;
      yield put(setAuthorizeData(id, email, login));
    } else if (data.resultCode !== 0 && data.messages[0] === "You are not authorized") {
      yield put(login(loginData));
    } else {
      console.log(`Возникла ошибка на сервере во время авторизации: ${data.messages[0]}`);
    }
  } catch (err) {
    console.log(`Произошла ошибка во время авторизации: ${err}`);
  }
}

export function* loginWatcher() {
  yield takeEvery(LOGIN, loginWorker);
}
export function* loginWorker(action: LoginAction) {
  const { email, password, rememberMe } = action.payload;
  try {
    const data: LoginResponse = yield call(authorizeAPI.login, email, password, rememberMe);
    if (data.resultCode === 0) yield put(checkAuthorization());
    else console.log(`Возникла ошибка на сервере во время логинизации: ${data.messages[0]}`);
  } catch (err) {
    console.log(`Произошла ошибка по время логинизации: ${err}`);
  }
}

// ---LISTS---
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
  const { listId, count, page } = action.payload;
  try {
    const data: GetTasksResponse = yield call(tasksAPI.getTasks, listId, count, page);
    console.log("tasks--- ", data);

    yield put(setTasks(data.items, data.totalCount));
  } catch (err) {
    console.log("Ошибка при загрузке списка задач: ", err);
  }
}

export function* createTaskWatcher() {
  yield takeEvery(CREATE_TASK, createTaskWorker);
}
export function* createTaskWorker(action: CreateTaskAction) {
  yield put(reset("newTask"));
  try {
    const data: CreateTaskResponse = yield call(
      tasksAPI.createTask,
      action.payload.listId,
      action.payload.title
    );
    console.log("createTask--- ", data);

    if (data.resultCode === 0) {
      const tasksAmountToRequire = yield select(getTasksAmountToRequire);
      yield put(setTasksAmountToRequire(tasksAmountToRequire + 1));
      yield put(requireTasks(action.payload.listId, `${tasksAmountToRequire}`, "1"));
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
      const tasksAmountToRequire = yield select(getTasksAmountToRequire);

      yield put(setTasksAmountToRequire(tasksAmountToRequire - 1));
      yield put(requireTasks(listId, `${tasksAmountToRequire}`, "1"));
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
      const tasksAmountToRequire = yield select(getTasksAmountToRequire);
      yield put(requireTasks(listId, `${tasksAmountToRequire}`, "1"));
    } else {
      console.log(`Возникла ошибка на сервере во время изменения Таски: ${data.messages[0]}`);
    }
  } catch (err) {
    console.log("Произошла ошибка при изменении Таски: ", err);
  }
}
