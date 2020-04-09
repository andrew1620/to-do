import styled from "styled-components";

const StyledMain = styled.div`
  overflow: auto;
  max-height: 95vh;
  /* background: #373770; */

  & > div:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

export default StyledMain;
