import styled from "styled-components";
import MyPrediction from "./MyPrediction";
import { useRecoilState } from "recoil";
import { myPagePredictListState } from "../../Store/MyPageState";

function MyPredictList() {

  const [myPagePredictList, setMyPagePredictList] = useRecoilState(myPagePredictListState);

  return (
    <Wrapper>
      <div>
        {myPagePredictList && myPagePredictList.map((predict, index) => (
          <MyPrediction key={index} prediction={predict} />
        ))}
      </div>
    </Wrapper>
  );
}

export default MyPredictList;
 
const Wrapper = styled.div`
  margin: 20px;
`;

