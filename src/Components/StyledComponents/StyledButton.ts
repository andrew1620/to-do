import styled from "styled-components";

import deleteTask from "../../assets/img/deleteTask.svg";

type Props = {
  picture?: string;
  width?: string;
  height?: string;
  opacity?: number;
};

const StyledButton = styled.button<Props>`
  /* border: 1px solid red; */
  width: ${(props) => props.width || "40px"};
  height: ${(props) => props.height || "none"};
  padding: 5px;
  background: url(${(props) => props.picture || deleteTask}) center/20px no-repeat;
  opacity: ${(props) => props.opacity || 0};
  margin-left: auto;
  transition: opacity 0.3s ease;
  /* box-sizing: border-box; */
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 1 !important ;
  }
`;

export default StyledButton;
