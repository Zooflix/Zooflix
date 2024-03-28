import styled from "styled-components";
import DoughnutChart from "./DoughnutChart";
import { useRecoilState } from "recoil";
import { userPageInfoState } from "../../Store/UserPageState";

function TempWithImage() {

    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);

    return (
        <Wrapper>
            <DoughnutChart/>
            {userPageInfo.userName}
            <br/>
            {userPageInfo.userTemperature + "°C"}
        </Wrapper>
    )
}

export default TempWithImage;

const Wrapper = styled.div`
    display: column;
    justify-content: center;
`;
