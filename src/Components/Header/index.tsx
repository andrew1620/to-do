import React from "react";

import StyledHeader from "../StyledComponents/StyledHeader";

const Header: React.FC = () => {
  return (
    <div>
      <StyledHeader>
        <div>Settings</div>
        <div>Sort</div>
        <div>Theme</div>
      </StyledHeader>
    </div>
  );
};

export default Header;
