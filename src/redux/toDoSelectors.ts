import { RootState } from "./store";

export const getLists = (state: RootState) => state.toDo.lists;
export const getTasks = (state: RootState) => state.toDo.tasks;
export const getTasksTotalCount = (state: RootState) => state.toDo.tasksTotalCount;
export const getUserId = (state: RootState) => state.toDo.authorizeData.id;
export const getTasksAmountToRequire = (state: RootState) => state.toDo.tasksAmountToRequire;
