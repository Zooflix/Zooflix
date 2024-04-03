import styled from "styled-components";
import { subscribeUser } from "../../apis/api/MyPage";

interface SubscribeButtonProps {
  userNo: number; // 유저 번호
  subscribeNo: number; // 구독할 유저의 번호
  onSubscribe: () => void;
}

function SubscribeButton({
  userNo,
  subscribeNo,
  onSubscribe,
}: SubscribeButtonProps) {
  function handleClickToSubscribe() {
    subscribeUser(userNo, subscribeNo);
    onSubscribe();
    alert("구독이 완료되었습니다.");
  }

  return (
    <Wrapper>
      <GoToUpdateUser onClick={() => handleClickToSubscribe()}>
        구독
      </GoToUpdateUser>
    </Wrapper>
  );
}

export default SubscribeButton;

const Wrapper = styled.div``;

const GoToUpdateUser = styled.button`
  background-color: #f84646;
  width: 90px;
  border-radius: 10px;
  cursor: pointer;
  padding: 7px 0;
  border: none;
  color: white;
  margin-bottom: 30px;
  &:hover {
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    color: #f84646;
    font-weight: bold;
    scale: 1.1;
  }
  cursor: pointer;
`;
