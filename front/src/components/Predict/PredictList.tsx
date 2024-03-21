import styled from "styled-components";
import { useState, useEffect } from "react";
import { selectPredicts } from "../../apis/api/Predict";
import { deletePredict } from "../../apis/api/Predict";

import Deletebtn from "../../assets/img/button/Deletebtn.svg";
import Reportbtn from "../../assets/img/button/Reportbtn.svg";
import Feedbtn from "../../assets/img/button/Feedbtn.svg";
import FeedOpenbtn from "../../assets/img/button/FeedOpenbtn.svg";

type FeedProps = {
    pdUpDown: boolean;
    pdResult: string;
}

type PredictProps = {
    sorted: string;
    stockName: string;
};

function PredictList(props: PredictProps) {
    const [data, setData] = useState<any[]>([]);
    const [openItems, setOpenItems] = useState<number[]>([]);

    useEffect(() => {
        fetchData();
    }, [props.sorted, props.stockName]);

    const fetchData = async () => {
        try {
            const result = await selectPredicts(
                props.sorted,
                props.stockName
            );
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const toggleContent = (pdNo: number) => {
        setOpenItems((prevState) => {
            if (prevState.includes(pdNo)) {
                return prevState.filter((item) => item !== pdNo);
            } else {
                return [pdNo];
            }
        });
    };

    const handleDelete = async (pdNo: number) => {
        const isConfirmed = window.confirm('글을 삭제하시겠습니까?');
        if(!isConfirmed){
            return;
        }
        try {
            await deletePredict(pdNo);
            // 삭제 후 데이터 다시 가져오기
            fetchData();
        } catch (error) {
            console.log("Error deleting data:", error);
        }
    };

    interface ClickProps {
        isOpen: boolean;
    }

    const Click = styled.div<ClickProps>`
        display: ${(props) => (props.isOpen ? "flex" : "none")};
        padding: 10px 30px 30px 30px;
        flex-direction: column;
    `;

    return (
        <Wrapper>
            {data && data.map((item) => (
                <Feed
                    key={item.pdNo}
                    pdUpDown={item.pdUpDown}
                    pdResult={item.pdResult}
                >
                    <Noncllick>
                        <p style={{ width: "100px" }}>{item.stockName}</p>
                        <p style={{ width: "100px" }}>{item.userName}</p>
                        <p style={{ width: "100px" }}>{item.pdDate}</p>
                        <p style={{ width: "100px" }}>
                            {item.pdValue}
                            <span
                                style={{
                                    color: item.pdUpDown ? "red" : "blue",
                                    marginLeft: "5px",
                                }}
                            >
                                {item.pdUpDown ? "▲" : "▼"}
                            </span>
                        </p>
                        <button onClick={() => toggleContent(item.pdNo)}>
                            <img
                                src={
                                    openItems.includes(item.pdNo)
                                        ? FeedOpenbtn
                                        : Feedbtn
                                }
                                alt="Feed Button"
                            />
                        </button>
                    </Noncllick>
                    <Click isOpen={openItems.includes(item.pdNo)}>
                        {item.pdContent}
                        <FeedIcon>
                            <img
                                src={Deletebtn}
                                alt="삭제"
                                style={{ marginRight: "20px" }}
                                onClick={() => handleDelete(item.pdNo)}
                            />
                            <img src={Reportbtn} alt="신고" />
                        </FeedIcon>
                    </Click>
                </Feed>
            ))}
        </Wrapper>
    );
}

export default PredictList;
const Wrapper = styled.div``;

const Feed = styled.div<FeedProps>`
    border-radius: 15px;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    background: ${(props) =>
        props.pdResult
            ? "linear-gradient(to bottom, #F0F0F0, #FFFFFF)"
            : props.pdUpDown
            ? "linear-gradient(to bottom, #FFF3F3, #FFFFFF)"
            : "linear-gradient(to bottom, #F3FAFF, #FFFFFF)"};

    button {
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
    }

    img {
        width: 24px;
        height: 24px;
    }
`;

const Noncllick = styled.div`
    display: flex;
    justify-content: space-evenly;
    p {
        width: "100px";
        text-align: center;
    }
`;

const FeedIcon = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
    img{
      cursor: pointer;
    }
`;
