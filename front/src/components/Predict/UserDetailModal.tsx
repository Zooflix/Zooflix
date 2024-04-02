import styled from "styled-components";
import Modal from "@mui/material/Modal";
import SquareBtn from "../Common/SquareBtn";
import { useEffect, useState } from "react";
import DoughnutChart from "../Mypage/DoughnutChart";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  userPageInfoState,
  userPagePredictListState,
  userPageSubscribeListState,
} from "../../Store/UserPageState";
import {
  getUserInfo,
  getUserPredictList,
  getUserSubscribeList,
} from "../../apis/api/UserPage";
import SubscribeButton from "../Common/SubscribeButton";
import {
  myPageInfoState,
  myPageSubscribeListState,
} from "../../Store/MyPageState";
import { getMySubscribeList } from "../../apis/api/MyPage";
import DeleteSubBtn from "../Common/DeleteSubBtn";

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
  isModalOpen,
  closeModal,
  userName,
  userNo,
}: ModalProps) {
  const navigate = useNavigate();

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
  // 나의 구독 리스트 저장
  const [myPageSubscribeList, setMyPageSubscribeList] = useRecoilState(
    myPageSubscribeListState
  );

  // 구독했는지 확인
  const [isSubscribe, setIsSubscribe] = useState(false);

  // 구독을 했으면 그 번호를 저장
  const [subNo, setSubNo] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      // 유저 정보
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

      //내가 구독한 사람 목록
      try {
        const data = await getMySubscribeList();
        setMyPageSubscribeList(data);
      } catch (error) {
        console.log("내가 구독한 사람 목록 불러오기 실패");
        console.error(error);
      }
    };
    if (myPageSubscribeList.length > 0) {
      for (let i = 0; i < myPageSubscribeList.length; i++) {
        if (myPageSubscribeList[i].subscribeName === userName) {
          setIsSubscribe(true);
          setSubNo(i);
          break;
        } else {
          setIsSubscribe(false);
        }
      }
    }
    if (isModalOpen) {
      fetchUserInfo();
    }
    console.log("isSubscribe? : " + isSubscribe);
  }, [isModalOpen, userNo]);

  const navToUserPage = async () => {
    if (myPageInfo.userNo === userNo) {
      navigate("/my-page");
    } else {
      navigate("/user-page");
    }
  };
  const deleteSubscription = (subscribeNo: number) => {
    setMyPageSubscribeList(
      myPageSubscribeList.filter(
        (subscribe) => subscribe.subscribeNo !== subscribeNo
      )
    );
    window.location.reload();
  };

  return (
    <StyledModal open={isModalOpen} onClose={closeModal}>
      <Container>
        {userPageInfo && (
          <>
            <span>
              <span className="user-name">{userName}</span>님의 예측정보입니다.
            </span>
            <InfoContainer>
              <GraphContainer>
                <DoughnutChart
                  userName={userPageInfo.userName}
                  temp={userPageInfo.userTemperature}
                  color="#7AD3FF"
                  transparency="rgba(122,211,255,0.1)"
                  imgWidth="200px"
                />
                {/* {userInfo.userTemperature}℃ */}
              </GraphContainer>
              <LineContainer>
                <Line>
                  <label>총 예측 횟수</label>
                  <span>{userPageInfo.predictCount}</span>
                </Line>
                <Line>
                  <label>예측 성공 횟수</label>{" "}
                  <span>{userPageInfo.successCount}</span>
                </Line>
                <Line>
                  <label>예측률</label>{" "}
                  <span>{userPageInfo.predictionRate}%</span>
                </Line>
                <Line>
                  <label>구독</label>{" "}
                  <span>{userPageInfo.subscribeFromMe}</span>
                </Line>
                <Line>
                  <label>구독자</label>
                  <span>{userPageInfo.subscribeToMe}</span>
                </Line>
              </LineContainer>
            </InfoContainer>
            <ButtonContainer>
              {myPageInfo.userNo === userNo ? (
                <></>
              ) : isSubscribe ? (
                <DeleteSubBtn
                  onSubscribe={myPageSubscribeList[subNo]}
                  onDelete={deleteSubscription}
                  text={"구독 취소"}
                />
              ) : (
                <SubscribeButton
                  userNo={myPageInfo.userNo}
                  subscribeNo={userPageInfo.userNo}
                />
              )}
              <SquareBtn text="글 보러가기" onClick={navToUserPage} />
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
  justify-content: space-between;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    margin-left: 10px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

const GraphContainer = styled.div`
  width: 70%;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  span {
    color: #0099e8;
    font-size: 15px;
  }
  label {
    font-weight: bold;
    color: black;
  }
`;

const LineContainer = styled.div`
  width: 50%;
  padding-top: 10%;
  margin-right: 40px;
`;
