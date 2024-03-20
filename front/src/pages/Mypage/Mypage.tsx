import styled from "styled-components";
import TemperatureWithImage from "../../components/Mypage/TemperatureWithImage";
import MyInfo from "../../components/Mypage/MyInfo";
import RouteToOtherPage from "../../components/Mypage/RouteToOtherPage";
import MyPredictList from "../../components/Mypage/MyPredictList";
import ContentHeader from "../../components/Mypage/ContentHeader";

function Mypage() {

    const info = '내 정보';

    return (
        <Wrapper>
            <Container>
                <LeftSideMyInfo>
                    {info}
                    <TemperatureWithImage/>
                    <MyInfo/>
                    <RouteToOtherPage/>
                </LeftSideMyInfo>
                <RightSideMyInfo>
                    <ContentHeader/>
                </RightSideMyInfo>
            </Container>
        </Wrapper>
    );
}

export default Mypage;  

const Wrapper = styled.div`
    display: block;
`;

const Container = styled.div`
    position: static;
    width: 1280px;
    margin: 0 auto;
    padding-bottom: 40px;
`;

const LeftSideMyInfo = styled.div`
    float: left;
    width: 420px;
    height: 785px;
    text-align: center;
    border : 1px solid;
    margin: 0 auto;
`;

const RightSideMyInfo = styled.div`
    float: right;
    width: 775px;
    border : 1px solid;
    margin: 0 auto;
`;
