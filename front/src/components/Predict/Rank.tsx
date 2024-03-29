import styled from "styled-components";
import { useEffect, useState } from "react";
import Character3d from "../Character/Character3d";
import { getZoostra } from "../../apis/api/Predict";

type RankProps = {
    stockName: string;
};

function Rank(props: RankProps) {
    const [zoostra, setZoostra] = useState({
        userNo: null,
        userName: "",
        userZbti: "",
    });

    useEffect(() => {
        getZoostra(props.stockName)
            .then((data) => {
                setZoostra(data);
            })
            .catch((error) => {
                console.error("Failed to fetch zoostra:", error);
            });
    }, [props.stockName]);

    if (props.stockName === "null") {
        return (
            <Wrapper>
                <Content>이 달의 주스트라다무스</Content>
                <Zoostra>
                    <Character3d
                        name={zoostra.userZbti}
                        characterScale={0.3}
                        canvasWidth={60}
                        canvasHeight={60}
                    />
                    <Name>{zoostra.userName}
                    <span>{'>'}</span></Name>
                </Zoostra>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                {zoostra.userNo ? (
            <>
                <Content>{props.stockName} 에서 예측을 <span style={{color: "#DE0000"}}>가장 잘해요!</span></Content>
                <Zoostra>
                    <Character3d
                        name={zoostra.userZbti}
                        characterScale={0.3}
                        canvasWidth={60}
                        canvasHeight={60}
                    />
                    <Name>
                        {zoostra.userName}
                        <span>{' > '}</span>
                    </Name>
                </Zoostra>
            </>
        ) : (
            <NoContent>{props.stockName} 종목은
            <br/>
            예측성공한 사용자가 없어요!</NoContent>
        )}
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
    height: 120px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    flex-direction: column;
    padding: 10px 30px;
    
`;
const Content = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const NoContent = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
    line-height: 2;
    display: flex;
    justify-content: center;
    text-align: center;
`;

const Zoostra = styled.div`
    display: flex;
    padding-top: 10px;
`;
const Name = styled.div`
    display: flex;
    font-weight: bold;
    align-items: center;
    padding-bottom: 10px;
    span {
        padding-left: 15px;
    }
`;
