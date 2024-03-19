import styled from "styled-components";
import { Link } from "react-router-dom";
import Backbtn from "../../assets/img/button/Backbtn.svg";

function BackBtn(props: { link: string }) {
  return (
    <Wrapper>
      <Link to={props.link}>
        <img src={Backbtn} alt="뒤로가기" />
      </Link>
    </Wrapper>
  );
}

export default BackBtn;

const Wrapper = styled.div`
  img {
    width: 25px;
  }
`;
