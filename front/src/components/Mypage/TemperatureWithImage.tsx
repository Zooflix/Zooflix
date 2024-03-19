import { Chart, ChartData } from "chart.js";
import styled from "styled-components";

function TemperatureWithImage() {
    
    interface DonutChartProps {
        data: ChartData;
    }

    
    return (
        <Wrapper>

        </Wrapper>
    )
}

export default TemperatureWithImage;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 470px;
`;

const Temparature = styled.div`
    text-align: center;
`;

const ImageWithNickname = styled.div`
    flex-direction: column;
`;
