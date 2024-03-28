import styled from "styled-components";
import Modal from "@mui/material/Modal";
import SquareBtn from "../Common/SquareBtn";
import { useRecoilState } from "recoil";
import { selectUserNoState } from "../../Store/PredictState";
import { Link, useNavigate } from "react-router-dom";

interface ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    userName: string;
}

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

function UserDetailModal({ userName, isModalOpen, closeModal }: ModalProps) {
    const navigate = useNavigate();

    const navToUserPage = async() => {
        navigate('/user-page');
    };

    return (
        <StyledModal open={isModalOpen} onClose={closeModal}>
            <Container>
                <span>
                    <span className="user-name">{userName}</span>님의
                    예측정보입니다.
                </span>
                <ButtonContainer className="btn-container">
                    <SubscribeButton type="button">구독하기</SubscribeButton>
                    <SquareBtn 
                        text="글 보러가기" 
                        onClick={navToUserPage}
                    />
                </ButtonContainer>
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
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    span {
        font-weight: bold;
        font-size: 23px;
    }
    .user-name {
        color: orange;
    }
`;

const ButtonContainer = styled.div`
    button {
        margin: 20px;
    }
`;
const SubscribeButton = styled.button`
    background-color: #f84646;
    width: 90px;
    border-radius: 10px;
    cursor: pointer;
    padding: 7px 0;
    border: none;
    color: white;
    &:hover {
        background-color: white;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
        color: #f84646;
        font-weight: bold;
    }
`;
