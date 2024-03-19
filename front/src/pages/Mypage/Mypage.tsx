import styled from "styled-components";
import HeaderLogo from "../../assets/img/Logo.svg";

function Mypage() {
    return (
        <Wrapper>
            <TheHeaderLogo>
                <img src={HeaderLogo} className="header" alt="HeaderLogo" />
            </TheHeaderLogo>
            <Container>
                내 정보
                <LeftSideMyInfo>
                    
                </LeftSideMyInfo>
                <RightSideMyInfo>

                </RightSideMyInfo>
            </Container>
        </Wrapper>
    );
}

export default Mypage;  

const Wrapper = styled.div`
    display: block;
`;

const TheHeaderLogo = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    position: relative;
    width: 1280px;
    margin: 0 auto;
    padding-bottom: 40px;
`;

const LeftSideMyInfo = styled.div`
    float: left;
    width: 420px;
`;

const RightSideMyInfo = styled.div`
    float: right;
    width: 775px;
`;