import styled from "styled-components";
import GotoZbti from "../../assets/img/button/GotoZbti.svg";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
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
import SubscribeButton from "../../components/UserPage/SubscribeButton";
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

    const navigate = useNavigate();

    const handleZbti = () => {
        navigate("/zbti");
    };

    useEffect(() => {
        const fetchData = async () => {
            //유저 정보
            try {
                const data = await getUserInfo(ModalUserNo);
                setUserPageInfo(data);
                console.log(data);
            } catch (error) {
                console.log("유저 정보 불러오기 실패");
                console.error(error);
            }

            //유저 예측 글 목록
            try {
                const data = await getUserPredictList(ModalUserNo);
                setUserPagePredictList(data);
                console.log(data);
            } catch (error) {
                console.log("유저 예측 목록 실패");
                console.error(error);
            }

            //유저가 구독한 사람 목록
            try {
                const data = await getUserSubscribeList(ModalUserNo);
                setUserPageSubscribeList(data);
            } catch (error) {
                console.log("유저 구독한 사람 목록 불러오기 실패");
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const userId = "user1"; //임시

    useEffect(() => {
        // 임의의 인덱스값 userNo 넣음
        const fetchData = async (userId: string) => {
            //유저 주식 구독 목록
            try {
                const data = await getMyStockList(userId);
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
                    {userPageInfo.userName + " 님의 정보"}
                    <TempWithImage />
                    <UserInfo />
                    <SubscribeButton
                        userNo={myPageInfo.userNo}
                        subscribeNo={ModalUserNo}
                    />
                </LeftSideMyInfo>
                <RightSideMyInfo>
                    <UserContentHeader />
                    <GotoZbtiButton>
                        <img
                            src={GotoZbti}
                            alt="GotoZbti"
                            onClick={() => handleZbti()}
                        ></img>
                    </GotoZbtiButton>
                </RightSideMyInfo>
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
    width: 420px;
    height: 785px;
    text-align: center;
    margin: 0 auto;

    background: #ffffff;
    border: 0.77908px solid #e7e7e7;
    box-shadow: 2.63329px 2.63329px 13.1587px -6.58322px rgba(0, 0, 0, 0.4);
    border-radius: 10.9071px;
`;

const RightSideMyInfo = styled.div`
    float: right;
    width: 775px;
    height: 660px;
    margin: 0 auto;
    background: #ffffff;
    border: 0.77908px solid #e7e7e7;
    box-shadow: 2.63329px 2.63329px 13.1587px -6.58322px rgba(0, 0, 0, 0.4);
    border-radius: 10.9071px;
`;

const GotoZbtiButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 695px;
    margin: 0 auto;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
`;
