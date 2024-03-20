import { useEffect, useState } from "react";
import styled from "styled-components";

function MyPredictList() {

  const [myPredict, setMyPredict] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <Wrapper>
      <Predicctlist>
        {/* {myPredict.map((data, index) => {
          return (
            <div key={index}>
              {data}
            </div>
          );
        })} */}
        <div> 삼성전자 </div>
        <div> 76500 </div>
        <div> 2024-03-20(수) </div>
        <div> 쓰레기통 </div>
      </Predicctlist>
    </Wrapper>
  )
}

export default MyPredictList;

const Wrapper = styled.div`
  margin: 20px;
`;

const Predicctlist = styled.div`
    display: flex;
    justify-content: space-between;
`;
