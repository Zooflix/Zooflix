import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Zbti from "../Predict/Zbti";
import { useRecoilValue } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";
import { userPageInfoState } from "../../Store/UserPageState";

ChartJS.register(ArcElement, Tooltip);

interface ChartProps {
  userName: string;
  temp: number;
  color: string;
  transparency: string;
  imgWidth: string;
}

function DoughnutChart({
  userName,
  temp,
  color,
  transparency,
  imgWidth,
}: ChartProps) {
  const myInfo = useRecoilValue(myPageInfoState);
  const userInfo = useRecoilValue(userPageInfoState);

  const getZbtiColor = (zbti: string) => {
    switch (zbti) {
      case "Zebra":
        return "#FF7C7C";
      case "Lion":
        return "#68b7ff";
      case "Cow":
        return "#238FBD";
      case "Pig":
        return "#dcafff";
      case "Sloth":
        return "#ace498";
      case "Monkey":
        return "#fff72c";
      case "Hippo":
        return "#8d54eb";
      case "Rabbit":
        return "#ff6cc4";
      case "Fox":
        return "#fea443";
      case "Panda":
        return "#76c193";
      case "Unicorn":
        return "#6be4ff";
      default:
        return "#FFBE59";
    }
  };

  const zbtiColor =
    userName === myInfo.userName
      ? getZbtiColor(myInfo.userZbti)
      : getZbtiColor(userInfo.userZbti);

  const Data = {
    datasets: [
      {
        data: [temp, 100 - temp],
        backgroundColor: [zbtiColor, transparency],
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
  return (
    <ChartWrapper>
      <Doughnut data={Data} options={Options}></Doughnut>
      <Zbti
        userZbti={
          userName === myInfo.userName ? myInfo.userZbti : userInfo.userZbti
        }
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
