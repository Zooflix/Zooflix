import styled from "styled-components";
import DoughnutChart from "./DoughnutChart";
import { useRecoilState, useRecoilValue } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";

function TemperatureWithImage() {
  const myPageInfo = useRecoilValue(myPageInfoState);

  return (
    <Wrapper>
      <DoughnutChart
        userName={myPageInfo.userName}
        temp={myPageInfo.userTemperature}
        color="#7AD3FF"
        transparency="rgba(122,211,255,0.1)"
        imgWidth="250px"
      />
    </Wrapper>
  );
}

export default TemperatureWithImage;

const Wrapper = styled.div`
  display: column;
  justify-content: center;
`;
