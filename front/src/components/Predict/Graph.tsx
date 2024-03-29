import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";

import { selectCompareGraph } from "../../apis/api/Predict";
import { selectUserNoState } from "../../Store/PredictState";
import { selectStockNameState } from "../../Store/PredictState";
import { selectUserNameState } from "../../Store/PredictState";

function Graph() {
    const [selectUserNo, setSelectUserNo] = useRecoilState(selectUserNoState);
    const [selectStockName, setSelectStockName] =
        useRecoilState(selectStockNameState);
    const [selectUserName, setSelectUserName] =
        useRecoilState(selectUserNameState);
    const [graphImage, setGraphImage] = useState<string>("");

    useEffect(() => {
        if(selectStockName ===""){
            return;
        }       
        selectCompareGraph(selectUserNo, selectStockName).then(
            (imageUrl: string) => {
                setGraphImage(imageUrl);
            }
        );
    }, [selectUserNo, selectStockName]);

    if (!selectUserNo) {
        return (
            <Wrapper>
                <Title>차트 비교</Title>
                <Container>
                    <Content>피드를 선택해 보세요 !</Content>
                </Container>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                <Title>
                    <b>{selectUserName}</b>님의 예측과 <b>{selectStockName} </b>
                    비교
                </Title>
                <Container>
                    {graphImage ? (
                        <img src={graphImage} alt="Graph" />
                    ) : (
                        <Content>Loading...</Content>
                    )}
                </Container>
            </Wrapper>
        );
    }
}

export default Graph;

const Wrapper = styled.div``;

const Container = styled.div`
    border-radius: 30px;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    width: 70%;
    height: 270px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 30px;
    img {
        width: 95%;
        height: 95%;
        border-radius: 30px;
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    color: gray;
`;
const Title = styled.div``;
