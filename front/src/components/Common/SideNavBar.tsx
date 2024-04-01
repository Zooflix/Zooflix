import styled from "styled-components";
import { NavLink } from "react-router-dom";

import BarIcon from "./BarIcon";

import zlogo from "../../assets/img/z-logo.svg";
import Home from "../../assets/img/SidebarIcon/Home.svg";
import Stock from "../../assets/img/SidebarIcon/Stock.svg";
import Mypage from "../../assets/img/SidebarIcon/Mypage.svg";
import Predict from "../../assets/img/SidebarIcon/Predict.svg";
import Radio from "../../assets/img/SidebarIcon/Radio.svg";


// 스타일
const activeStyle = {
  backgroundColor: "rgba(255,255,255,0.3)",
  borderRadius: "50%",
  textDecoration: "none",
  width: "55px",
  height: "55px",
  
}
const nonActiveStyle = {
  textDecoration: "none",
}


function SideNavBar() {
  const menus = [
    { name: "홈", path: "/main", icon: Home },
    { name: "주식", path: "/stocksub", icon: Stock },
    { name: "예측", path: "/predict", icon: Mypage },
    { name: "마이", path: "/my-page", icon: Predict },
    { name: "라디오", path: "/radio", icon: Radio },
  ];

  return (
    <Side>
      <img src={zlogo} alt="zlogo" className="logo" />
      <br />
      <Menu>
        {menus.map((menu, index) => {
          return (
            <IconContainer>
                <NavLink
                  to={menu.path}
                  key={index}
                  style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                >
                <BarIcon img={menu.icon} text={menu.name}/>
            </NavLink>
              </IconContainer>
          );
        })}
      </Menu>
    </Side>
  );
}

export default SideNavBar;

const Side = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  border-radius: 10px;
  background: linear-gradient(45deg, #fff, #09244a);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10vh;
  width: 6vw;
  min-width: 90px;
  img {
    margin-top: 10px;
  }
`;

const Menu = styled.div`
  margin-top: 25px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px;
`;
