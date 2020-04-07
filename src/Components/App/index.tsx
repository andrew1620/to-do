import React, { useEffect } from "react";

import Wrapper from "../StyledComponents/Wrapper";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";
import { useDispatch } from "react-redux";
import { createList } from "../../redux/toDoReducer";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "todo/REQUIRE_LISTS" });
  }, []);

  const createNewList = () => {
    dispatch(createList("newTestList"));
  };
  return (
    <Wrapper>
      <Header />
      <Main />
      <Footer />
      <button onClick={createNewList}>createList</button>
    </Wrapper>
  );
};

export default App;
