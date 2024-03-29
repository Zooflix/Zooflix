import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import BearImg from "../../assets/img/Zbti/BearImg.svg";

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
        // backgroundColor: ["#7AD3FF", "rgba(122,211,255,0.1)"],
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

  return (
    <ChartWrapper>
      <Doughnut data={Data} options={Options}></Doughnut>
      {/* <ZbtiImg src={BearImg}></ZbtiImg> */}
    </ChartWrapper>
  );
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
