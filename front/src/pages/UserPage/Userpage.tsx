import styled from "styled-components";
import GotoZbti from "../../assets/img/button/GotoZbti.svg";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getMySubscribeList, getUserStockList } from "../../apis/api/MyPage";
import { useNavigate } from "react-router";
import { stockSubListState } from "../../Store/StockSubscribeState";
import {
    userPageInfoState,
    userPagePredictListState,
    userPageSubscribeListState,
} from "../../Store/UserPageState";
import { ModalUserNoState } from "../../Store/PredictState";
import {
    getUserPredictList,
    getUserSubscribeList,
    getUserInfo,
} from "../../apis/api/UserPage";
import TempWithImage from "../../components/UserPage/TempWithImage";
import SubscribeButton from "../../components/Common/SubscribeButton";
import UserContentHeader from "../../components/UserPage/UserContentHeader";
import UserInfo from "../../components/UserPage/UserInfo";
import {
    myPageInfoState,
    myPageSubscribeListState,
} from "../../Store/MyPageState";
import { loginCheck } from "../../components/User/IsLoginCheck";
import { useParams } from "react-router-dom";
import DeleteSubBtn from "../../components/Common/DeleteSubBtn";

function UserPage() {
    // 내 정보
    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);
    // 나의 구독 리스트 저장
    const [myPageSubscribeList, setMyPageSubscribeList] = useRecoilState(
        myPageSubscribeListState
    );
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

    const navigate = useNavigate();

    const { userNo } = useParams();

    const [userNumber, setUserNumber] = useState(parseInt(userNo || ""));

    const handleZbti = () => {
        navigate("/zbti");
    };
    
    // 구독을 했으면 그 번호를 저장
    const [subNo, setSubNo] = useState(0);
    // 구독했는지 확인
    const [isSubscribe, setIsSubscribe] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            //유저 정보
            userInfoAxios();

            //유저 예측 글 목록
            getUserPredict();

            //유저가 구독한 사람 목록
            getUserSubscribe();

            if (loginCheck()) {
                // 내 유저 구독 목록
                getMyUserSubscribe();
            }
        };

        if (loginCheck()) {
            checkSubscribe();
        }
    }, [userNumber]);

    useEffect(() => {
        // 임의의 인덱스값 userNo 넣음
        const fetchData = async () => {
            //유저 주식 구독 목록
            try {
                const data = await getUserStockList(userPageInfo.userId);
                setUserStockList(data);
            } catch (error) {
                console.log("유저 주식 구독 목록 불러오기 실패");
                console.error(error);
            }
        };

        fetchData();
    }, []);

    async function getMyUserSubscribe() {
        try {
            const data = await getMySubscribeList();
            setMyPageSubscribeList(data);
            console.log(" getMyUSerSubscribe ", data);
        } catch (error) {
            console.log("내가 구독한 사람 목록 불러오기 실패");
            console.error(error);
        }
    }

    async function getUserSubscribe() {
        try {
            const data = await getUserSubscribeList(userNumber);
            setUserPageSubscribeList(data);
            console.log(" getUserSubscribe ", data);
        } catch (error) {
            console.log("유저 구독한 사람 목록 불러오기 실패");
            console.error(error);
        }
    }

    async function getUserPredict() {
        try {
            const data = await getUserPredictList(userNumber);
            setUserPagePredictList(data);
            console.log(" getUSerPredict ", data);
        } catch (error) {
            console.log("유저 예측 목록 실패");
            console.error(error);
        }
    }

    async function userInfoAxios() {
        try {
            const data = await getUserInfo(userNumber);
            setUserPageInfo(data);
            console.log(" userInfoAxios ", data);
        } catch (error) {
            console.log("유저 정보 불러오기 실패");
            console.error(error);
        }
    }

    function checkSubscribe() {
        if (myPageSubscribeList.length > 0) {
            for (let i = 0; i < myPageSubscribeList.length; i++) {
                if (
                    myPageSubscribeList[i].subscribeName ===
                    userPageInfo.userName
                ) {
                    setIsSubscribe(true);
                    setSubNo(i);
                    break;
                } else {
                    setIsSubscribe(false);
                }
            }
        }
    }

    const togleSubscription = () => {
        const getMySubList = async () => {
            try {
                const data = await getMySubscribeList();
                setMyPageSubscribeList(data);
            } catch (error) {
                console.error(error);
            }
        };
        getMySubList();
        setIsSubscribe(!isSubscribe);
    };

    return (
        <Wrapper>
            {userPageInfo && (
                <Container>
                    <LeftSideMyInfo>
                        <h2>{userPageInfo.userName + " 님의 정보"}</h2>
                        <TempWithImage />
                        <UserInfo />
                        {!loginCheck() || isSubscribe ? (
                            <DeleteSubBtn
                                onSubscribe={myPageSubscribeList[subNo]}
                                onDelete={togleSubscription}
                                text={"구독 취소"}
                            />
                        ) : (
                            <SubscribeButton
                                userNo={myPageInfo.userNo}
                                subscribeNo={userPageInfo.userNo}
                                onSubscribe={togleSubscription}
                            />
                        )}
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
            )}
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

const GotoZbtiButton = styled.div`
    display: flex;
    justify-content: center;
`;

const NotButton = styled.div`
    padding: 70px 0;
`;
