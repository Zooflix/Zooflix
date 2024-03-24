import Modal from "@mui/material/Modal";
import styled from "styled-components";
import alarmbtn from "../../assets/img/button/Alarmbtn.svg";
import AlarmList from "./AlarmList";

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
  return (
    <StyledModal open={isModalOpen} onClose={closeModal}>
      <Container>
        <img src={alarmbtn} alt="alarmbtn" />
        <h2>알람창</h2>
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
