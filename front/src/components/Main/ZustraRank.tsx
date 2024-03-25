import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import Character3d from "../Character/Character3d";
import styled from "styled-components";
import first from "../../assets/img/rank/first.svg";
import second from "../../assets/img/rank/second.svg";
import third from "../../assets/img/rank/third.svg";

interface InnerGraphProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color: string;
  width: number;
}

interface Props {
  rankData: any[];
}

function ZustraRank({ rankData }: Props) {
  const rankArr = [first, second, third];
  const color = [
    "linear-gradient(90deg, rgba(255, 124, 124, 0.95) 0%, rgba(255, 161, 108, 0.95) 36%, rgba(255, 172, 74, 0.95) 54.5%, rgba(255, 190, 89, 0.95) 69.5%, rgba(255, 225, 120, 0.95) 100%)",
    "linear-gradient(90deg, rgba(104, 183, 255, 0.95) 0%, rgba(128, 194, 255, 0.95) 36%, rgba(164, 211, 255, 0.95) 54.5%, rgba(185, 222, 255, 0.95) 69.5%, rgba(228, 242, 255, 0.95) 100%)",
    "linear-gradient(90deg, rgba(251, 77, 161, 0.95) 0%, rgba(255, 113, 182, 0.95) 35%, rgba(255, 165, 209, 0.95) 54.5%, rgba(255, 184, 218, 0.95) 68.5%, rgba(255, 217, 235, 0.95) 100%)",
  ];
  let zbti = new Map();
  zbti.set("Lion", "일단 다 사자");
  zbti.set("Monkey", "재간둥이 원숭이");
  zbti.set("Pig", "저금왕 돼지");
  zbti.set("Rabbit", "팔랑귀 토끼");

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {});

  function moreBtnClick(index: number) {
    if (expandedIndex === index) {
      setExpandedIndex(null); // 이미 확장된 경우 접기
    } else {
      setExpandedIndex(index); // 그 외의 경우 확장
    }
  }

  return (
    <RankWrapper>
      <RankHeader>주스트라다무스 랭킹</RankHeader>
      {rankData ? (
        <RankDiv>
          {rankData.map((item, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <UserDiv key={index} expanded={isExpanded}>
                <img src={rankArr[index]} height="50px" />
                {index === 0 ? (
                  <Character3d
                    name={item.userZbti}
                    characterScale={0.35}
                    canvasWidth={80}
                    canvasHeight={100}
                  />
                ) : (
                  <Character3d
                    name={item.userZbti}
                    characterScale={0.35}
                    canvasWidth={80}
                    canvasHeight={100}
                    action="turn"
                  />
                )}

                <Margin>
                  <div>
                    <Name>{item.userName}</Name>
                    <SmallText>
                      {Math.round(
                        (item.successCount / item.predictCount) * 100
                      )}
                      % 예측 성공률
                    </SmallText>
                  </div>
                  <Zbti>{zbti.get(item.userZbti)} 유형</Zbti>
                </Margin>
                <Graph>
                  <InnerGraph
                    color={color[index]}
                    width={item.userTemperature * 4}
                  >
                    {item.userTemperature} °C
                  </InnerGraph>
                </Graph>
                {!isExpanded ? (
                  <Button onClick={() => moreBtnClick(index)}>더보기</Button>
                ) : (
                  <Button onClick={() => moreBtnClick(index)}>접기</Button>
                )}
              </UserDiv>
            );
          })}
        </RankDiv>
      ) : (
        <div>Loading...</div>
      )}
    </RankWrapper>
  );
}

export default ZustraRank;

const RankWrapper = styled.div`
  margin-left: 6vw;
  padding: 10px;
  width: 65%;
`;

const RankHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
`;

const RankDiv = styled.div`
  background: #ffffff;
  border: 1px solid rgba(109, 125, 147, 0.15);
  box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 10px;
`;

const UserDiv = styled.div<{ expanded: boolean }>`
  border: 1px solid rgba(109, 125, 147, 0.15);
  box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  margin: 10px;
  padding: 20px 15px;
  display: flex;
  align-items: center;
  position: relative; /* UserDiv 내부의 Button 위치 조정을 위해 필요 */
  img {
    margin-right: 10px;
  }
  ${(props) =>
    props.expanded && "height: 200px;"}/* 확장된 경우 UserDiv의 높이 조정 */
`;

const Name = styled.span`
  margin: 2px;
  font-weight: bold;
`;

const SmallText = styled.span`
  margin: 2px;
  font-weight: semi-bold;
  font-size: 10px;
  color: gray;
`;

const Zbti = styled.div`
  margin: 2px;
  font-weight: bold;
  font-size: 12px;
  color: gray;
  margin-top: 5px;
`;

const Graph = styled.div`
  width: 400px;
  height: 30px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  margin-left: 50px;
`;

const InnerGraph = styled.div<InnerGraphProps>`
  height: 100%;
  border-radius: 50px;
  background: ${(props) => props.color};
  color: gray;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 0 20px;
  width: ${(props) =>
    props.width}px; // item.userTemperature * 4를 픽셀 단위로 설정
`;

const Margin = styled.div`
  margin-left: 20px;
`;

const Button = styled.div`
  margin-left: 30px;
  font-size: 12px;
  color: gray;
  cursor: pointer;
`;
