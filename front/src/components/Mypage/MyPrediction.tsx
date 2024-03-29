import { useState } from "react";
import styled from "styled-components";
import TrashBin from "../../assets/img/button/TrashBin.svg";
import { deletePredict } from "../../apis/api/Predict";

type FeedProps = {
  pdUpDown: boolean;
  pdResult: string;
};

interface Prediction {
  pdNo: number;
  stockName: string;
  pdValue: number;
  pdUpDown: boolean;
  pdDate: String;
  pdResult: string;
  pdContent: string;
}

interface PredictionItemProps {
  prediction: Prediction;
  onDelete: (pdNo: Number) => void;
}

function MyPrediction({ prediction, onDelete }: PredictionItemProps) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const deleteMyPredict = (predictNo: number) => {
    // const isConfirmed = window.confirm("글을 삭제하시겠습니까?");
    // if (!isConfirmed) {
    //     return;
    // }
    try {
      deletePredict(predictNo);
      onDelete(predictNo);
    } catch (error) {
      console.log("deletePredict error : " + error);
    }
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
        {prediction.pdDate}
        <span style={{}}>{prediction.pdResult}</span>
      </p>
      <button>
        <img
          src={TrashBin}
          alt="trashbin"
          onClick={() => deleteMyPredict(prediction.pdNo)}
        />
      </button>
      {isContentVisible && (
        <div className="content">{prediction.pdContent}</div>
      )}
    </PredictionCell>
  );
}

export default MyPrediction;

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
