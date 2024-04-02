import styled from "styled-components";
import { deleteMySubscribe } from "../../apis/api/MyPage";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState } from "react";

interface Subscription {
  subscribeNo: number;
  subscribeName: string;
  subscribeTemperature: number;
}

interface SubscriptionProps {
  text: String;
  onSubscribe: Subscription;
  onDelete: (subscribeNo: number) => void;
}

function DeleteSubButton({ text, onSubscribe, onDelete }: SubscriptionProps) {
  const [open, setOpen] = useState(false);

  const [alertOption, setAlertOption] = useState<{
    severity: AlertColor;
    value: string;
  }>({ severity: "error", value: "" });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteSubscription = (subscribeNo: number) => {
    const isConfirmed = window.confirm("구독을 취소하시겠습니까?");

    if (!isConfirmed) {
      return;
    }
    try {
      deleteMySubscribe(subscribeNo);
      onDelete(subscribeNo);
      setAlertOption({ severity: "success", value: "구독이 취소되었습니다." });
      setOpen(true);
    } catch (error) {
      console.log("deleteSubscription error : " + error);
    }
  };

  return (
    <Wrapper>
      <div>{onSubscribe.subscribeName}</div>
      <Temp>{onSubscribe.subscribeTemperature}°C</Temp>
      <Button onClick={() => deleteSubscription(onSubscribe.subscribeNo)}>
        {text}
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={alertOption.severity} onClose={handleClose}>
          {alertOption.value}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
}

export default DeleteSubButton;

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  div {
    margin: 0 10px;
    font-weight: bold;
  }
`;

const Button = styled.button`
  margin-left: 10px;
  border: none;
  background-color: #e7f1f5;
  border-radius: 15px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Temp = styled.div`
  color: #0099e8;
  font-weight: bold;
`;
