import { useState } from "react";
import styled from "styled-components";
import TrashBin from "../../assets/img/button/TrashBin.svg"


function MyPrediction({ prediction }: PredictionItemProps) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  //*********** 백엔드 MyPredictDto 에 pdNo 집어넣어야함***********/
  const deletePrediction = (id: Number) => {
    fetch(`/api/prediction/${id}`, {
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
  }

  return (
    <Wrapper>
      <PredictionCell style={{ backgroundColor: prediction.pdUpDown ? 'red' : 'blue' }} onClick={toggleContentVisibility}>
        <div>{prediction.stockName}</div>
        <div>{prediction.pdValue} {prediction.pdUpDown ? '↑' : '↓'}</div>
        <div>{prediction.pdDate} {prediction.pdResult}</div>
        <button>
            <img src={TrashBin} alt="trashbin" onClick={() => deletePrediction(prediction.pdNo)}/>
        </button>
      </PredictionCell>
      {isContentVisible && <div>{prediction.pdContent}</div>}
    </Wrapper>
  );
}

export default MyPrediction;

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

const Wrapper = styled.div`
  margin: 20px;
`;

const PredictionCell = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  padding: 10px;
  gap: 10px;
  button {
    justify-self: end;
  }
`;

// const Content = styled.div`
//   background-color: lightgray;
//   padding: 10px;
//   margin-top: 10px;
// `;
