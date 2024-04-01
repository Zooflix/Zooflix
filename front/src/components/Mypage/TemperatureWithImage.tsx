import styled from "styled-components";
import DoughnutChart from "./DoughnutChart";
import { useEffect, useState } from "react";
import { getMyInfo } from "../../apis/api/MyPage";
import { myPageInfoState } from "../../Store/MyPageState";
import { useRecoilState } from "recoil";

function TemperatureWithImage() {
    const [myInfo, setMyInfo] = useRecoilState(myPageInfoState);

    const fetchData = async () => {
        //유저 정보
        const dataInfo = await getMyInfo()
            .then((resInfo) => {
                console.log(resInfo);
                setMyInfo(resInfo);
                console.log("마이인포: " + myInfo.userName);
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
                temp={myInfo.userTemperature}
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
