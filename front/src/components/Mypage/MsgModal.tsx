import Modal from "@mui/material/Modal";
import styled from "styled-components";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MsgModal({ isModalOpen, closeModal }: ModalProps) {
  return (
    <StyledModal open={isModalOpen} onClose={closeModal}>
      <Container>
        <div>현재 ZBTI 테스트를 진행하지 않았습니다.</div>
        <div>테스트 이후에 포트폴리오 확인할 수 있습니다.</div>
      </Container>
    </StyledModal>
  );
}

export default MsgModal;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 310px;
  height: 100px;
  border: none;
  background-color: white;
  border-radius: 30px;
  justify-content: center;
  padding: 20px;
  div {
    text-align: center;
  }
`;
