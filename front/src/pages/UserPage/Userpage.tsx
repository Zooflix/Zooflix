import styled from "styled-components";
import GotoZbti from "../../assets/img/button/GotoZbti.svg";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getMyStockList } from "../../apis/api/MyPage";
import { useNavigate } from "react-router";
import { stockSubListState } from "../../Store/StockSubscribeState";
import {
    userPageInfoState,
    userPagePredictListState,
    userPageSubscribeListState,
} from "../../Store/UserPageState";
import { ModalUserNoState } from "../../Store/PredictState";
import {
    getUserInfo,
    getUserPredictList,
    getUserSubscribeList,
} from "../../apis/api/UserPage";
import TempWithImage from "../../components/UserPage/TempWithImage";
import SubscribeButton from "../../components/Common/SubscribeButton";
import UserContentHeader from "../../components/UserPage/UserContentHeader";
import UserInfo from "../../components/UserPage/UserInfo";
import { myPageInfoState } from "../../Store/MyPageState";

function UserPage() {
    // 내 정보
    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);

    // 유저 정보
    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);

    // 유저 예측 리스트
    const [userPagePredictList, setUserPagePredictList] = useRecoilState(
        userPagePredictListState
    );

    // 유저 구독 리스트
    const [userPageSubscribeList, setUserPageSubscribeList] = useRecoilState(
        userPageSubscribeListState
    );

    // 유저 주식 리스트
    const [userStockList, setUserStockList] = useRecoilState(stockSubListState);

    const [ModalUserNo, setModalUserNo] = useRecoilState(ModalUserNoState);

    // 유저 정보를 바탕으로 userId 도 저장해야 함, 새로고침에 대한 이슈로 추가적으로 저장해놓아야함
    const [userNo, setUserNo] = useState(ModalUserNo);
    const [userId, setUserId] = useState(userPageInfo.userId);

    const navigate = useNavigate();

    const handleZbti = () => {
        navigate("/zbti");
    };

    useEffect(() => {
        const fetchData = async () => {
            //유저 정보
            try {
                const data = await getUserInfo(userNo);
                setUserPageInfo(data);
                console.log(data);
            } catch (error) {
                console.log("유저 정보 불러오기 실패");
                console.error(error);
            }

            //유저 예측 글 목록
            try {
                const data = await getUserPredictList(userNo);
                setUserPagePredictList(data);
                console.log(data);
            } catch (error) {
                console.log("유저 예측 목록 실패");
                console.error(error);
            }

            //유저가 구독한 사람 목록
            try {
                const data = await getUserSubscribeList(userNo);
                setUserPageSubscribeList(data);
            } catch (error) {
                console.log("유저 구독한 사람 목록 불러오기 실패");
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // 임의의 인덱스값 userNo 넣음
        const fetchData = async (userId: string) => {
            //유저 주식 구독 목록
            try {
                const data = await getMyStockList(userId);
                console.log("*******************************************************" + userId);
                setUserStockList(data);
            } catch (error) {
                console.log("유저 주식 구독 목록 불러오기 실패");
                console.error(error);
            }
        };

        fetchData(userId);
    }, []);

    return (
        <Wrapper>
            <Container>
                <LeftSideMyInfo>
                    <h2>{userPageInfo.userName + " 님의 정보"}</h2>
                    <TempWithImage />
                    <UserInfo />
                    <SubscribeButton
                        userNo={myPageInfo.userNo}
                        subscribeNo={userNo}
                    />
                </LeftSideMyInfo>
                <Right>
                    <RightSideMyInfo>
                        <UserContentHeader />
                    </RightSideMyInfo>
                    <GotoZbtiButton>
                        <img
                            src={GotoZbti}
                            alt="GotoZbti"
                            onClick={() => handleZbti()}
                        ></img>
                    </GotoZbtiButton>
                </Right>
            </Container>
        </Wrapper>
    );
}

export default UserPage;

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
    width: 450px;
    margin-bottom: 40px;
    text-align: center;

    background: #ffffff;
    border: 1px solid #e7e7e7;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
`;

const RightSideMyInfo = styled.div`
    float: right;
    width: 775px;
    height: 660px;
    margin: 0 auto;
    background: #ffffff;
    border: none;
`;

const GotoZbtiButton = styled.button`
    display: flex;
    justify-content: center;

`;
