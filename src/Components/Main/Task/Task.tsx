import React from "react";

import StyledTask from "../../StyledComponents/StyledTask";

const Task: React.FC = () => {
  return (
    <StyledTask>
      <div>
        <div>Coursera assignment</div>
        <div>today 11AM</div>
      </div>
      <div className="btnDel">
        <span className="btnDelPic">X</span>
      </div>
    </StyledTask>
  );
};

export default Task;
