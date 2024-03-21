import styled from "styled-components";
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
      controls1.start({ opacity: 1, x: 0, transition: { duration: 1.3 } });
    } else {
      controls1.start({ opacity: 0.5, x: -300 });
    }
  }, [isVisible1, controls1]);

  useEffect(() => {
    if (isVisible2) {
      controls2.start({ opacity: 1, x: 0, transition: { duration: 1.3 } });
    } else {
      controls2.start({ opacity: 0.5, x: 400 });
    }
  }, [isVisible2, controls2]);

  useEffect(() => {
    if (isVisible3) {
      controls3.start({ opacity: 1, x: 0, transition: { duration: 1.3 } });
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
        <Margin>주식 구독 서비스를 제공합니다.</Margin>
        <Margin>
          <img
            src={below}
            alt="below"
            width="60px"
            loading="lazy"
            decoding="async"
          />
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

const LandingPage2 = styled.div``;

const ButtonDiv = styled.div`
  button {
    background: black;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 15px 50px;
    font-weight: bold;
    margin: 10px;
  }

  text-align: center;
  margin: 60px;
`;
