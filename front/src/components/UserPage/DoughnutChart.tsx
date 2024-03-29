import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import BearImg from "../../assets/img/Zbti/BearImg.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { userPageInfoState } from "../../Store/UserPageState";
import Zbti from "../Predict/Zbti";

ChartJS.register(ArcElement, Tooltip);

function DoughnutChart() {
  const userInfo = useRecoilValue(userPageInfoState);

  const Data = {
    datasets: [
      {
        data: [userInfo.userTemperature, 100 - userInfo.userTemperature],
        backgroundColor: ["#7AD3FF", "rgba(122,211,255,0.3)"],
        // borderColor: ["#FF6384", "#7AD3FF"],
        borderRadius: 10,
        circumference: 270,
        rotation: 225,
        cutout: "80%", //두께 조절
        responsive: false,
        zIndex: 1,
      },
    ],
  };
  const Options = {};

  return (
    <ChartWrapper>
      <Doughnut data={Data} options={Options}></Doughnut>
      <Zbti
        userZbti={userInfo.userZbti}
        className="ZbtiImg"
        width="250px"
      ></Zbti>
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
  .ZbtiImg {
    position: absolute;
    z-index: 2;
  }
`;
