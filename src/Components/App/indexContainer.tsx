import React, { useEffect } from "react";
import { connect } from "react-redux";

import App from ".";
import { RootState } from "../../redux/store";
import {
  getTasks,
  getTasksTotalCount,
  getUserId,
  getTasksAmountToRequire,
} from "../../redux/toDoSelectors";
import {
  Task,
  requireTasks,
  deleteList,
  deleteTask,
  updateTask,
  checkAuthorization,
  setTasksAmountToRequire,
} from "../../redux/toDoReducer";
import StyledPreloader from "../StyledComponents/StyledPreloader";
import { NewTaskStatus } from "../../API";

export type Props = {
  userId: number | null;
  tasks: Array<Task> | null;
  tasksTotalCount: number | null;
  tasksAmountToRequire: number;
  requireTasks: (listId: string, count: string, page: string) => void;
  deleteList: (listId: string) => void;
  deleteTask: (listId: string, taskId: string) => void;
  updateTask: (listId: string, taskId: string, newTaskStatus: NewTaskStatus) => void;
  checkAuthorization: () => void;
  setTasksAmountToRequire: () => void;
};

const AppContainer: React.FC<Props> = (props) => {
  useEffect(() => {
    props.checkAuthorization();
  }, []);

  if (!props.userId) return <StyledPreloader type="corona" />;

  return <App {...props} />;
};

const mstp = (state: RootState) => {
  return {
    userId: getUserId(state),
    tasks: getTasks(state),
    tasksTotalCount: getTasksTotalCount(state),
    tasksAmountToRequire: getTasksAmountToRequire(state),
  };
};
const mdtp = {
  requireTasks,
  deleteTask,
  deleteList,
  updateTask,
  checkAuthorization,
  setTasksAmountToRequire,
};

export default connect(mstp, mdtp)(AppContainer);
