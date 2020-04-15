import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import App from ".";
import { RootState } from "../../redux/store";
import { getTasks, getTasksTotalCount } from "../../redux/toDoSelectors";
import { Task, requireTasks, deleteList, deleteTask, updateTask } from "../../redux/toDoReducer";
import StyledPreloader from "../StyledComponents/StyledPreloader";
import { NewTaskStatus } from "../../API";

export type Props = {
  tasks: Array<Task> | null;
  tasksTotalCount: number | null;
  requireTasks: (listId: string, count: string, page: string) => void;
  deleteList: (listId: string) => void;
  deleteTask: (listId: string, taskId: string) => void;
  updateTask: (listId: string, taskId: string, newTaskStatus: NewTaskStatus) => void;
};

const AppContainer: React.FC<Props> = (props) => {
  // if (!авторизован) return <StyledPreloader />;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "todo/REQUIRE_LISTS" });
  }, []);

  return <App {...props} />;
};

const mstp = (state: RootState) => {
  return {
    tasks: getTasks(state),
    tasksTotalCount: getTasksTotalCount(state),
  };
};
const mdtp = {
  requireTasks,
  deleteTask,
  deleteList,
  updateTask,
};

export default connect(mstp, mdtp)(AppContainer);
