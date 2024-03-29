import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Zbti from "../Predict/Zbti";
import { useRecoilValue } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";
import { useEffect, useState } from "react";
import { getMyInfo } from "../../apis/api/MyPage";

ChartJS.register(ArcElement, Tooltip);

interface ChartProps {
  temp: number;
  color: string;
  transparency: string;
}

function DoughnutChart({ temp, color, transparency }: ChartProps) {
  console.log(myPageInfoState);
  const userInfo = useRecoilValue(myPageInfoState);

  const myInfo = useEffect(() => {
    getMyInfo();
  }, []);

  console.log(myInfo);

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
        userZbti={userInfo.userZbti}
        width="250px"
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

const ZbtiImg = styled.img`
  position: absolute;
  z-index: 2;
`;

const Temp = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
