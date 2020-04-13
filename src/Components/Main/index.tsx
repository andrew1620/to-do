import React, { useEffect } from "react";

import Task from "./Task/Task";
import StyledMain from "../StyledComponents/StyledMain";
import { Task as TaskType } from "../../redux/toDoReducer";
import StyledPreloader from "../StyledComponents/StyledPreloader";
import { NewTaskStatus } from "../../API";
import StyledTask from "../StyledComponents/StyledTask";
import StyledButton from "../StyledComponents/StyledButton";

type Props = {
  tasks: Array<TaskType> | null;
  textareaHeight: string;
  requireTasks: (listId: string) => void;
  deleteTask: (listId: string, taskId: string) => void;
  updateTask: (listId: string, taskId: string, newTaskStatus: NewTaskStatus) => void;
};

const Main: React.FC<Props> = ({ tasks, requireTasks, deleteTask, updateTask, textareaHeight }) => {
  useEffect(() => {
    requireTasks("f20a07c7-bce6-4d61-921d-12913784ed8b");
  }, []);

  if (!tasks) return <StyledPreloader type="spinner" />;

  const tasksList = tasks.map((task) => (
    <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
  ));

  return (
    <StyledMain textareaHeight={textareaHeight}>
      {tasksList}
      <StyledTask completed={0}>
        <div className="tick"></div>
        <div className="body">
          <div className="title">{"aaaaaaaaaaaaaaaaaaa"}</div>
          <div className="date">{new Date("02.03.1996").toLocaleString()}</div>
        </div>
        <StyledButton className="deleteTask" />
      </StyledTask>
      <StyledTask completed={0}>
        <div className="tick"></div>
        <div className="body">
          <div className="title">{"aaaaaaaaaaaaaaaaaaa"}</div>
          <div className="date">{new Date("02.03.1996").toLocaleString()}</div>
        </div>
        <StyledButton className="deleteTask" />
      </StyledTask>
      <StyledTask completed={0}>
        <div className="tick"></div>
        <div className="body">
          <div className="title">{"aaaaaaaaaaaaaaaaaaa"}</div>
          <div className="date">{new Date("02.03.1996").toLocaleString()}</div>
        </div>
        <StyledButton className="deleteTask" />
      </StyledTask>
      <StyledTask completed={0}>
        <div className="tick"></div>
        <div className="body">
          <div className="title">{"aaaaaaaaaaaaaaaaaaa"}</div>
          <div className="date">{new Date("02.03.1996").toLocaleString()}</div>
        </div>
        <StyledButton className="deleteTask" />
      </StyledTask>
      <StyledTask completed={0}>
        <div className="tick"></div>
        <div className="body">
          <div className="title">{"aaaaaaaaaaaaaaaaaaa"}</div>
          <div className="date">{new Date("02.03.1996").toLocaleString()}</div>
        </div>
        <StyledButton className="deleteTask" />
      </StyledTask>
      <StyledTask completed={0}>
        <div className="tick"></div>
        <div className="body">
          <div className="title">{"aaaaaaaaaaaaaaaaaaa"}</div>
          <div className="date">{new Date("02.03.1996").toLocaleString()}</div>
        </div>
        <StyledButton className="deleteTask" />
      </StyledTask>
      <StyledTask completed={0}>
        <div className="tick"></div>
        <div className="body">
          <div className="title">{"aaaaaaaaaaaaaaaaaaa"}</div>
          <div className="date">{new Date("02.03.1996").toLocaleString()}</div>
        </div>
        <StyledButton className="deleteTask" />
      </StyledTask>
      <StyledTask completed={0}>
        <div className="tick"></div>
        <div className="body">
          <div className="title">{"aaaaaaaaaaaaaaaaaaa"}</div>
          <div className="date">{new Date("02.03.1996").toLocaleString()}</div>
        </div>
        <StyledButton className="deleteTask" />
      </StyledTask>
      <StyledTask completed={0}>
        <div className="tick"></div>
        <div className="body">
          <div className="title">{"aaaaaaaaaaaaaaaaaaa"}</div>
          <div className="date">{new Date("02.03.1996").toLocaleString()}</div>
        </div>
        <StyledButton className="deleteTask" />
      </StyledTask>
    </StyledMain>
  );
};

export default Main;
