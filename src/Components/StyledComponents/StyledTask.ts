import styled from "styled-components";

import tick from "../../assets/img/success_tick.svg";

const StyledTask = styled.div`
  display: flex;
  background-color: #373770;
  height: 50px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  padding-left: 40px;
  background-image: url(${tick});
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 5px center;
  /* background-color: rgba(162, 70, 181, 0.5); */

  :hover {
    background-color: rgba(55, 55, 112, 0.9);
  }
  :hover .btnDel {
    opacity: 1;
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
