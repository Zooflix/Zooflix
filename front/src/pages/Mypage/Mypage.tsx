import styled from "styled-components";
import TemperatureWithImage from "../../components/Mypage/TemperatureWithImage";
import MyInfo from "../../components/Mypage/MyInfo";
import RouteToOtherPage from "../../components/Mypage/RouteToOtherPage";
import MyPredictList from "../../components/Mypage/MyPredictList";

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
                    <ContentHeader>
                        <ContentHeaderTab>
                            <ContentTabList>
                                <ContentTabListItem>
                                    <ContentTabListItemSpan>
                                        <a href="내가 보여줘야 할 곳">
                                            내가 쓴 예측 글
                                        </a>
                                    </ContentTabListItemSpan>
                                </ContentTabListItem>
                                <ContentTabListItem>
                                    <ContentTabListItemSpan>
                                        <a href="내가 보여줘야 할 곳">
                                            내 구독 정보
                                        </a>
                                    </ContentTabListItemSpan>
                                </ContentTabListItem>
                            </ContentTabList>
                        </ContentHeaderTab>
                    </ContentHeader>

                    <MyPredictList/>

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

const ContentHeader = styled.div`
    diplay: flex;
    padding: 15px 20px;
`;

const ContentHeaderTab = styled.div`
    -webkit-box-flex: 1;
    flex: 1;
    display: block;
`;

const ContentTabList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-block-style: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
`;

const ContentTabListItem = styled.li`
    position: relative;
    display: list-item;
    text-align: -webkit-match-parent;
    margin: 0;
    padding: 0;
`;

const ContentTabListItemSpan = styled.span`
    display: inline-block;
    // font-size: 1.6rem;
    line-height: 23px;
    font-weight: 800;
    vertical-align: top;
    color: rgba(8, 8, 8, .5);
    -webkit-font-smoothing: antialiased;
`;

const ContentAddress = styled.a`
    -webkit-any-link: cursor : pointer;
`;
