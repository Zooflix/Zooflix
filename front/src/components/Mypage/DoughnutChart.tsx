import styled from "styled-components";
import {Chart as ChartJS, ArcElement, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import BearImg from "../../assets/img/Zbti/BearImg.svg"
import { useRecoilState } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";

ChartJS.register(ArcElement, Tooltip);

function DoughnutChart() {

  const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);

  // const chartColor = "linear-gradient(#e66465, #9198e5)";

  const Data = {
     
    datasets: [
      {
        data: [myPageInfo.userTemperature, 100 - myPageInfo.userTemperature],
        backgroundColor: ["#FF6384", "#7AD3FF"],
        // borderColor: ["#FF6384", "#7AD3FF"],
        borderRadius: 10,
        circumference: 270,
        rotation: 225,
        cutout: '80%',  //두께 조절
        responsive: false,
        zIndex: 1,
      },
    ],
  }

  const Options = {  };

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