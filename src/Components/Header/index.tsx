import React from "react";

import StyledHeader from "../StyledComponents/StyledHeader";
import openMenuPicture from "../../assets/img/openMenu2.svg";
import switchOn from "../../assets/img/switchOn.svg";
import switchOff from "../../assets/img/switchOff.svg";
import StyledButton from "../StyledComponents/StyledButton";

const Header: React.FC = () => {
  return (
    <div>
      <StyledHeader>
        <StyledButton picture={openMenuPicture} opacity={1} picSize="25px" />
        <div className="title">ToDo List</div>
        <StyledButton picture={switchOn} opacity={1} picSize="25px" />
      </StyledHeader>
    </div>
  );
};

export default Header;
