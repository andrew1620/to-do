import React from "react";

import Wrapper from "../StyledComponents/Wrapper";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";
import { Props as AppProps } from "./indexContainer";

const App: React.FC<AppProps> = (props) => {
  return (
    <Wrapper>
      <Header />
      <Main
        tasks={props.tasks}
        requireTasks={props.requireTasks}
        deleteTask={props.deleteTask}
        updateTask={props.updateTask}
      />
      <Footer />
    </Wrapper>
  );
};

export default App;
