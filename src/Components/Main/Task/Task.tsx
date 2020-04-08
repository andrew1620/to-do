import React from "react";

import StyledTask from "../../StyledComponents/StyledTask";
import { Task as TaskType } from "../../../redux/toDoReducer";

type Props = {
  task: TaskType;
};

const Task: React.FC<Props> = ({ task }) => {
  return (
    <StyledTask>
      <div>
        <div>{task.title}</div>
        <div>{new Date(task.addedDate).toLocaleString()}</div>
      </div>
      <div className="btnDel">
        <span className="btnDelPic">X</span>
      </div>
    </StyledTask>
  );
};

export default Task;
