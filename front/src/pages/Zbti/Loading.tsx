import styled from "styled-components";

// 이미지
import Bear from "../../assets/img/character/Bear.svg";
import Fox from "../../assets/img/character/Fox.svg";
import Lion from "../../assets/img/character/Lion.svg";
import Rabbit from "../../assets/img/character/Rabbit.svg";
import Panda from "../../assets/img/character/Panda.svg";
import Sloth from "../../assets/img/character/Sloth.svg";

function Loading() {
  return (
    <Wrapper>
      <h1>분석중</h1>
      <ImgContainer>
        <img src={Bear} alt="Bear" />
        {/* <img src={Fox} alt="Fox" />
        <img src={Lion} alt="Lion" />
        <img src={Rabbit} alt="Rabbit" />
        <img src={Panda} alt="Panda" />
        <img src={Sloth} alt="Sloth" /> */}
        </ImgContainer>
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  position:relative;
  // overflow:hidden;

  h1 {
    font-family: WAGURITTF;
    font-size: 50px;
    font-weight: lighter;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100px;
    position: absolute;
    animation: bounce 1.2s infinite;
  }

  @keyframes bounce {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(50px) translateY(-30px);
    }
    100% {
      transform: translateX(100px);
    }
  }
  // @keyframes bounce {
  //   0% {
  //     top: 30px;
  // 	  animation-timing-function: ease-in;
  // 	}
  // 	50% {
  //     top: 100px;
  //     animation-timing-function: ease-out;
  // 	}
  // 	60% {
  //     top: 120px;
  // 	  animation-timing-function: ease-in;
  //   }
  // 	65% {
  //     top: 100px;
  // 	  animation-timing-function: ease-out;
  //   }
  // 	90% {
  // 	  top: 30px;
  // 	  animation-timing-function: ease-in;
  // 	}
  // 	100% {
  //     top: 30px;
  // 	  animation-timing-function: ease-in;
  // 	}
  // }

  // @keyframes bannermove {
  //   0% {
  //       transform: translate(0, 0);
  //   }
  //   // 50% {
  //   //     transform: translate(50%, 0);
  //   // }
  //   100% {
  //     transform: translate(100%, 0);
  //   }
  // }
`;


