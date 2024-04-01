import styled from "styled-components";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { deletePdNoState } from "../../Store/PredictState";
import { deletePredict } from "../../apis/api/Predict";

interface DeleteProps {
    isModalOpen: boolean;
    closeModal: () => void;
    pdNo: number;
    pdResult: boolean;
}

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

function DeleteModal({ isModalOpen, closeModal, pdNo, pdResult }: DeleteProps) {
    const [deletePdNo, setDeletePdNo] = useRecoilState(deletePdNoState);
    const handleDelete = () => {
        deletePredict(pdNo).then(() => {
            setDeletePdNo(pdNo);
        });
        closeModal();
    };

    return (
        <StyledModal open={isModalOpen} onClose={closeModal}>
            <Container>
                {pdResult ? (
                    <>
                        <Content>
                            삭제해도 예측률은 변화되지 않습니다.
                            <b />
                            삭제하시겠습니까?
                        </Content>
                    </>
                ) : (
                    <>
                        <Content>
                            삭제 시 예측 실패로 처리됩니다.
                            <b />
                            삭제하시겠습니까?
                        </Content>
                    </>
                )}
                <Btn>
                    <DeleteBtn onClick={handleDelete}>삭제하기</DeleteBtn>
                    <CancleBtn onClick={closeModal}>취소</CancleBtn>
                </Btn>
            </Container>
        </StyledModal>
    );
}

export default DeleteModal;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 350px;
    height: 200px;
    border: none;
    background-color: white;
    border-radius: 30px;
`;

const Btn = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const DeleteBtn = styled.button`
    border: none;
    padding: 10px 5px;
    margin: 10px;
    border-radius: 20px;
    width: 120px;
    height: 40px;
    &:hover {
        background-color: red;
        color: white;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
`;
const CancleBtn = styled.button`
    border: none;
    padding: 10px 5px;
    margin: 10px;
    border-radius: 20px;
    width: 120px;
    height: 40px;
    &:hover {
        background-color: black;
        color: white;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
`;
