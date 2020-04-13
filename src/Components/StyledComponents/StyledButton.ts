import styled from "styled-components";

import deleteTask from "../../assets/img/deleteTask.svg";

type Props = {
  picture?: string;
  width?: string;
  picSize?: string;
  height?: string;
  opacity?: number;
};

const StyledButton = styled.button<Props>`
  /* border: 1px solid red; */
  width: ${(props) => props.width || "40px"};
  min-width: 5%;
  height: ${(props) => props.height || "none"};
  padding: 5px;
  background: url(${(props) => props.picture || deleteTask}) center/
    ${(props) => props.picSize || "20px"} no-repeat;
  opacity: ${(props) => props.opacity || 0};
  /* margin-left: auto; */
  transition: opacity 0.3s ease;
  outline: none;
  border: none;
  cursor: pointer;

  &&&:hover {
    opacity: 1;
  }

  @media (max-width: 900px) {
    & {
      min-width: 8%;
    }
  }
  @media (max-width: 450px) {
    & {
      min-width: 10%;
    }
  }
  @media (max-width: 400px) {
    & {
      min-width: 12%;
    }
  }
`;

export default StyledButton;
