import styled from "styled-components";
import TemperatureWithImage from "../../components/Mypage/TemperatureWithImage";
import MyInfo from "../../components/Mypage/MyInfo";
import RouteToOtherPage from "../../components/Mypage/RouteToOtherPage";
import ContentHeader from "../../components/Mypage/ContentHeader";
import GotoZbti from "../../assets/img/button/GotoZbti.svg";
import { useRecoilState } from "recoil";
import {
    myPageInfoState,
    myPagePredictListState,
    myPageSubscribeListState,
} from "../../Store/MyPageState";
import { useEffect } from "react";
import {
    getMyInfo,
    getMyPredictList,
    getMySubscribeList,
} from "../../apis/api/MyPage";
import { useNavigate } from "react-router";

function Mypage() {
    const info = "내 정보";

    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);
    const [myPagePredictList, setMyPagePredictList] = useRecoilState(
        myPagePredictListState
    );
    const [myPageSubscribeList, setMyPageSubscribeList] = useRecoilState(myPageSubscribeListState);

  const navigate = useNavigate();

    // const accessToken = localStorage.getItem('accessToken');
    const userNo = 2;

    useEffect(() => {
        // if(!accessToken){
        //     navigate("/main");
        //     return;
        // }

        // 임의의 인덱스값 userNo 넣음
        const fetchData = async (userNo: Number) => {
            //내 정보
            try {
                const data = await getMyInfo(userNo);
                setMyPageInfo(data);
                console.log(data);
            } catch (error) {
                console.log("내 정보 불러오기 실패");
                console.error(error);
            }

            //내 예측 글 목록
            try {
                const data = await getMyPredictList(userNo);
                setMyPagePredictList(data);
                console.log(data);
            } catch (error) {
                console.log("내 예측 목록 실패");
                console.error(error);
            }

            //내가 구독한 사람 목록
            try {
                const data = await getMySubscribeList(userNo);
                setMyPageSubscribeList(data);
            } catch (error) {}
        };

        fetchData(userNo);
    }, []);

    return (
        <Wrapper>
            <Container>
                <LeftSideMyInfo>
                    {info}
                    <TemperatureWithImage />
                    <MyInfo />
                    <RouteToOtherPage />
                </LeftSideMyInfo>
                <RightSideMyInfo>
                    <ContentHeader />
                    <GotoZbtiButton>
                        <img src={GotoZbti} alt="GotoZbti"></img>
                    </GotoZbtiButton>
                </RightSideMyInfo>
            </Container>
        </Wrapper>
    );
}

export default Mypage;

const Wrapper = styled.div`
    display: block;
`;

const Container = styled.div`
    position: static;
    width: 1280px;
    margin: 0 auto;
    padding-bottom: 40px;
`;

const LeftSideMyInfo = styled.div`
    float: left;
    width: 420px;
    height: 785px;
    text-align: center;
    border: 1px solid;
    margin: 0 auto;
`;

const RightSideMyInfo = styled.div`
    float: right;
    width: 775px;
    border: 1px solid;
    margin: 0 auto;
`;

const GotoZbtiButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 695px;
    margin: 0 auto;
`;
