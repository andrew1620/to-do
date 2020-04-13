import styled from "styled-components";

type Props = {
  textareaHeight?: string;
};

const StyledMain = styled.div<Props>`
  overflow: auto;
  overflow-x: hidden;
  /* I have to define max height of styledMain after I finish header */
  max-height: calc(87vh - (${(props) => props.textareaHeight || "0vh"}));
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
