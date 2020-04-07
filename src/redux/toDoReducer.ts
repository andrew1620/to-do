export const SET_LISTS = "todo/SET_LISTS";
export const REQUIRE_LISTS = "todo/REQUIRE_LISTS";
export const REQUIRE_TASKS = "todo/REQUIRE_TASKS";
export const CREATE_LIST = "todo/CREATE_LIST";

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
  lists: [{ id: "1", addedDate: "22", order: 1, title: "first" }] as Array<
    List
  > | null,
  tasks: null as Array<Task> | null,
  tasksTotalCount: null as number | null,
};

export type InitialState = typeof initialState;
type Action = RequireListsAction & SetListsAction & RequireTasksAction;

const toDoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_LISTS:
      return { ...state, lists: [...state.lists, ...action.payload] };
    default:
      return state;
  }
};

export default toDoReducer;

// -----action creators-----

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

type RequireTasksAction = {
  type: typeof REQUIRE_TASKS;
};
export const requireTasks = (): RequireTasksAction => ({ type: REQUIRE_TASKS });
