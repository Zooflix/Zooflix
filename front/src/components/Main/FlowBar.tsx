import styled, { keyframes } from "styled-components";
import { ReactNode } from "react";

interface Props {
  indices?: {
    kospi: number;
    kosdaq: number;
    usd: number;
  };
}

function FlowBar({ indices }: Props) {
  return (
    <ScrollDiv>
      {indices && (
        <ScrollWrapper>
          <ScrollPrimary>
            <Text>
              코스피<Space></Space>
              <Indice> {indices.kospi}</Indice>
            </Text>
            <Text>
              코스닥<Space></Space>
              <Indice>{indices.kosdaq}</Indice>
            </Text>
            <Text>
              달러환율<Space></Space>
              <Indice>{indices.usd}</Indice>
            </Text>
            <Text>
              코스피<Space></Space>
              <Indice> {indices.kospi}</Indice>
            </Text>
            <Text>
              코스닥<Space></Space>
              <Indice>{indices.kosdaq}</Indice>
            </Text>
            <Text>
              달러환율<Space></Space>
              <Indice>{indices.usd}</Indice>
            </Text>
          </ScrollPrimary>
          <ScrollSecondary>
            <Text>
              코스피<Space></Space>
              <Indice> {indices.kospi}</Indice>
            </Text>
            <Text>
              코스닥<Space></Space>
              <Indice>{indices.kosdaq}</Indice>
            </Text>
            <Text>
              달러환율<Space></Space>
              <Indice>{indices.usd}</Indice>
            </Text>
            <Text>
              코스피<Space></Space>
              <Indice> {indices.kospi}</Indice>
            </Text>
            <Text>
              코스닥<Space></Space>
              <Indice>{indices.kosdaq}</Indice>
            </Text>
            <Text>
              달러환율<Space></Space>
              <Indice>{indices.usd}</Indice>
            </Text>
          </ScrollSecondary>
        </ScrollWrapper>
      )}
    </ScrollDiv>
  );
}

export default FlowBar;

const ScrollDiv = styled.div`
  margin-left: 7vw;
  background: #ffffff;
  padding: 10px 0;
  border: 1px solid rgba(109, 125, 147, 0.15);
  box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  width: 89vw;
  overflow: hidden;
  height: 30px;
`;

const ScrollWrapper = styled.div`
  position: relative;
  width: 90vw;
  height: 50px;
  overflow-x: hidden;
`;

const ScrollElement = styled.div`
  width: inherit;
  height: inherit;
  position: absolute;
  left: 0%;
  top: 0%;
  display: flex;
  justify-content: space-around;
  overflow-x: hidden;
`;

const primary = keyframes`
  from {
    left: 0%;
  }
  to {
    left: -100%;
  }
`;

const secondary = keyframes`
  from {
    left: 100%;
  }
  to {
    left: 0%;
  }
`;

const ScrollPrimary = styled(ScrollElement)`
  animation: ${primary} 20s linear infinite;
`;

const ScrollSecondary = styled(ScrollElement)`
  animation: ${secondary} 20s linear infinite;
`;

const Text = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #000000;
  display: flex;
  align-items: center;
`;

const Indice = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #0099e8;
`;

const Space = styled.span`
  margin: 0 5px;
`;
