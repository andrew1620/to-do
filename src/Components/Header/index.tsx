import React, { useState } from "react";

import StyledHeader from "../StyledComponents/StyledHeader";
import openMenuPicture from "../../assets/img/openMenu2.svg";
import switchOn from "../../assets/img/switchOn.svg";
import switchOff from "../../assets/img/switchOff.svg";
import StyledButton from "../StyledComponents/StyledButton";

const Header: React.FC = () => {
  const [themePicture, setThemePicture] = useState(false);

  const openMenu = () => {
    alert("Здесь будет меню настроек");
  };
  const changeTheme = () => {
    setThemePicture(!themePicture);
    alert("Здесь будет смена темы");
  };

  return (
    <div>
      <StyledHeader>
        <StyledButton picture={openMenuPicture} opacity={1} picSize="25px" onClick={openMenu} />
        <div className="title">Задачи</div>
        <StyledButton
          picture={themePicture ? switchOff : switchOn}
          opacity={1}
          picSize="25px"
          onClick={changeTheme}
        />
      </StyledHeader>
    </div>
  );
};

export default Header;
