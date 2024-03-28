import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { zbtiState } from "../../Store/ZbtiState";

import sloth from "../../assets/img/Portfolio/sloth.svg";
import cow from "../../assets/img/Portfolio/cow.svg";
import fox from "../../assets/img/Portfolio/fox.svg";
import hippo from "../../assets/img/Portfolio/hippo.svg";
import lion from "../../assets/img/Portfolio/lion.svg";
import monkey from "../../assets/img/Portfolio/monkey.svg";
import panda from "../../assets/img/Portfolio/panda.svg";
import pig from "../../assets/img/Portfolio/pig.svg";
import rabbit from "../../assets/img/Portfolio/rabbit.svg";
import unicorn from "../../assets/img/Portfolio/unicorn.svg";
import zebra from "../../assets/img/Portfolio/zebra.svg";

function ZbtiResult() {
  const zbtiValue = useRecoilValue(zbtiState);

  const isSloth = zbtiValue.toString() === [2, 1, 1, 2, 1, 2, 1, 2].toString();
  const isPanda = zbtiValue.toString() === [1, 1, 1, 1, 1, 1, 1, 2].toString();
  const isHippo = zbtiValue.toString() === [1, 1, 1, 2, 1, 1, 2, 1].toString();
  const isUnicorn =
    zbtiValue.toString() === [1, 2, 2, 2, 1, 1, 2, 2].toString();
  const isFox = zbtiValue.toString() === [1, 1, 2, 1, 1, 2, 1, 1].toString();
  const isRabbit = zbtiValue.toString() === [2, 2, 2, 1, 1, 1, 1, 2].toString();
  const isPig = zbtiValue.toString() === [2, 1, 1, 1, 2, 2, 1, 2].toString();
  const isZebra = zbtiValue.toString() === [2, 2, 1, 1, 2, 2, 1, 2].toString();
  const isMonkey = zbtiValue.toString() === [1, 2, 2, 2, 1, 1, 2, 2].toString();
  const isCow = zbtiValue.toString() === [2, 1, 1, 1, 2, 2, 1, 1].toString();
  const isLion = zbtiValue.toString() === [1, 2, 2, 1, 1, 1, 2, 2].toString();

  return (
    <Container>
      {isSloth && <img src={sloth} alt="sloth portfolio" />}
      {isHippo && <img src={hippo} alt="hippo portfolio" />}
      {isUnicorn && <img src={unicorn} alt="unicorn portfolio" />}
      {isFox && <img src={fox} alt="fox portfolio" />}
      {isRabbit && <img src={rabbit} alt="rabbit portfolio" />}
      {isPig && <img src={pig} alt="pig portfolio" />}
      {isMonkey && <img src={monkey} alt="monkey portfolio" />}
      {isCow && <img src={cow} alt="cow portfolio" />}
      {isZebra && <img src={zebra} alt="zebra portfolio" />}
      {isLion && <img src={lion} alt="lion portfolio" />}
      {/* 나머지는 판다 */}
      {isPanda && <img src={panda} alt="panda portfolio" />}
    </Container>
  );
}

export default ZbtiResult;

const Container = styled.div``;
const ResultValue = styled.div``;
