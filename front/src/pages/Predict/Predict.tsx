import styled from "styled-components";

// 컴포넌트
import Title from "../../components/Common/Title";
import SquareBtn from "../../components/Common/SquareBtn";
import Search from "../../components/Predict/Search";
import Sort from "../../components/Predict/Sort";

const buttonStyleDark = {
    backgroundColor: "#1E3659",
    color: "white",
    border: "none",
    width: "110px",
    height: "40px",
    borderRadius: "20px",
};

function Predict() {
    return (
        <Wrapper>
            <FirstContainer>
                <Title text="주식 예측 하기" />
                <SquareBtn text="나도 예측하기" style={buttonStyleDark} />
            </FirstContainer>
            <SecondContainer>
                <Search type="text" placeholder="종목명을 입력하세요." />
                <Sort />
            </SecondContainer>
        </Wrapper>
    );
}

export default Predict;

const Wrapper = styled.div`
    padding-left: 200px;
`;

const FirstContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SecondContainer = styled.div`
    display: flex;
    align-items: center;
`;