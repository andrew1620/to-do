import axios from "axios";

import { List, Task, createList } from "../redux/toDoReducer";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "a12bc084-f676-4a1e-bd69-8d4f17b429fd",
  },
});

type GetListsResponse = Array<List>;
type GetTasksResponse = {
  items: Array<Task>;
  totalCount: number;
  error: string;
};
export type CreateListResponse = {
  data: {
    addedDate: string;
    id: string;
    order: number;
    title: string;
  };
  messages: Array<string>;
  resultCode: number;
};
type DeleteListResponse = {
  resultCode: number;
  messages: Array<string>;
  data: Object;
};
export const listsAPI = {
  // getLists() {
  //   return instance
  //     .get<GetListsResponse>("todo-lists")
  //     .then((response) => response.data);
  // },
  async getLists() {
    const response = await instance.get<GetListsResponse>("todo-lists");
    return response.data;
  },
  // createList(listTitle: string) {
  //   return instance
  //     .post("todo-lists", { title: listTitle })
  //     .then((response) => response.data);
  // },
  async createList(listTitle: string) {
    const response = await instance.post<CreateListResponse>("todo-lists", {
      title: listTitle,
    });
    return response.data;
  },
  deleteList(listId: number) {
    return instance
      .delete<DeleteListResponse>(`todo-lists/${listId}`)
      .then((response) => response.data);
  },
  updateListTitle(listId: number, newTitle: string) {
    return instance
      .put(`todo-lists/${listId}`, { title: newTitle })
      .then((response) => response.data);
  },
};

// -----TASKS API-----

type CreateTaskResponse = {
  resultCode: number;
  messages: Array<string>;
  data: { item: DataItem };
};
type DataItem = {
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
type NewTaskStatus = {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};
type UpdateTaskResponse = CreateTaskResponse;
type DeleteTaskResponse = DeleteListResponse;

export const tasksAPI = {
  getTasks(toDoListId: number) {
    return instance
      .get<GetTasksResponse>(`todo-lists/${toDoListId}/tasks`)
      .then((response) => response.data);
  },
  createTask(listId: number, taskTitle: string) {
    return instance
      .post<CreateTaskResponse>(`todo-lists/${listId}/tasks`, {
        title: taskTitle,
      })
      .then((response) => response.data);
  },
  updateTask(listId: number, taskId: number, newTaskStatus: NewTaskStatus) {
    return instance.put<UpdateTaskResponse>(
      `todo-lists/${listId}/tasks/${taskId}`,
      {
        status: newTaskStatus,
      }
    );
  },
  deleteTask(listId: number, taskId: number) {
    return instance
      .delete<DeleteTaskResponse>(`todo-lists/${listId}/tasks/${taskId}`)
      .then((response) => response.data);
  },
};
