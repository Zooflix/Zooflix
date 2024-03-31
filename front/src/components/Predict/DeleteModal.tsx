import styled from "styled-components";
import Modal from "@mui/material/Modal";
import { useState } from "react";

interface DeleteProps {
  isModalOpen: boolean;
  closeModal: () => void;
  pdNo: number;
}

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function DeleteModal({ isModalOpen, closeModal }: DeleteProps) {
  return (
    <StyledModal open={isModalOpen} onClose={closeModal}>
      <Container>
        <h4>삭제 시 예측 실패로 처리됩니다.</h4>
        <h4>글을 삭제하시겠습니까?</h4>
        <Check>삭제하기</Check>
        <Check>취소</Check>
      </Container>
    </StyledModal>
  );
}

export default DeleteModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  border: none;
  background-color: white;
  border-radius: 30px;
  h4 {
    text-align: center;
    margin: 20px 0 0 0;
  }
`;

const Check = styled.button`
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
