import React, { useEffect } from "react";

import Task from "./Task/Task";
import StyledMain from "../StyledComponents/StyledMain";
import { Task as TaskType } from "../../redux/toDoReducer";
import StyledPreloader from "../StyledComponents/StyledPreloader";
import { NewTaskStatus } from "../../API";

type Props = {
  tasks: Array<TaskType> | null;
  requireTasks: (listId: string) => void;
  deleteTask: (listId: string, taskId: string) => void;
  updateTask: (listId: string, taskId: string, newTaskStatus: NewTaskStatus) => void;
};

const Main: React.FC<Props> = ({ tasks, requireTasks, deleteTask, updateTask }) => {
  useEffect(() => {
    requireTasks("f20a07c7-bce6-4d61-921d-12913784ed8b");
  }, []);

  if (!tasks) return <StyledPreloader type="spinner" />;

  const tasksList = tasks.map((task) => (
    <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
  ));

  return <StyledMain>{tasksList}</StyledMain>;
};

export default Main;
