import styled from "styled-components";

type RankProps = {
    search: string;
};

function Rank(props: RankProps) {
    if (props.search === "") {
        return (
            <Wrapper>
                <Content>이 달의 주스트라다무스</Content>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                <Content>{props.search} 에서 가장 예측을 잘해요!</Content>
            </Wrapper>
        );
    }
}

export default Rank;

const Wrapper = styled.div`
    border-radius: 30px;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    width: 50%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;
const Content = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
`;
