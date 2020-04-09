import styled from "styled-components";
import coronaPreloader from "../../assets/img/mainPreloader.gif";
import spinner from "../../assets/img/spinner.svg";

type Props = {
  type: string;
};

const StyledPreloader = styled.div<Props>`
  background: url(${(props) => (props.type === "corona" ? coronaPreloader : spinner)}) center
    no-repeat;
  background-size: ${(props) => (props.type === "corona" ? "100px" : "30px")};
  background-color: ${(props) => (props.type === "corona" ? "transparent" : "#373770")};
  height: ${(props) => (props.type === "corona" ? "100vh" : "30px")};
`;

export default StyledPreloader;
