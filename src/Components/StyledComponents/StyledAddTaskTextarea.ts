import styled from "styled-components";

type Props = {
  textareaHeight?: string;
};

const StyledAddTaskTextarea = styled.textarea<Props>`
  /* border: 3px solid black; */
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  color: white;
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  max-height: inherit;
  height: ${(props) => props.textareaHeight || "auto"};

  &:empty {
    height: auto;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-border-radius: 0px;
    border-radius: 0px;
    background-color: #37377063;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #373770;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
`;

export default StyledAddTaskTextarea;
