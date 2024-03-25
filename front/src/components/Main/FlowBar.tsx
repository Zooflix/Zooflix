import styled from "styled-components";
import { useState, useEffect } from "react";

function FlowBar() {
  const [isAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const handleAnimationEnd = () => {
      setAnimationComplete(true);
    };

    const trackElement = document.querySelector(".track");
    if (trackElement) {
      trackElement.addEventListener("animationiteration", handleAnimationEnd);

      return () => {
        trackElement.removeEventListener(
          "animationiteration",
          handleAnimationEnd
        );
      };
    }
  }, []);

  return (
    <Wrapper>
      <ScrollText>
        {/* 여기 한투 api나 지수 정보 불러오기 */}
        <Track className={isAnimationComplete ? "track" : ""}>
          <p>코스피 2642.36 (-9.93)</p>
          <p>코스닥 2642.36 (-9.93)</p>
          <p>코스피 2642.36 (-9.93)</p>
          <p>코스피 2642.36 (-9.93)</p>
          <p>코스피 2642.36 (-9.93)</p>
        </Track>
      </ScrollText>
    </Wrapper>
  );
}

export default FlowBar;

const Wrapper = styled.div`
  @keyframes scroll-animation {
    0% {
      left: 0;
    }
    100% {
      left: -400px;
    }
  }
  display: flex;
  justify-content: center;
`;
const ScrollText = styled.div`
  width: 1200px;
  height: 40px;
  overflow: hidden;
  border: none;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Track = styled.div`
  display: flex;
  position: relative;
  width: 1200px;
  animation: scroll-animation 5s linear infinite;

  p {
    width: 600px;
    font-size: 14px;
  }
`;
