import styled from "styled-components";
import Bear from "../../assets/img/CharacterHeadOnly/Bear.svg";
import Cow from "../../assets/img/CharacterHeadOnly/Cow.svg";
import Fox from "../../assets/img/CharacterHeadOnly/Fox.svg";
import Hippo from "../../assets/img/CharacterHeadOnly/Hippo.svg";
import Lion from "../../assets/img/CharacterHeadOnly/Lion.svg";
import Monkey from "../../assets/img/CharacterHeadOnly/Monkey.svg";
import Panda from "../../assets/img/CharacterHeadOnly/Panda.svg";
import Pig from "../../assets/img/CharacterHeadOnly/Pig.svg";
import Rabbit from "../../assets/img/CharacterHeadOnly/Rabbit.svg";
import Sloth from "../../assets/img/CharacterHeadOnly/Sloth.svg";
import Unicorn from "../../assets/img/CharacterHeadOnly/Unicorn.svg";
import Zebra from "../../assets/img/CharacterHeadOnly/Zebra.svg";

type ZbtiProps = {
  userZbti: string;
  width?: string;
  className?: string;
};

function Zbti(props: ZbtiProps) {
  console.log(props.userZbti);

  return (
    <Wrapper className={props.className}>
      {props.userZbti === "Bear" && (
        <img src={Bear} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Cow" && (
        <img src={Cow} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Fox" && (
        <img src={Fox} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Hippo" && (
        <img src={Hippo} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Lion" && (
        <img src={Lion} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Monkey" && (
        <img src={Monkey} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Panda" && (
        <img src={Panda} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Pig" && (
        <img src={Pig} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Rabbit" && (
        <img src={Rabbit} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Sloth" && (
        <img src={Sloth} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Sloth" && (
        <img src={Sloth} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Unicorn" && (
        <img src={Unicorn} style={{ width: props.width }} alt="img" />
      )}
      {props.userZbti === "Zebra" && (
        <img src={Zebra} style={{ width: props.width }} alt="img" />
      )}
    </Wrapper>
  );
}

export default Zbti;

const Wrapper = styled.div`
  img {
    width: 70px;
  }
`;
