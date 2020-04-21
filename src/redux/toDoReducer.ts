import { NewTaskStatus } from "../API";

export const CHECK_AUTHORIZATION = "todo/CHECK_AUTHORIZATION";
export const SET_AUTHORIZE_DATA = "todo/SET_AUTHORIZE_DATA";
export const LOGIN = "todo/LOGIN";

export const REQUIRE_LISTS = "todo/REQUIRE_LISTS";
export const SET_LISTS = "todo/SET_LISTS";
export const CREATE_LIST = "todo/CREATE_LIST";
export const DELETE_LIST = "todo/DELETE_LIST";

export const REQUIRE_TASKS = "todo/REQUIRE_TASKS";
export const SET_TASKS = "todo/SET_TASKS";
export const CREATE_TASK = "todo/CREATE_TASK";
export const UPDATE_TASK = "todo/UPDATE_TASK";
export const DELETE_TASK = "todo/DELETE_TASK";
export const SET_TASKS_AMOUNT_TO_REQUIRE = "todo/SET_TASKS_AMOUNT_TO_REQUIRE";

export type List = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};
export type Task = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

const initialState = {
  authorizeData: {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
  },
  lists: null as Array<List> | null,
  tasks: null as Array<Task> | null,
  tasksTotalCount: null as number | null,
  tasksAmountToRequire: 15,
};

export type InitialState = typeof initialState;
type Action =
  | RequireListsAction
  | SetListsAction
  | DeleteListAction
  | RequireTasksAction
  | SetTasksAction
  | DeleteTaskAction
  | CheckAuthorizationAction
  | SetAuthorizeDataAction
  | SetTasksAmountToRequireAction;

const toDoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_AUTHORIZE_DATA:
      return { ...state, authorizeData: { ...action.payload } };
    case SET_LISTS:
      return { ...state, lists: [...action.payload] };
    case SET_TASKS:
      return {
        ...state,
        tasks: [...action.payload.items],
        // tasks: [...(state.tasks || []), ...action.payload.items],
        tasksTotalCount: action.payload.totalCount,
      };
    case SET_TASKS_AMOUNT_TO_REQUIRE:
      return {
        ...state,
        tasksAmountToRequire: state.tasksAmountToRequire + 1,
      };
    default:
      return state;
  }
};

export default toDoReducer;

// -----action creators-----

export type CheckAuthorizationAction = {
  type: typeof CHECK_AUTHORIZATION;
};
export const checkAuthorization = (): CheckAuthorizationAction => ({ type: CHECK_AUTHORIZATION });

export type AuthorizeData = {
  id: number;
  email: string;
  login: string;
};
export type SetAuthorizeDataAction = {
  type: typeof SET_AUTHORIZE_DATA;
  payload: AuthorizeData;
};
export const setAuthorizeData = (
  id: number,
  email: string,
  login: string
): SetAuthorizeDataAction => ({
  type: SET_AUTHORIZE_DATA,
  payload: {
    id,
    email,
    login,
  },
});

export type LoginData = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type LoginAction = {
  type: typeof LOGIN;
  payload: LoginData;
};
export const login = (loginData: LoginData): LoginAction => ({
  type: LOGIN,
  payload: {
    email: loginData.email,
    password: loginData.password,
    rememberMe: loginData.rememberMe,
  },
});

// ----LISTS----

type RequireListsAction = {
  type: typeof REQUIRE_LISTS;
};
export const requireLists = (): RequireListsAction => ({ type: REQUIRE_LISTS });

type SetListsAction = {
  type: typeof SET_LISTS;
  payload: Array<List>;
};
export const setLists = (newLists: Array<List>): SetListsAction => ({
  type: SET_LISTS,
  payload: newLists,
});

export type CreateListAction = {
  type: typeof CREATE_LIST;
  payload: { title: string };
};
export const createList = (title: string): CreateListAction => ({
  type: CREATE_LIST,
  payload: { title },
});

export type DeleteListAction = {
  type: typeof DELETE_LIST;
  payload: { listId: string };
};
export const deleteList = (listId: string): DeleteListAction => {
  return { type: DELETE_LIST, payload: { listId } };
};

// ---TASKS---

export type RequireTasksAction = {
  type: typeof REQUIRE_TASKS;
  payload: { listId: string; count: string; page: string };
};
export const requireTasks = (listId: string, count: string, page: string): RequireTasksAction => ({
  type: REQUIRE_TASKS,
  payload: { listId, count, page },
});

export type SetTasksAction = {
  type: typeof SET_TASKS;
  payload: { items: Array<Task>; totalCount: number };
};
export const setTasks = (tasks: Array<Task>, totalCount: number): SetTasksAction => {
  return { type: SET_TASKS, payload: { items: tasks, totalCount: totalCount } };
};

export type CreateTaskAction = {
  type: typeof CREATE_TASK;
  payload: { title: string; listId: string };
};
export const createTask = (listId: string, taskTitle: string): CreateTaskAction => ({
  type: CREATE_TASK,
  payload: { title: taskTitle, listId: listId },
});

export type DeleteTaskAction = {
  type: typeof DELETE_TASK;
  payload: {
    listId: string;
    taskId: string;
  };
};
export const deleteTask = (listId: string, taskId: string): DeleteTaskAction => {
  return { type: DELETE_TASK, payload: { listId, taskId } };
};

export type UpdateTaskAction = {
  type: typeof UPDATE_TASK;
  payload: {
    listId: string;
    taskId: string;
    newTaskStatus: NewTaskStatus;
  };
};
export const updateTask = (
  listId: string,
  taskId: string,
  newTaskStatus: NewTaskStatus
): UpdateTaskAction => ({
  type: UPDATE_TASK,
  payload: { listId, taskId, newTaskStatus },
});

export type SetTasksAmountToRequireAction = {
  type: typeof SET_TASKS_AMOUNT_TO_REQUIRE;
};
export const setTasksAmountToRequire = (): SetTasksAmountToRequireAction => {
  return { type: SET_TASKS_AMOUNT_TO_REQUIRE };
};
