import styled from "styled-components";

import SubscribeForm from "../../components/SubscribeStock/SubscribeForm";
import MySubscribeStock from "../../components/SubscribeStock/MySubscribeStock";
import { getJwtUserName } from "../../apis/utils/jwt";
import CommonPageTransition from "../../components/Common/CommonPageTransition";
import { loginCheck } from "../../components/User/IsLoginCheck";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertColor, Snackbar } from "@mui/material";

function SubscribeStock() {
  const [name, setName] = useState("");
  const [changeData, setChangeData] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [alertOption, setAlertOption] = useState<{
    severity: AlertColor;
    value: string;
  }>({ severity: "error", value: "" });
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginCheck()) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/login");
    } else {
      setName(getJwtUserName());
    }
  }, []);

  return (
    <CommonPageTransition>
      <Wrapper>
        <SubscribeContainer>
          <Title>주식 정기 구독하기</Title>
          <SubscribeForm setFetchData={setChangeData} fetchData={changeData} />
        </SubscribeContainer>
        <SubscribeContainer>
          <Title>{name}님이 구독중인 주식 목록</Title>
          <MySubscribeStock
            fetchData={changeData}
            setFetchData={setChangeData}
          />
        </SubscribeContainer>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={alertOption?.severity}>{alertOption?.value}</Alert>
        </Snackbar>
      </Wrapper>
    </CommonPageTransition>
  );
}

export default SubscribeStock;

const Wrapper = styled.div`
  margin-left: 6vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SubscribeContainer = styled.div`
  width: 1000px;
  margin-bottom: 30px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
`;
