import styled from "styled-components";
import Characters from "../../assets/img/character/Characters.svg";
import Zooflix from "../../assets/img/Zooflix.svg";
import below from "../../assets/img/button/below.svg";

function Intro() {
  return (
    <LandingPage>
      <div>
        <img src={Zooflix} alt="Zooflix" width="55%" />
      </div>
      <div>
        <img src={Characters} alt="characters" width="100%" />
      </div>
      <Margin>주식 구독 서비스를 제공합니다.</Margin>
      <Margin>
        <img src={below} alt="below" width="60px" />
      </Margin>
    </LandingPage>
  );
}

export default Intro;

const LandingPage = styled.div`
  background: linear-gradient(180deg, #81b9d6 0%, #c4d3e8 55.5%, #ffffff 96.5%);
  padding-top: 135px;
  height: 100vh;
  text-align: center;
  color: white;
  font-weight: 600;
  img {
    margin: 20px 0;
  }
`;

const Margin = styled.div`
  margin-top: 50px;
`;
