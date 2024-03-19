import styled from "styled-components";

import Home from "../../assets/img/SidebarIcon/Home.svg";
import Stock from "../../assets/img/SidebarIcon/Stock.svg";
import Mypage from "../../assets/img/SidebarIcon/Mypage.svg";
import Predict from "../../assets/img/SidebarIcon/Predict.svg";
import Radio from "../../assets/img/SidebarIcon/Radio.svg";

function SideNavBar() {
  const menus = [
    { name: "홈", path: "/main" },
    { name: "주식", path: "/main" },
    { name: "예측", path: "/main" },
    { name: "마이", path: "/main" },
    { name: "라디오", path: "/radio" },
  ];
  return (
    <Container>
      <Side></Side>
    </Container>
  );
}

export default SideNavBar;

const Container = styled.div``;

const Side = styled.div`
  height: 100%;
  width: 100px;
  background-color: gray;
`;

const Icon = styled.div``;
