import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";

import { selectStockHistory } from "../../apis/api/Predict";
import { selectUserNoState } from "../../Store/PredictState";
import { selectUserNameState } from "../../Store/PredictState";

function StockHistory() {
    const [selectUserNo, setSelectUserNo] = useRecoilState(selectUserNoState);
    const [selectUserName, setSelectUserName] =
        useRecoilState(selectUserNameState);
    const [stockHistoryList, setStockHistoryList] = useState<any[]>([]);

    useEffect(() => {
        if(selectUserNo===0){
            return;
        }
        selectStockHistory(selectUserNo).then((list: any[]) => {
            setStockHistoryList(list);
        });
    }, [selectUserNo]);

    if (!selectUserNo) {
        return (
            <Wrapper>
                <Title>매매 내역</Title>
                <NoContainer>
                    <Content>피드를 선택해 보세요 !</Content>
                </NoContainer>
            </Wrapper>
        );
    } else if (
        stockHistoryList === undefined ||
        stockHistoryList.length === 0
    ) {
        return (
            <Wrapper>
                <Title>
                    <b>{selectUserName}</b>님의 최근 매매내역
                </Title>
                <NoContainer>
                    <Content style={{ color: "black" }}>
                        <b>{selectUserName}</b>님은 매매 정보가 없어요 !
                    </Content>
                </NoContainer>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                <Title>
                    <b>{selectUserName}</b>님의 최근 매매내역
                </Title>
                <Container>
                    <Histories>
                        {stockHistoryList.map((item, index) => (
                            <div key={index}>
                                <History>
                                    <span
                                        style={{
                                            width: "100px",
                                            fontWeight: "bold",
                                            color:
                                                item.stockType === "매도"
                                                    ? "#310E93"
                                                    : "#930E0E",
                                        }}
                                    >
                                        {item.stockType}
                                    </span>
                                    <span style={{ width: "80px" }}>
                                        {item.stockName}
                                    </span>
                                    <span style={{ width: "50px" }}>
                                        {item.stockNum}주
                                    </span>
                                    <span style={{ width: "100px" }}>
                                        {item.stockDate.slice(0, 4)}.
                                        {item.stockDate.slice(4, 6)}.
                                        {item.stockDate.slice(6)}
                                    </span>
                                </History>
                            </div>
                        ))}
                    </Histories>
                </Container>
            </Wrapper>
        );
    }
}

export default StockHistory;

const Wrapper = styled.div``;

const NoContainer = styled.div`
    border-radius: 30px;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    width: 70%;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;
const Container = styled.div`
    border-radius: 30px;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    width: 70%;
    height: 140px;
    display: flex;
    margin-top: 10px;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: gray;
`;
const Title = styled.div``;
const Histories = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px;
    overflow-y: scroll;
    height: 100px;
`;

const History = styled.div`
    display: flex;
    span {
        margin-bottom: 8px;
    }
`;
