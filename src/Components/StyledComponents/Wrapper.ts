import styled from "styled-components";

interface Props {
  bgColor?: string;
}

const Wrapper = styled.div<Props>`
  width: 70%;
  margin: 0 auto;
  /* background: rgba(255, 255, 255, 0.2); */
  color: #eee;
  box-shadow: 0px 5px 20px black;
  /* max-height: 100vh; */
  /* border: 1px solid red; */
`;

export default Wrapper;
