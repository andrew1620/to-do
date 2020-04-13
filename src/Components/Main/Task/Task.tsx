import React from "react";

import StyledTask from "../../StyledComponents/StyledTask";
import { Task as TaskType } from "../../../redux/toDoReducer";
import { NewTaskStatus } from "../../../API";
import StyledButton from "../../StyledComponents/StyledButton";
import deleteTaskPicture from "../../../assets/img/deleteTask.svg";

type Props = {
  task: TaskType;
  deleteTask: (listId: string, taskId: string) => void;
  updateTask: (listId: string, taskId: string, newTaskStatus: NewTaskStatus) => void;
};

const Task: React.FC<Props> = ({ task, deleteTask, updateTask }) => {
  const completeTask = () => {
    const { title, description, status, priority, startDate, deadline } = task;
    const completedTask = {
      title,
      description,
      status: status === 0 ? 1 : 0,
      priority,
      startDate,
      completed: true,
      deadline,
    };

    updateTask(task.todoListId, task.id, completedTask);
  };

  const deleteItem = () => {
    deleteTask(task.todoListId, task.id);
  };

  return (
    <StyledTask completed={task.status}>
      <div className="tick" onClick={completeTask}></div>
      <div className="body">
        <div className="title">{task.title}</div>
        <div className="date">{new Date(task.addedDate).toLocaleString()}</div>
      </div>
      <StyledButton
        className="deleteTask"
        picture={deleteTaskPicture}
        width={"5%"}
        onClick={deleteItem}
        style={{ marginLeft: "auto" }}
      />
    </StyledTask>
  );
};

export default Task;

// Instead of property the task.completed I use task.status in order the task to be completed. I can't use task.completed because it's not being changed after I send "task.completed: true". Now I don't know why)
