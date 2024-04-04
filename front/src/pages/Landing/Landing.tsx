import styled from "styled-components";
import CharacterCursor from "../../components/Character/CharacterCursor";
import Intro from "../../components/Landing/Intro";

function Landing() {
  return (
    <div>
      {" "}
      <CharacterCursor
        name="Bear"
        characterScale={0.5}
        action="turn"
        canvasHeight={80}
        canvasWidth={50}
      />
      <Intro />
    </div>
  );
}

export default Landing;
