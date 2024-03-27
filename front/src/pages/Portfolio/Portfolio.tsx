import styled from "styled-components";
// import GaugeChart from "../../components/Mypage/GaugeChart";
import { useRecoilState } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";

function Portfolio() {
    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);

    return (
        <Wrapper>
            {/* <GaugeChart value={myPageInfo.userTemperature} width={400} height={200}></GaugeChart> */}
        </Wrapper>
    );
}

export default Portfolio;

const Wrapper = styled.div``;
