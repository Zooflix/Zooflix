import styled from "styled-components";
import Modal from "@mui/material/Modal";
import SquareBtn from "../Common/SquareBtn";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SubscribeDetailModal({ isModalOpen, closeModal }: ModalProps) {
  return (
    <StyledModal open={isModalOpen} onClose={closeModal}>
      <Container>
        <h3>구독 유의사항</h3>
        <h5>
          1.구독 날짜가{" "}
          <span className="orange">
            휴장일인 경우 최초 도래하는 영업일 장 시작 시
          </span>{" "}
          에 해당 주문을 실행합니다.
        </h5>

        <h5>
          2.예상 가격은 입력 당시 시장가에 수량을 곱한 값으로 표시되며 실제
          매수가와 상이합니다.
        </h5>
        <h5>
          3. 실제 매수가는 고객이 지정한{" "}
          <span className="orange">구독일 시가</span> 로 결정됩니다.{" "}
        </h5>
        <h5>4. 정기 구독은 APP 키 발급 후 1년 간 유지됩니다.</h5>
        <h5>
          5. 본 서비스는 매도와 관련된 별도의 서비스를 제공하지 않으며 고객은
          본인의 책임하에 매수한 상품을 보유 또는 직접 매도하여야 합니다.
        </h5>
        <h5>
          6. 거래가 완료된 이후에는{" "}
          <span className="orange">취소 또는 환불이 불가</span> 합니다.
        </h5>
        <CheckboxContainer>
          <input type="checkbox" /> 주식 정기 구독 유의사항을 모두 읽고
          확인하였습니다.
        </CheckboxContainer>
        <ButtonContainer>
          <SquareBtn text="구독하기" />
        </ButtonContainer>
      </Container>
    </StyledModal>
  );
}

export default SubscribeDetailModal;

const Container = styled.div`
  width: 800px;
  height: 500px;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 30px;

  h3 {
    text-align: center;
    margin: 20px 0;
    padding-bottom: 40px;
  }

  h5 {
    margin: 20px 50px;
  }

  .orange {
    color: orange;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;