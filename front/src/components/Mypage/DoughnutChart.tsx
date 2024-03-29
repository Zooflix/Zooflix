import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Zbti from "../Predict/Zbti";
import { useRecoilState, useRecoilValue } from "recoil";
import { zbtiQuestionState } from "../../Store/ZbtiState";
import { myPageInfoState } from "../../Store/MyPageState";
import { userPageInfoState } from "../../Store/UserPageState";
import { useEffect } from "react";
import { getMyInfo } from "../../apis/api/MyPage";

ChartJS.register(ArcElement, Tooltip);

interface ChartProps {
  userName: string;
  temp: number;
  color: string;
  transparency: string;
  imgWidth: string;
}

function DoughnutChart({ userName, temp, color, transparency, imgWidth }: ChartProps) {
  const myInfo = useRecoilValue(myPageInfoState);
  const userInfo = useRecoilValue(userPageInfoState);

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

  // console.log(myInfo.userZbti);

  //로그인 한 zbti
  return (
    <ChartWrapper>
      <Doughnut data={Data} options={Options}></Doughnut>
      <Zbti
        userZbti={userName===myInfo.userName? myInfo.userZbti:userInfo.userZbti}
        width={imgWidth}
        className="ZbtiImg"
      ></Zbti>
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

const Temp = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
