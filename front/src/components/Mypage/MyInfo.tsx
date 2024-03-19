import { useEffect, useState } from "react";
import styled from "styled-components";

function MyInfo() {

  const [myInfo, setMyInfo] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <Wrapper>
      <LeftsideQuestion>
        <div>총 예측 횟수</div>
        <div>예측 성공 횟수</div>
        <div>예측률</div>
        <div>구독</div>
        <div>구독자</div>
      </LeftsideQuestion>
      <RightSideAnswer>
        {myInfo.map((info, index) => {
          return (
            <div key={index}>
              {info}
            </div>
          );
        })}
      </RightSideAnswer>
    </Wrapper>
  )
}

export default MyInfo;

const Wrapper = styled.div`
  margin: 0 auto;
`;

const LeftsideQuestion = styled.div`
  float: left,
  width: 50%;
  margin: 30px 70px;
  text-align: left;
`;

const RightSideAnswer = styled.div`
  float: right,
  width: 50%;
  margin: 30px 70px;
  text-align: right;
`;