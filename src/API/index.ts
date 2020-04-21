import axios from "axios";

import { List, Task } from "../redux/toDoReducer";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "a12bc084-f676-4a1e-bd69-8d4f17b429fd",
  },
});

export type MeResponse = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: number;
  messages: Array<string>;
};

export type LoginResponse = {
  data: {
    userId: number;
  };
  resultCode: number;
  messages: Array<string>;
};

export const authorizeAPI = {
  async me() {
    try {
      const response = await instance.get<MeResponse>(
        `https://social-network.samuraijs.com/api/1.1/auth/me`
      );
      return response.data;
    } catch (err) {
      console.log(`Перехвачена ошибка в API при проверке авторизации: ${err}`);
    }
  },
  async login(email: string, password: string, rememberMe: boolean) {
    try {
      const response = await instance.post<LoginResponse>(
        `https://social-network.samuraijs.com/api/1.1/auth/login`,
        { email, password, rememberMe }
      );
      return response.data;
    } catch (err) {
      console.log(`Перехвачена ошибка в API при логинизации: ${err}`);
    }
  },
};

// ----LISTS API----

export type GetListsResponse = Array<List>;
export type GetTasksResponse = {
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
export type DeleteListResponse = {
  resultCode: number;
  messages: Array<string>;
  data: Object;
};
export const listsAPI = {
  async getLists() {
    const response = await instance.get<GetListsResponse>("todo-lists");
    return response.data;
  },
  async createList(listTitle: string) {
    const response = await instance.post<CreateListResponse>("todo-lists", {
      title: listTitle,
    });
    return response.data;
  },
  async deleteList(listId: string) {
    const response = await instance.delete<DeleteListResponse>(`todo-lists/${listId}`);
    return response.data;
  },

  updateListTitle(listId: number, newTitle: string) {
    return instance
      .put(`todo-lists/${listId}`, { title: newTitle })
      .then((response) => response.data);
  },
};

// -----TASKS API-----

export type CreateTaskResponse = {
  resultCode: number;
  messages: Array<string>;
  data: { item: DataItem };
};
export type DataItem = {
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
export type NewTaskStatus = {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};
export type UpdateTaskResponse = CreateTaskResponse;
export type DeleteTaskResponse = DeleteListResponse;

export const tasksAPI = {
  async getTasks(listId: string, count: string, page: string) {
    const response = await instance.get<GetTasksResponse>(
      `todo-lists/${listId}/tasks?count=${count}&page=${page}`
    );
    return response.data;
  },
  async createTask(listId: string, taskTitle: string) {
    const response = await instance.post<CreateTaskResponse>(`todo-lists/${listId}/tasks`, {
      title: taskTitle,
    });
    return response.data;
  },
  async updateTask(listId: string, taskId: string, newTaskStatus: NewTaskStatus) {
    console.log("from API --- ", listId, " ", taskId, " ", newTaskStatus);
    try {
      const response = await instance.put<UpdateTaskResponse>(
        `todo-lists/${listId}/tasks/${taskId}`,
        newTaskStatus
      );

      return response.data;
    } catch (err) {
      console.log("Ошибка в API updateTask: ", err);
    }
  },
  async deleteTask(listId: string, taskId: string) {
    try {
      const response = await instance.delete<DeleteTaskResponse>(
        `todo-lists/${listId}/tasks/${taskId}`
      );
      return response.data;
    } catch (err) {
      console.log("Ошибка в API deleteTask: ", err);
    }
  },
};
