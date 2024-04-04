import styled from "styled-components";
import DoughnutChart from "../Mypage/DoughnutChart";
import { useRecoilState } from "recoil";
import { userPageInfoState } from "../../Store/UserPageState";

function TempWithImage() {

    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);

    return (
        <Wrapper>
            <DoughnutChart
                userName={userPageInfo.userName}
                temp={userPageInfo.userTemperature}
                color="#7AD3FF"
                transparency="rgba(122,211,255,0.1)"
                imgWidth="250px"
            />
        </Wrapper>
    )
}

export default TempWithImage;

const Wrapper = styled.div`
    display: column;
    justify-content: center;
`;
