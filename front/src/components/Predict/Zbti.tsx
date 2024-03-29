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
};

function Zbti(props: ZbtiProps) {

     return (
            <Wrapper>
                {props.userZbti === "Bear" && (
                <img src={Bear}/> )}
                {props.userZbti === "Cow" && (
                <img src={Cow}/> )}
                {props.userZbti === "Fox" && (
                <img src={Fox}/> )}
                {props.userZbti === "Hippo" && (
                <img src={Hippo}/> )}
                {props.userZbti === "Lion" && (
                <img src={Lion}/> )}
                {props.userZbti === "Monkey" && (
                <img src={Monkey}/> )}
                {props.userZbti === "Panda" && (
                <img src={Panda}/> )}
                {props.userZbti === "Pig" && (
                <img src={Pig}/> )}
                {props.userZbti === "Rabbit" && (
                <img src={Rabbit}/> )}
                {props.userZbti === "Sloth" && (
                <img src={Sloth}/> )}
                {props.userZbti === "Unicorn" && (
                <img src={Unicorn}/> )}
                {props.userZbti === "Zebra" && (
                <img src={Zebra}/> )}
            </Wrapper>
        );
}

export default Zbti;

const Wrapper = styled.div`
img{
    width: 70px;
}
`;
