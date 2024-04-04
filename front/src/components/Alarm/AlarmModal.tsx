import Modal from "@mui/material/Modal";
import styled from "styled-components";
import alarmbtn from "../../assets/img/button/Alarmbtn.svg";
import AlarmList from "./AlarmList";
import { RemoveAlarm } from "../../apis/api/Alarm";

interface AlarmModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 240px;
  margin-bottom: 280px;
`;

function AlarmModal({ isModalOpen, closeModal }: AlarmModalProps) {
  const handleRemoveAlarm = async () => {
    try {
      await RemoveAlarm();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledModal open={isModalOpen} onClose={closeModal}>
      <Container>
        <TitleContainer>
          <img src={alarmbtn} alt="alarmbtn" />
          <h2>알림창</h2>
        </TitleContainer>
        <BtnContainer>
          <RemoveBtn onClick={handleRemoveAlarm}>알림 비우기</RemoveBtn>
        </BtnContainer>
        <AlarmList />
      </Container>
    </StyledModal>
  );
}

export default AlarmModal;

const Container = styled.div`
  width: 500px;
  height: 500px;
  background-color: #2a4263;
  border-radius: 20px;
  border: none;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  h2 {
    color: #fdd842;
  }
  img {
    width: 20px;
    margin: 0 10px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
`;

const RemoveBtn = styled.button`
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  background-color: white;
  font-weight: bold;
  &:hover {
    background-color: #fdd842;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    color: #fff;
    font-weight: bold;
  }
`;
