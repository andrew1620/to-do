import React, { useState } from "react";

import Wrapper from "../StyledComponents/Wrapper";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";
import { Props as AppProps } from "./indexContainer";

const App: React.FC<AppProps> = (props) => {
  const [textareaHeight, setTextareaHeight] = useState("87vh");

  return (
    <Wrapper>
      <Header />
      {/* <div className="container"> */}
      <Main
        tasks={props.tasks}
        requireTasks={props.requireTasks}
        deleteTask={props.deleteTask}
        updateTask={props.updateTask}
        textareaHeight={textareaHeight}
      />
      <Footer setTextareaHeight={setTextareaHeight} />
      {/* </div> */}
    </Wrapper>
  );
};

export default App;

// Created .container in order to move Main when Footer changes it's height. Without .container, Main moves Header higher then I need.
