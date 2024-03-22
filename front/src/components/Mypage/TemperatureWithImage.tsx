import styled from "styled-components";
import DoughnutChart from "./DoughnutChart";
import { useRecoilState } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";

function TemperatureWithImage() {

    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);

    return (
        <Wrapper>
            <DoughnutChart/>
            {myPageInfo.userName}
            <br/>
            {myPageInfo.userTemperature + "°C"}
        </Wrapper>
    )
}

export default TemperatureWithImage;

const Wrapper = styled.div`
    display: column;
    justify-content: center;
`;
