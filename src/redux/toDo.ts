const SET_LISTS = "todo/SET_LISTS";

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

const toDo = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LISTS:
      return { ...state, lists: [...state.lists, ...action.payload] };
    default:
      return state;
  }
};

export default toDo;
