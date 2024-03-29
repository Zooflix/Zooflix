import styled from "styled-components";
import { useEffect, useState } from "react";
import Character3d from "../Character/Character3d";
import { getZoostra } from "../../apis/api/Predict";
import Zbti from "./Zbti";
import Crown from "../../assets/img/rank/crown.svg";

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
            console.log(zoostra);
    }, [props.stockName]);


    if (props.stockName === "null") {
        return (
            <Wrapper>
                <Content>이 달의 주스트라다무스
                </Content>
                <Zoostra>
                <Zbti userZbti={zoostra.userZbti}/>
                    <Name>
                        {zoostra.userName}
                        <span>{">"}</span>
                    </Name>
                </Zoostra>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                {zoostra.userNo ? (
                    <>
                        <Content>
                            {props.stockName} 에서 예측을{" "}
                            <span style={{ color: "#DE0000" }}>
                                가장 잘해요!
                            </span>
                        </Content>
                        <Zoostra>
                        <Zbti userZbti={zoostra.userZbti}/>
                            <Name>
                                {zoostra.userName}
                                <span>{" > "}</span>
                            </Name>
                        </Zoostra>
                    </>
                ) : (
                    <NoContent>
                        {props.stockName} 종목은
                        <br />
                        예측성공한 사용자가 없어요!
                    </NoContent>
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
    position: relative; /* 상대적 위치 설정 */
`;

const CrownWrapper = styled.div`
    position: absolute; /* 절대적 위치 설정 */
    top: -50px; /* 상위 요소 대비 위로 50px 이동 */
    left: 50%; /* 가운데 정렬을 위해 50%로 설정 */
    transform: translateX(-50%); /* 가운데 정렬 */
    z-index: -1;
`;
const Name = styled.div`
    display: flex;
    font-weight: bold;
    align-items: center;
    margin: 10px;
    span {
        padding-left: 15px;
    }
`;
const First = styled.div`
width: 10px;
`