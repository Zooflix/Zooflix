import styled from "styled-components";
import FlowBar from "../../components/Main/FlowBar";
import ZustraRank from "../../components/Main/ZustraRank";

function Main() {
  return (
    <MainWrapper>
      <FlowBar />
      <ZustraRank />
    </MainWrapper>
  );
}

export default Main;

const MainWrapper = styled.div`
  padding-left: 25px;
`;
