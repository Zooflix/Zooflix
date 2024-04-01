import styled from "styled-components";
import DoughnutChart from "./DoughnutChart";
import { useEffect, useState } from "react";
import { getMyInfo } from "../../apis/api/MyPage";
import { myPageInfoState } from "../../Store/MyPageState";
import { useRecoilState } from "recoil";

function TemperatureWithImage() {
    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);

    const fetchData = async () => {
        //유저 정보
        const dataInfo = await getMyInfo()
            .then((resInfo) => {
                console.log(resInfo);
                setMyPageInfo(resInfo);
                console.log("마이인포: " + myPageInfo.userName);
            })
            .catch((error) => {
                console.log("에러메세지" + error.message);
                console.error(error);
            });
    };
    
    useEffect(() => {
        fetchData();
    }, []);

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
