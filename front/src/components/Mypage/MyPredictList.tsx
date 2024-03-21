import styled from "styled-components";
import MyPrediction from "./MyPrediction";
import { useRecoilState } from "recoil";
import { myPagePredictListState } from "../../Store/RecoilState";

function MyPredictList() {

  const [myPagePredictList, setMyPagePredictList] = useRecoilState(myPagePredictListState);

  return (
    <Wrapper>
      <div>
        {myPagePredictList.map((predict, index) => (
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

const Predicctlist = styled.div`
    display: flex;
    justify-content: space-between;
`;
