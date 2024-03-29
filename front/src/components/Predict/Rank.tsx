import styled from "styled-components";
import { useEffect, useState } from "react";
import Character3d from "../Character/Character3d";
import { getZoostra } from "../../apis/api/Predict";
import Zbti from "./Zbti";
import Crown from "../../assets/img/rank/crown.svg";
import UserDetailModal from "./UserDetailModal";

type RankProps = {
    stockName: string;
};

function Rank(props: RankProps) {
    const [zoostra, setZoostra] = useState({
        userNo: 0,
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (userName: string, userNo: number) => {
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    if (props.stockName === "null") {
        return (
            <BigWrapper>
                <Wrapper>
                    <Content>이 달의 <b>주스트라다무스</b></Content>
                    <div
                        onClick={() =>
                            openModal(zoostra.userName, zoostra.userNo)
                        }
                        style={{cursor: 'pointer'}}
                    >
                        <Zoostra>
                            <OnCrown>
                                <CrownImage
                                    src={Crown}
                                    alt="Crown"
                                    style={{ width: "42px" }}
                                />
                                <Zbti userZbti="Rabbit" />
                            </OnCrown>
                            <Name>
                                {zoostra.userName}
                                <span>{">"}</span>
                            </Name>
                        </Zoostra>
                    </div>
                </Wrapper>
                <UserDetailModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    userName={zoostra.userName}
                    userNo={zoostra.userNo}
                />
            </BigWrapper>
        );
    } else {
        return (
            <BigWrapper>
                <Wrapper>
                    {zoostra.userNo === 0 ? (
                        <>
                            <Content>
                                {props.stockName} 에서 예측을{" "}
                                <span style={{ color: "#DE0000" }}>
                                    가장 잘해요!
                                </span>
                            </Content>
                            <Zoostra>
                                <Zbti userZbti={zoostra.userZbti} />
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
                <UserDetailModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    userName={zoostra.userName}
                    userNo={zoostra.userNo}
                />
            </BigWrapper>
        );
    }
}

export default Rank;

const BigWrapper = styled.div``;

const Wrapper = styled.div`
    border-radius: 30px;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    width: 50%;
    height: 120px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    flex-direction: column;
    padding: 10px 30px;
`;
const Content = styled.div`
    font-weight: bolder;
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
    padding: 10px;
    span {
        padding-left: 15px;
    }
`;

const OnCrown = styled.div`
    display: flex;
    position: relative;
`;
const CrownImage = styled.img`
    position: absolute;
    top: 3px;
    left: 13.5px;
`;
