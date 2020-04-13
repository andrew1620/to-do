import styled from "styled-components";

const StyledFooter = styled.footer`
  /* border: 1px solid yellow; */
  background-color: #292760;
  display: flex;
  max-height: 15vh;

  & > form {
    /* border: 1px solid green; */
    width: 100%;
    display: flex;
    max-height: inherit;
  }
`;

export default StyledFooter;
