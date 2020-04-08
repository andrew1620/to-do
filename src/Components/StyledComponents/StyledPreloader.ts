import styled from "styled-components";
import coronaPreloader from "../../assets/img/mainPreloader.gif";
import spinner from "../../assets/img/spinner.svg";

type Props = {
  type: string;
};

const StyledPreloader = styled.div<Props>`
  /* Преттиер переносит после стрелки и из-за этого оишбка */
  background: url(${(props) =>
      props.type === "corona" ? coronaPreloader : spinner})
    center no-repeat;
  background-size: 100px;
  background-size: 30px;
  background-color: #373770;
  height: 100vh;
  height: 30px;
`;

export default StyledPreloader;
