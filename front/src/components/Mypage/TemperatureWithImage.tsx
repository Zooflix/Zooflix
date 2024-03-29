import styled from "styled-components";
import DoughnutChart from "./DoughnutChart";
import { useRecoilState } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";

function TemperatureWithImage() {
  const [myPageInfo] = useRecoilState(myPageInfoState);

  return (
    <Wrapper>
      <DoughnutChart
        temp={myPageInfo.userTemperature}
        color="#7AD3FF"
        transparency="rgba(122,211,255,0.1)"
      />
    </Wrapper>
  );
}

export default TemperatureWithImage;

const Wrapper = styled.div`
  display: column;
  justify-content: center;
`;
