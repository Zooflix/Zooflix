import styled from "styled-components";


type StockHistoryProps = {
    search: string;
};

function StockHistory(props: StockHistoryProps) {
    if (props.search === "") {
        return (
            <Wrapper>
                <Title>매매 정보</Title>
                <Container>
                    <Content>피드를 선택해 보세요 !</Content>
                </Container>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                <Title>매매 정보</Title>
                <Container>
                    <Content></Content>
                </Container>
            </Wrapper>
        );
    }
}

export default StockHistory;

const Wrapper = styled.div``;

const Container = styled.div`
    border-radius: 30px;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    width: 70%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    color: gray;
`;
const Title = styled.div`

`;