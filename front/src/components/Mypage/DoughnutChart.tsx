import styled from "styled-components";
import {Chart as ChartJS, ArcElement, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";

import BearImg from "../../assets/img/Zbti/BearImg.svg"

ChartJS.register(ArcElement, Tooltip);

function DoughnutChart() {
  const Data = {
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderColor: ["#FF6384", "#36A2EB"],
        circumference: 270,
        rotation: 225,
        cutout: '80%',  //두께 조절
        responsive: false,
        zIndex: 1,
      },
    ],
  }

  const Options = {  };


  const Nickname = "다라란";

  return (
    <ChartWrapper>
      <Doughnut data={Data} options={Options}>
      </Doughnut>
      <ZbtiImg src={BearImg}>
      </ZbtiImg>
    </ChartWrapper>
  )
}

export default DoughnutChart;

const ChartWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  margin: 0 auto;
  z-index: 1;
`;

const ZbtiImg = styled.img`
  position: absolute;
  z-index: 2;
`;