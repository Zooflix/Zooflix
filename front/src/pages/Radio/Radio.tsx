import styled from "styled-components";

// 이미지
import Playicon from "../../assets/img/button/Play.svg"
import Pauseicon from "../../assets/img/button/Pause.svg"

// 컴포넌트 
import Title from "../../components/Common/Title";
import PlayButton from "../../components/Radio/PlayBtn";
import SquareBtn from "../../components/Common/SquareBtn";



const buttonStyleDark = {
  backgroundColor: "#1E3659",
  color: "white",
  border: "none",
}

function Radio(): JSX.Element {
  return (
    <Wrapper>
      <Title text="해외 뉴스를 들려줄게요"/>
        <PlayContainer>
          <PlayButton img={Playicon}/>
          <PlayButton img={Pauseicon}/>
        </PlayContainer>
      <SquareBtn text="자막 보기" style={buttonStyleDark}/>
    </Wrapper>
  )
}

export default Radio;

const Wrapper = styled.div``
const PlayContainer = styled.div`
  display: flex;
  flex-direction: row;
`
