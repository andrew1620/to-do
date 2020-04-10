import styled from "styled-components";

import tick from "../../assets/img/success_tick.svg";
import unTick from "../../assets/img/unsuccess_tick2.svg";

type Props = {
  completed: number;
};

const StyledTask = styled.div<Props>`
  display: flex;
  background-color: #373770;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 18px;
  word-wrap: break-word;
  padding: 0;

  &:hover {
    background-color: rgba(55, 55, 112, 0.9);
  }
  &:hover .deleteTask {
    opacity: 0.7;
  }

  .tick {
    width: 40px;
    background-image: url(${(props) => (props.completed ? tick : unTick)});
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .body {
    padding: 5px 0;
    width: 100%;
    max-width: 816px;
  }

  .title {
    word-wrap: break-word;
    color: ${(props) => (props.completed ? "#8c8eb5" : "#DEDFEF")};
    text-decoration: ${(props) => (props.completed ? "line-through" : "#none")};
  }

  .date {
    font-size: 12px;
    color: ${(props) => (props.completed ? "#426994" : "#63a6bd")};
  }
`;

export default StyledTask;
