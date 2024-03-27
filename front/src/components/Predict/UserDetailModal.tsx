import styled from "styled-components";
import Modal from "@mui/material/Modal";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  userName: string;
}

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;

function UserDetailModal({ userName, isModalOpen, closeModal }: ModalProps) {
  console.log(userName);
  return (
    <StyledModal open={isModalOpen} onClose={closeModal}>
      <Container>
        <h2>{userName}님의 예측정보입니다.</h2>
      </Container>
    </StyledModal>
  );
}

export default UserDetailModal;

const Container = styled.div`
  width: 600px;
  height: 500px;
  background-color: white;
  border: none;
  border-radius: 30px;
`;
