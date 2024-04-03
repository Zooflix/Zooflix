import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  userPageInfoState,
  userPagePredictListState,
} from "../../Store/UserPageState";
import { getUserInfo } from "../../apis/api/UserPage";
import { useEffect } from "react";

function UserInfo() {
  const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);

  useEffect(() => {
    const fetchData = async () => {
      //유저 정보
      try {
        const data = await getUserInfo(userPageInfo.userNo);
        setUserPageInfo(data);
        console.log(data);
      } catch (error) {
        console.log("유저 정보 불러오기 실패");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <LeftsideQuestion>
        <h4>총 예측 횟수</h4>
        <h4>예측 성공 횟수</h4>
        <h4>예측률</h4>
        <h4>구독</h4>
        <h4>구독자</h4>
      </LeftsideQuestion>
      <RightSideAnswer>
        <h4>{userPageInfo.predictCount}</h4>
        <h4>{userPageInfo.successCount}</h4>
        <h4>{userPageInfo.predictionRate} %</h4>
        <h4>{userPageInfo.subscribeFromMe}</h4>
        <h4>{userPageInfo.subscribeToMe}</h4>
      </RightSideAnswer>
    </Wrapper>
  );
}

export default UserInfo;

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 5px 70px;
`;

const LeftsideQuestion = styled.div`
  text-align: left;
  padding-left: 10px;
`;

const RightSideAnswer = styled.div`
  h4 {
    color: #0099e8;
  }
  padding-right: 20px;
`;
