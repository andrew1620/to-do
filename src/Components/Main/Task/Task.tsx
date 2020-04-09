import React from "react";

import StyledTask from "../../StyledComponents/StyledTask";
import { Task as TaskType } from "../../../redux/toDoReducer";
import { NewTaskStatus } from "../../../API";

type Props = {
  task: TaskType;
  deleteTask: (listId: string, taskId: string) => void;
  updateTask: (listId: string, taskId: string, newTaskStatus: NewTaskStatus) => void;
};

const Task: React.FC<Props> = ({ task, deleteTask, updateTask }) => {
  const completeTask = () => {
    const { title, description, status, priority, startDate, deadline } = task;
    const completedTask = {
      title: "brrrreeeeddd",
      description,
      status,
      priority,
      startDate,
      deadline,
      completed: true,
    };

    updateTask("f20a07c7-bce6-4d61-921d-12913784ed8b", task.id, completedTask);
  };

  const deleteItem = () => {
    deleteTask("f20a07c7-bce6-4d61-921d-12913784ed8b", task.id);
  };

  return (
    <StyledTask completed={task.completed} onClick={completeTask}>
      <div>
        <div className="title">{task.title}</div>
        <div className="date">{new Date(task.addedDate).toLocaleString()}</div>
      </div>
      <div className="btnDel">
        <span className="btnDelPic" onClick={deleteItem}>
          X
        </span>
      </div>
    </StyledTask>
  );
};

export default Task;
