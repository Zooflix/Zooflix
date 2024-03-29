import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  myPageInfoState,
  myPagePredictListState,
} from "../../Store/MyPageState";

function MyInfo() {
  const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);
  const [myPagePredictList, setMyPagePredictList] = useRecoilState(
    myPagePredictListState
  );

  let successCnt = 0; //성공 횟수

  myPagePredictList.forEach((item) => {
    if (item.pdResult === "성공") {
      successCnt += 1;
    }
  });

  // 소수점 둘째 짜리까지 성공 비율 -> rate
  let rateOfPredict = Math.round(successCnt / myPagePredictList.length);
  let rate = Math.round(rateOfPredict * 100) / 100;

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
        <h4>{myPagePredictList.length}</h4>
        <h4>{successCnt}</h4>
        <h4>{rate}%</h4>
        <h4>{myPageInfo.subscribeFromMe}</h4>
        <h4>{myPageInfo.subscribeToMe}</h4>
      </RightSideAnswer>
    </Wrapper>
  );
}

export default MyInfo;

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 5px 70px;
`;

const LeftsideQuestion = styled.div``;

const RightSideAnswer = styled.div``;
