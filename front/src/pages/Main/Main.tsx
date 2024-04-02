import styled from "styled-components";
import FlowBar from "../../components/Main/FlowBar";
import ZustraRank from "../../components/Main/ZustraRank";
import { useEffect, useState } from "react";
import MoreRank from "../../components/Main/MoreRank";
import StockRank from "../../components/Main/StockRank";
import Character3d from "../../components/Character/Character3d";
import zooflix from "../../assets/img/Zooflix.svg";
import { Link } from "react-router-dom";
import { getRankingList } from "../../apis/api/Main";
import CommonPageTransition from "../../components/Common/CommonPageTransition";

function Main() {
  const [mainData, setMainData] = useState({
    kospi: 0,
    kosdaq: 0,
    usd: 0,
    zustraRank: [
      {
        userNo: null,
        userName: null,
        predictCount: null,
        successCount: null,
        failCount: null,
        userTemperature: null,
        userZbti: null,
        successStreak: null,
        cnt: null,
      },
      {
        userNo: null,
        userName: null,
        predictCount: null,
        successCount: null,
        failCount: null,
        userTemperature: null,
        userZbti: null,
        successStreak: null,
        cnt: null,
      },
      {
        userNo: null,
        userName: null,
        predictCount: null,
        successCount: null,
        failCount: null,
        userTemperature: null,
        userZbti: null,
        successStreak: null,
        cnt: null,
      },
    ],
    topFailUser: {
      userNo: null,
      userName: null,
      predictCount: null,
      successCount: null,
      failCount: null,
      userTemperature: null,
      userZbti: null,
      successStreak: null,
      cnt: null,
    },
    topStreakUser: {
      userNo: null,
      userName: null,
      predictCount: null,
      successCount: null,
      failCount: null,
      userTemperature: null,
      userZbti: null,
      successStreak: null,
      cnt: null,
    },
    topStockUser: {
      userNo: null,
      userName: null,
      predictCount: null,
      successCount: null,
      failCount: null,
      userTemperature: null,
      userZbti: null,
      successStreak: null,
      cnt: null,
    },
    stockRank: [
      {
        stockCode: null,
        stockName: null,
        subscriberCnt: null,
      },
      {
        stockCode: null,
        stockName: null,
        subscriberCnt: null,
      },
      {
        stockCode: null,
        stockName: null,
        subscriberCnt: null,
      },
    ],
  });

  useEffect(() => {
    console.log("main");
    handleList();
    console.log(mainData);
  }, []);

  const handleList = async () => {
    const list = await getRankingList();
    console.log("rankinglist" + list);
    setMainData(list || []);
  };

  let zbti = new Map();
  //Bear, Cow, Fox, Hippo, Lion, Monkey, Pig, Rabbit, Rhino, Sloth, Unicon, Zebra
  zbti.set("Lion", "일단 다 사자");
  zbti.set("Monkey", "재간둥이 원숭이");
  zbti.set("Pig", "저금왕 돼지");
  zbti.set("Rabbit", "팔랑귀 단타마스터 토끼");
  zbti.set("Unicon", "공모주 러버 유니콘");
  zbti.set("Hippo", "큰 손 투자자 하마");
  zbti.set("Cow", "느긋한 젖소");
  zbti.set("Zebra", "호기심 많은 얼룩말");
  zbti.set("Panda", "하나만 판다");
  zbti.set("Bear", "검사 결과 없음");
  zbti.set("Fox", "재빠른 여우");
  zbti.set("Sloth", "게으른 나무늘보");

  return (
    <CommonPageTransition>
      <MainWrapper>
        <FlowBar
          kospi={mainData.kospi}
          kosdaq={mainData.kosdaq}
          usd={mainData.usd}
        />
        <Rank>
          <ZustraRank rankData={mainData.zustraRank} zbti={zbti} />
          <StockRank stockRank={mainData.stockRank} zbti={zbti} />
        </Rank>
        <BelowDiv>
          <MoreRank
            topFailUser={mainData.topFailUser}
            topStreakUser={mainData.topStreakUser}
            topStock={mainData.topStockUser}
          />
          <SubscribeDiv>
            <Link to="/stocksub" style={{ textDecoration: "none" }}>
              <Bubble>
                <div>
                  <img src={zooflix} width="140px" alt="zooflix" />
                </div>
                <div>주식 구독하러가기</div>
              </Bubble>
            </Link>
            <Character3d
              name="Bear"
              characterScale={0.45}
              canvasHeight={240}
              canvasWidth={200}
              toBelow={24}
            />
          </SubscribeDiv>
        </BelowDiv>
      </MainWrapper>
    </CommonPageTransition>
  );
}

export default Main;

const MainWrapper = styled.div`
  padding-left: 25px;
  display: flex;
  flex-direction: column;
`;

const Rank = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const BelowDiv = styled.div`
  display: flex;
`;

const Bubble = styled.div`
  position: relative;
  background: #092d5d;
  border-radius: 40px;
  color: white;
  padding: 20px 30px;
  height: 100px;
  font-weight: bold;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  margin: 20px 0 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-decoration-line: none;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 30px solid transparent;
    border-left-color: #092d5d;
    border-right: 0;
    border-top: 0;
    margin-top: -12px;
    margin-right: -20px;
  }
`;

const SubscribeDiv = styled.div`
  display: flex;
`;
