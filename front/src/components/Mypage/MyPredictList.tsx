import styled from "styled-components";
import MyPrediction from "./MyPrediction";
import { useRecoilState } from "recoil";
import { myPagePredictListState } from "../../Store/MyPageState";

function MyPredictList() {
    const [myPagePredictList, setMyPagePredictList] = useRecoilState(
        myPagePredictListState
    );

    const deletePredict = (pdNo: number) => {
        setMyPagePredictList(
            myPagePredictList.filter(
                (predict) => predict.pdNo !== pdNo
            )
        );
    };

    return (
        <Wrapper>
            <List>
                {myPagePredictList &&
                    myPagePredictList.map((predict) => (
                        <MyPrediction 
                            key={predict.pdNo} 
                            prediction={predict}
                            onDelete={() => deletePredict(predict.pdNo)}
                        />
                    ))}
            </List>
        </Wrapper>
    );
}

export default MyPredictList;

const Wrapper = styled.div`
    margin: 10px;
    background: #ffffff;
    border: 0.917219px solid #e7e7e7;
    box-shadow: 3.1002px 3.1002px 15.4918px -7.7505px rgba(0, 0, 0, 0.4);
    border-radius: 12.8411px;
    overflow: auto;
    max-height: 580px;
    scrollbar-color:  #A5A5A5;
    scrollbar-width: thin;
`;

const List = styled.div``;
