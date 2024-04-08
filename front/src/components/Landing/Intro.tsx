import styled, { keyframes } from "styled-components";
import Characters from "../../assets/img/character/Characters.svg";
import Zooflix from "../../assets/img/Zooflix.svg";
import below from "../../assets/img/button/below.svg";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Landing1 from "./Landing1";
import Landing2 from "./Landing2";
import Landing3 from "./Landing3";
import { Link } from "react-router-dom";

function Intro() {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const targetElement1 = document.getElementById("target1");
      const targetElement2 = document.getElementById("target2");
      const targetElement3 = document.getElementById("target3");

      if (targetElement1) {
        setIsVisible1(scrollPosition > targetElement1.offsetTop);
      }
      if (targetElement2) {
        setIsVisible2(scrollPosition > targetElement2.offsetTop);
      }
      if (targetElement3) {
        setIsVisible3(scrollPosition > targetElement3.offsetTop);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible1) {
      controls1.start({ opacity: 1, x: 0, transition: { duration: 1.6 } });
    } else {
      controls1.start({ opacity: 0.5, x: -300 });
    }
  }, [isVisible1, controls1]);

  useEffect(() => {
    if (isVisible2) {
      controls2.start({ opacity: 1, x: 0, transition: { duration: 1.6 } });
    } else {
      controls2.start({ opacity: 0.5, x: 400 });
    }
  }, [isVisible2, controls2]);

  useEffect(() => {
    if (isVisible3) {
      controls3.start({ opacity: 1, x: 0, transition: { duration: 1.6 } });
    } else {
      controls3.start({ opacity: 0.5, x: -300 });
    }
  }, [isVisible3, controls3]);

  return (
    <>
      <LandingPage>
        <div>
          <img
            src={Zooflix}
            alt="Zooflix"
            width="55%"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div>
          <img
            src={Characters}
            alt="characters"
            width="100%"
            loading="lazy"
            decoding="async"
          />
        </div>
        <Margin>주식 구독 서비스</Margin>
        <Margin>
          <Chevron />
          <Chevron />
          <Chevron />
          <Text>Scroll down</Text>
        </Margin>
      </LandingPage>

      <LandingPage2 id="target1" />

      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={controls1}
        style={{ marginTop: "50px" }}
      >
        {isVisible1 && <Landing1 />}
      </motion.div>

      <LandingPage2 id="target2" />

      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={controls2}
        style={{ marginTop: "50px" }}
      >
        {isVisible2 && <Landing2 />}
      </motion.div>

      <LandingPage2 id="target3" />

      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={controls3}
        style={{ marginTop: "50px" }}
      >
        {isVisible3 && (
          <>
            <Landing3 />
            <ButtonDiv>
              <Link to="/main">
                <button>시작하기</button>
              </Link>
            </ButtonDiv>
          </>
        )}
      </motion.div>
    </>
  );
}

export default Intro;

const LandingPage = styled.div`
  background: linear-gradient(180deg, #81b9d6 0%, #c4d3e8 55.5%, #ffffff 96.5%);
  padding-top: 105px;
  height: 100vh;
  width: 100vw;
  text-align: center;
  color: white;
  font-weight: 600;
  img {
    margin: 17px 0;
  }
`;

const Margin = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;

const LandingPage2 = styled.div`
  margin-top: 40px;
`;

const ButtonDiv = styled.div`
  button {
    background: black;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 15px 50px;
    font-weight: bold;
    margin: 10px;
    cursor: pointer;
  }

  text-align: center;
  margin: 60px;
`;

const move = keyframes`
  25% {
    opacity: 1;
  }
  33% {
    opacity: 1;
    transform: translateY(30px);
  }
  67% {
    opacity: 1;
    transform: translateY(40px);
  }
  100% {
    opacity: 0;
    transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
  }
`;

const pulse = keyframes`
  to {
    opacity: 1;
  }
`;

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background: #333;
// `;

const Chevron = styled.div`
  position: absolute;
  width: 28px;
  height: 8px;
  opacity: 0;
  transform: scale3d(0.5, 0.5, 0.5);
  animation: ${move} 3s ease-out infinite;

  &:first-child {
    animation: ${move} 3s ease-out 1s infinite;
  }

  &:nth-child(2) {
    animation: ${move} 3s ease-out 2s infinite;
  }

  &:before,
  &:after {
    content: " ";
    position: absolute;
    top: 0;
    height: 100%;
    width: 51%;
    background: #fff;
  }

  &:before {
    left: 0;
    transform: skew(0deg, 30deg);
  }

  &:after {
    right: 0;
    width: 50%;
    transform: skew(0deg, -30deg);
  }
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 75px;
  font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
  font-size: 12px;
  color: lightblue;
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0.25;
  animation: ${pulse} 2s linear alternate infinite;
`;
