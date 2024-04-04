import styled from "styled-components";
import Modal from "@mui/material/Modal";
import { report } from "../../apis/api/Report";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState } from "react";

interface ReportProps {
  isModalOpen: boolean;
  closeModal: () => void;
  pdNo: number;
  userNo: number;
}

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ReportModal({ isModalOpen, closeModal, pdNo, userNo }: ReportProps) {
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

  const handleReport = async (reason: string) => {
    try {
      console.log(userNo, pdNo, reason);
      await report(userNo, pdNo, reason);
      closeModal();
      setAlertOption({ severity: "success", value: "신고가 완료되었습니다." });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <StyledModal open={isModalOpen} onClose={closeModal}>
      <Container>
        <h3>신고 이유를 선택해주세요</h3>
        <Reason onClick={() => handleReport("SPAM")}>스팸</Reason>
        <Reason onClick={() => handleReport("ADS")}>광고</Reason>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={alertOption?.severity}>{alertOption?.value}</Alert>
        </Snackbar>
      </Container>
    </StyledModal>
  );
}

export default ReportModal;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  border: none;
  background-color: white;
  border-radius: 30px;
  h3 {
    text-align: center;
    margin: 20px 0 10px 0;
  }
`;
const Reason = styled.button`
  border: none;
  padding: 10px 5px;
  margin: 10px;
  border-radius: 30px;
  &:hover {
    background-color: black;
    color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
`;
