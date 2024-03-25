import { useState } from "react";
import styled from "styled-components";
import TrashBin from "../../assets/img/button/TrashBin.svg";

type FeedProps = {
    pdUpDown: boolean;
    pdResult: string;
};

interface Prediction {
    pdNo: number;
    stockName: string;
    pdValue: number;
    pdUpDown: boolean;
    pdDate: string;
    pdResult: string;
    pdContent: string;
}

interface PredictionItemProps {
    prediction: Prediction;
}

function MyPrediction({ prediction }: PredictionItemProps) {
    const [isContentVisible, setIsContentVisible] = useState(false);

    const toggleContentVisibility = () => {
        setIsContentVisible(!isContentVisible);
    };

    // 미완성된 예측글 삭제
    const deletePrediction = (id: Number) => {
        fetch(`/predict/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <PredictionCell
            pdUpDown={prediction.pdUpDown}
            pdResult={prediction.pdResult}
            onClick={toggleContentVisibility}
        >
            <p>{prediction.stockName}</p>
            <p>
                {prediction.pdValue}
                <span
                    style={{
                        color: prediction.pdUpDown ? "red" : "blue",
                        marginLeft: "5px",
                    }}
                >
                    {prediction.pdUpDown ? "▲" : "▼"}
                </span>
            </p>
            <p>
                {prediction.pdDate} {prediction.pdResult}
            </p>
            <button>
                <img
                    src={TrashBin}
                    alt="trashbin"
                    onClick={() => deletePrediction(prediction.pdNo)}
                />
            </button>
            {isContentVisible && <div className="content">{prediction.pdContent}</div>}
        </PredictionCell>
    );
}

export default MyPrediction;

// const Wrapper = styled.div`
//   margin: 20px;
// `;

const PredictionCell = styled.div<FeedProps>`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    margin: 20px; //Wrapper 없애고 넣어보기
    padding: 10px;
    gap: 10px;
    border: 0.987301px solid #e2e2e2;
    border-radius: 11.8476px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    background: ${(props) =>
        props.pdResult
            ? "linear-gradient(to bottom, #F0F0F0, #FFFFFF)"
            : props.pdUpDown
            ? "linear-gradient(to bottom, #FFF3F3, #FFFFFF)"
            : "linear-gradient(to bottom, #F3FAFF, #FFFFFF)"};

    .content {
        overflow: auto;
        grid-column: 1 / span 4;
    }

    button {
        justify-self: end;
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
