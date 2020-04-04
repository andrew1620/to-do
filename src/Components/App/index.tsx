import React from "react";

import Wrapper from "../StyledComponents/Wrapper";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";

const App: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <Main />
      <Footer />
    </Wrapper>
  );
};

export default App;
