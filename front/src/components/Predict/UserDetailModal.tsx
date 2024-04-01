import styled from "styled-components";
import Modal from "@mui/material/Modal";
import SquareBtn from "../Common/SquareBtn";
import { selectInfo } from "../../apis/api/User";
import { useEffect, useState } from "react";
import DoughnutChart from "../Mypage/DoughnutChart";
import { useRecoilState } from "recoil";
import {
    selectStockNameState,
    selectUserNoState,
} from "../../Store/PredictState";
import { Link, useNavigate } from "react-router-dom";
import { myPageInfoState } from "../../Store/MyPageState";
import {
    userPageInfoState,
    userPagePredictListState,
    userPageSubscribeListState,
} from "../../Store/UserPageState";
import { subscribeUser } from "../../apis/api/MyPage";
import {
    getUserInfo,
    getUserPredictList,
    getUserSubscribeList,
} from "../../apis/api/UserPage";
import SubscribeButton from "../UserPage/SubscribeButton";

interface ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    userName: string;
    userNo: number;
}

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

function UserDetailModal({
    userName,
    isModalOpen,
    closeModal,
    userNo,
}: ModalProps) {
    const navigate = useNavigate();
    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);
    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);
    const [userPagePredictList, setUserPagePredictList] = useRecoilState(
        userPagePredictListState
    );
    const [userPageSubscribeList, setUserPageSubscribeList] = useRecoilState(
        userPageSubscribeListState
    );

    // let successCnt = 0; //성공 횟수
    // let successRate = 0;  //성공 확률


    // userPagePredictList.forEach((item) => {
    //     if (item.pdResult === "성공") {
    //         successCnt += 1;
    //     }
    // });

    // // 소수점 둘째 짜리까지 성공 비율 -> rate
    // let rateOfPredict = Math.round(
    //   successCnt / userPagePredictList.length * 100
    // );

    // let rate = Math.round(rateOfPredict * 100) / 100;
    // successRate = rate;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const info = await getUserInfo(userNo);
                console.log(info);
                setUserPageInfo(info);
            } catch (error) {
                console.error(error);
            }

            //유저 예측 글 목록
            try {
                const data = await getUserPredictList(userNo);
                setUserPagePredictList(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }

            //유저가 구독한 사람 목록
            try {
                const data = await getUserSubscribeList(userNo);
                setUserPageSubscribeList(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (isModalOpen) {
            fetchUserInfo();
        }
    }, [isModalOpen, userNo]);

    const navToUserPage = async () => {
        navigate("/user-page");
    };

    return (
        <StyledModal open={isModalOpen} onClose={closeModal}>
            <Container>
                {userPageInfo && (
                    <>
                        <span>
                            <span className="user-name">{userName}</span>님의
                            예측정보입니다.
                        </span>
                        <InfoContainer>
                            <Graph>
                                <DoughnutChart
                                    temp={userPageInfo.userTemperature}
                                    color="#7AD3FF"
                                    transparency="rgba(122,211,255,0.1)"
                                />
                                {/* {userInfo.userTemperature}℃ */}
                            </Graph>
                            <LineContainer>
                                <Line>
                                    <label>총 예측 횟수</label>
                                    {userPageInfo.predictCount}
                                </Line>
                                <Line>
                                    <label>예측 성공 횟수</label> {userPageInfo.successCount}
                                </Line>
                                <Line>
                                    <label>예측률</label> {userPageInfo.predictionRate}%
                                </Line>
                                <Line>
                                    <label>구독</label>{" "}
                                    {userPageInfo.subscribeFromMe}
                                </Line>
                                <Line>
                                    <label>구독자</label>{" "}
                                    {userPageInfo.subscribeToMe}
                                </Line>
                            </LineContainer>
                        </InfoContainer>
                        <ButtonContainer className="btn-container">
                            <SubscribeButton 
                                userNo={myPageInfo.userNo} 
                                subscribeNo={userPageInfo.userNo}
                            />
                            <SquareBtn
                                text="글 보러가기"
                                onClick={navToUserPage}
                            />
                        </ButtonContainer>
                    </>
                )}
            </Container>
        </StyledModal>
    );
}

export default UserDetailModal;

const Container = styled.div`
  width: 600px;
  height: 400px;
  background-color: white;
  border: none;
  border-radius: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  span {
    font-weight: bold;
    font-size: 23px;
  }
  .user-name {
    color: orange;
  }
`;

const ButtonContainer = styled.div`
    button {
        margin: 20px;
    }
`;
// const SubscribeButton = styled.button`
//     background-color: #f84646;
//     width: 90px;
//     border-radius: 10px;
//     cursor: pointer;
//     padding: 7px 0;
//     border: none;
//     color: white;
//     &:hover {
//         background-color: white;
//         box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
//         color: #f84646;
//         font-weight: bold;
//     }
// `;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Line = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    label {
        font-weight: bold;
    }
`;

const Graph = styled.div`
    width: 100%;
`;
const LineContainer = styled.div`
    width: 50%;
    padding-top: 15%;
`;
