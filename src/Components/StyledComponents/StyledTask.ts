import styled from "styled-components";

import tick from "../../assets/img/success_tick.svg";
import unTick from "../../assets/img/unsuccess_tick2.svg";

type Props = {
  completed: boolean;
};

const StyledTask = styled.div<Props>`
  display: flex;
  background-color: #373770;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  background-image: url(${(props) => (props.completed ? tick : unTick)});
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 5px center;
  font-size: 18px;
  word-wrap: break-word;
  padding: 5px 0 5px 40px;

  &:hover {
    background-color: rgba(55, 55, 112, 0.9);
  }
  :hover .btnDel {
    opacity: 1;
  }

  .title {
    word-wrap: break-word;
    max-width: 830px;
    color: ${(props) => (props.completed ? "#8c8eb5" : "#DEDFEF")};
    text-decoration: ${(props) => (props.completed ? "line-through" : "#none")};
  }

  .date {
    font-size: 12px;
    color: ${(props) => (props.completed ? "#426994" : "#63a6bd")};
  }

  .btnDel {
    margin-left: auto;
    /* border: 1px solid red; */
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 5px;
    display: flex;
  }
  .btnDelPic {
    margin: auto;
  }
`;

export default StyledTask;
