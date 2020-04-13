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
    background-color: #403c76;
  }
  &:hover .deleteTask {
    opacity: 0.7;
  }

  .tick {
    /* width: 40px; */
    width: 5%;
    min-width: 5%;
    background-image: url(${(props) => (props.completed ? tick : unTick)});
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .body {
    padding: 5px 0;
    /* border: 1px solid red; */
    /* width: 100%; */
    max-width: 90%;
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

  @media (max-width: 900px) {
    .tick {
      min-width: 7%;
    }
    .body {
      max-width: 85%;
    }
  }
  @media (max-width: 650px) {
    .tick {
      min-width: 10%;
    }
    .body {
      max-width: 82%;
    }
  }
  @media (max-width: 450px) {
    .tick {
      min-width: 11%;
    }
    .body {
      max-width: 79%;
    }
  }
  @media (max-width: 400px) {
    .tick {
      min-width: 13%;
    }
    .body {
      max-width: 75%;
    }
  }
`;

export default StyledTask;
