import styled from "styled-components";

interface Props {
  bgColor?: string;
}

const Wrapper = styled.div<Props>`
  /* border: 1px solid yellow; */
  width: 70%;
  margin: 0 auto;
  color: #eee;
  box-shadow: 0px 5px 20px black;
  max-height: 100vh;
  overflow: hidden;

  .container {
    /* border: 1px solid white; */
    max-height: 92vh;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 420px) {
    & {
      width: 100%;
    }
  }
`;

export default Wrapper;
