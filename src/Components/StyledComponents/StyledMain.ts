import styled from "styled-components";

type Props = {
  textareaHeight?: string;
};

// calc(92vh - 50px); 50px - initial textarea height.
const StyledMain = styled.div<Props>`
  /* border: 1px solid red; */
  overflow: auto;
  overflow-x: hidden;
  max-height: calc(92vh - 50px);
  background: #373770;

  & > div:not(:last-child) {
    border-bottom: 1px solid #292760;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-border-radius: 0px;
    border-radius: 0px;
    background-color: #29276063;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #292760;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export default StyledMain;
