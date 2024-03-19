import styled from "styled-components";
import { NavLink } from "react-router-dom";

import BarIcon from "./BarIcon";

import zlogo from "../../assets/img/z-logo.svg";
import Home from "../../assets/img/SidebarIcon/Home.svg";
import Stock from "../../assets/img/SidebarIcon/Stock.svg";
import Mypage from "../../assets/img/SidebarIcon/Mypage.svg";
import Predict from "../../assets/img/SidebarIcon/Predict.svg";
import Radio from "../../assets/img/SidebarIcon/Radio.svg";

function SideNavBar() {
  const menus = [
    { name: "홈", path: "/main", icon: Home },
    { name: "주식", path: "/main", icon: Stock },
    { name: "예측", path: "/main", icon: Mypage },
    { name: "마이", path: "/main", icon: Predict },
    { name: "라디오", path: "/radio", icon: Radio },
  ];

  return (
    <Side>
      <img src={zlogo} alt="zlogo" className="logo" />
      <br />
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              to={menu.path}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <IconContainer>
                <BarIcon img={menu.icon} text={menu.name} />
              </IconContainer>
            </NavLink>
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
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(45deg, #fff, #09244a);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  width: 100px;
`;

const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 13px;
`;
