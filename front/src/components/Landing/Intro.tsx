import styled from "styled-components";
import Characters from "../../assets/img/character/Characters.svg";
import Zooflix from "../../assets/img/Zooflix.svg";
import below from "../../assets/img/button/below.svg";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import SubscribePredict from "./SubscribePredict";

function Intro() {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const targetElement = document.getElementById("target");
      let targetPosition = 0;
      if (targetElement) {
        targetPosition = targetElement.offsetTop;
      }
      if (scrollPosition > targetPosition) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, x: 0, transition: { duration: 1 } });
    } else {
      controls.start({ opacity: 0.5, x: -200 });
    }
  }, [isVisible, controls]);

  return (
    <>
      <div>
        <LandingPage id="target">
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
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={controls}
          style={{ marginTop: "50px" }}
        >
          {isVisible && (
            <motion.div
              initial={{ opacity: 0.5, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <SubscribePredict />
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Intro;

const LandingPage = styled.div`
  background: linear-gradient(180deg, #81b9d6 0%, #c4d3e8 55.5%, #ffffff 96.5%);
  padding-top: 135px;
  height: 100vh;
  width: 100vw;
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
