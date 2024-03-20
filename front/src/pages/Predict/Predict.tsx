import styled from "styled-components";

// 컴포넌트
import Title from "../../components/Common/Title";
import SquareBtn from "../../components/Common/SquareBtn";
import Search from "../../components/Predict/Search";
import Sort from "../../components/Predict/Sort";
import PredictList from "../../components/Predict/PredictList";
import Rank from "../../components/Predict/Rank";
import Graph from "../../components/Predict/Graph";
import StockHistory from "../../components/Predict/StockHistory";
import ListHeader from "../../components/Predict/ListHeader";

const buttonStyleDark = {
    backgroundColor: "#1E3659",
    color: "white",
    border: "none",
    width: "110px",
    height: "40px",
    borderRadius: "20px",
    boxShadow : "1px 2px 5px rgba(0, 0, 0, 0.2)"
};

function Predict() {
    return (
        <Wrapper>
            <LeftContainer>
                <FirstContainer>
                    <Title text="주식 예측 하기" />
                    <SquareBtn text="나도 예측하기" style={buttonStyleDark} />
                </FirstContainer>
                <SecondContainer>
                    <Search type="text" placeholder="종목명을 입력하세요." />
                    <Sort />
                </SecondContainer>

                    <ListHeader/>
                    <PredictList />

            </LeftContainer>
            <RightContainer>
                <Rank search=""/>
                <Graph search=""/>
                <StockHistory search=""/>
            </RightContainer>
        </Wrapper>
    );
}

export default Predict;

const Wrapper = styled.div`
    padding-left: 200px;
    display: flex;
`;

const LeftContainer = styled.div`
    width: 65%;
`;

const RightContainer = styled.div`
    width: 50%;
    margin-left: 100px;
`;

const FirstContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
}
`;

const SecondContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


