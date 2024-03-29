import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import BearImg from "../../assets/img/Zbti/BearImg.svg";
import Zbti from "../Predict/Zbti";
import { useRecoilState, useRecoilValue } from "recoil";
import { zbtiQuestionState, zbtiResultState } from "../../Store/ZbtiState";

ChartJS.register(ArcElement, Tooltip);

interface ChartProps {
  temp: number;
  color: string;
  transparency: string;
}

function DoughnutChart({ temp, color, transparency }: ChartProps) {
  const Data = {
    datasets: [
      {
        data: [temp, 100 - temp],
        backgroundColor: [color, transparency],
        borderRadius: 10,
        circumference: 270,
        rotation: 225,
        cutout: "80%", //두께 조절
        responsive: false,
        zIndex: 1,
      },
    ],
  };
  const Options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  //로그인 한 zbti
  const zbtiResult = useRecoilValue(zbtiResultState);
  console.log("넘기지", zbtiResult);
  // const [zbtiResult, setZbtiResult] = useRecoilState(zbtiResultState);
  return (
    <ChartWrapper>
      <Doughnut data={Data} options={Options}></Doughnut>
      <Zbti userZbti={zbtiResult} width="250px" className="ZbtiImg"></Zbti>
      <Temp>{temp}℃</Temp>
    </ChartWrapper>
  );
}

export default DoughnutChart;

const ChartWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  margin: 0 auto;
  z-index: 1;
  .ZbtiImg {
    position: absolute;
    z-index: 2;
  }
`;

const ZbtiImg = styled.img`
  position: absolute;
  z-index: 2;
`;

const Temp = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
