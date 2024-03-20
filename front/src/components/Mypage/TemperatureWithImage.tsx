import { Chart, ChartData } from "chart.js";
import styled from "styled-components";
import DoughnutChart from "./DoughnutChart";

function TemperatureWithImage() {

    const mannerTemperature = 30;
    const Nickname = "다라란";
    return (
        <Wrapper>
            <DoughnutChart/>
            {Nickname}
            <br/>
            {mannerTemperature + "°C"}
        </Wrapper>
    )
}

export default TemperatureWithImage;

const Wrapper = styled.div`
    display: column;
    justify-content: center;
`;
