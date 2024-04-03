import styled from "styled-components";
import { useNavigate } from "react-router";
import { useEffect } from "react";


// 이미지
import Unicorn from "../../assets/img/character/Unicorn.svg";
import Rabbit from "../../assets/img/character/Rabbit.svg";
import Fox from "../../assets/img/character/Fox.svg";
import Panda from "../../assets/img/character/Panda.svg";
import Sloth from "../../assets/img/character/Sloth.svg";
import Bear from "../../assets/img/character/Bear.svg";
import Cow from "../../assets/img/character/Cow.svg";
import Lion from "../../assets/img/character/Lion.svg";
import Monkey from "../../assets/img/character/Monkey.svg";
import Zebra from "../../assets/img/character/Zebra.svg";


interface ImgProps {
  src: string;
  alt: string;
}


function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Wrapper>
      <Container>
        <CharacterContainer>
          <Letter>나</Letter>
          <CharacterImg src={Unicorn} alt="유니콘"/>
        </CharacterContainer>
        <CharacterContainer>
          <Letter>는</Letter>
          <CharacterImg src={Monkey} alt="원숭이"/>
        </CharacterContainer>
        <CharacterContainer>
          <Letter>무</Letter>
          <CharacterImg src={Sloth} alt="나무늘보"/>
        </CharacterContainer>
        <CharacterContainer>
          <Letter>슨</Letter>
          <CharacterImg src={Lion} alt="사자"/>
        </CharacterContainer>
        <CharacterContainer>
          <Letter>유</Letter>
          <CharacterImg src={Zebra} alt="얼룩말"/>
        </CharacterContainer>
        <CharacterContainer>
          <Letter>형</Letter>
          <CharacterImg src={Bear} alt="곰돌이"/>
        </CharacterContainer>
        <CharacterContainer>
          <Letter>일</Letter>
          <CharacterImg src={Cow} alt="젖소"/>
        </CharacterContainer>
        <CharacterContainer>
          <Letter>까</Letter>
          <CharacterImg src={Rabbit} alt="토끼"/>
        </CharacterContainer>
        <CharacterContainer>
          <Letter>요</Letter>
          <CharacterImg src={Fox} alt="여우"/>
        </CharacterContainer>
        <CharacterContainer>
          <Letter>?</Letter>
          <CharacterImg src={Panda} alt="판다"/>
        </CharacterContainer>
      </Container>
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  margin: 60px 0 0 0;
  position: relative;
`;

const CharacterContainer = styled.div`
  text-align: center;
  position: relative;
  top: 20px;
  display: inline-block;
  animation: bounce .35s ease-out infinite alternate;
  margin: 0 5px;
  font-size: 50px;
  color: darkturquoise;

  &:nth-child(2) { animation-delay: .1s; color: yellowgreen }
  &:nth-child(3) { animation-delay: .2s; color: plum }
  &:nth-child(4) { animation-delay: .3s; color: salmon }
  &:nth-child(5) { animation-delay: .4s; color: purple}
  &:nth-child(6) { animation-delay: .5s; color: orange}
  &:nth-child(7) { animation-delay: .6s; color: mediumaquamarine}
  &:nth-child(8) { animation-delay: .7s; color: deepskyblue}
  &:nth-child(9) { animation-delay: .8s; color: crimson}
  &:nth-child(10) { animation-delay: .9s; color: royalblue}

  @keyframes bounce {
    100% {
      top: -20px;
      text-shadow: 0 1px 0 #fdfdfd,
                   0 2px 0 #fdfdfd,
                   0 3px 0 #9d9d9d,
                   0 4px 0 #CCC,
                   0 5px 0 #CCC,
                   0 6px 0 #CCC,
                   0 7px 0 #CCC,
                   0 8px 0 #CCC,
                   0 9px 0 #CCC,
                   0 30px 25px rgba(0, 0, 0, .1);
    }
  }
`;

const Letter = styled.h1`
  font-family: WAGURITTF;
  font-size: 80px;
  font-weight: lighter;
  margin-top: 180px;
`;


const CharacterImg = styled.img<ImgProps>`
  height: 160px;
`;
