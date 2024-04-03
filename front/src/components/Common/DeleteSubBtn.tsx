import styled from "styled-components";
import { deleteMySubscribe } from "../../apis/api/MyPage";

interface Subscription {
  subscribeNo: number;
  subscribeName: string;
  subscribeTemperature: number;
}

interface SubscriptionProps {
  text: String;
  onSubscribe: Subscription;
  onDelete: () => void;
}

function DeleteSubBtn({ text, onSubscribe, onDelete }: SubscriptionProps) {
  const deleteSubscription = (subscribeNo: number) => {
    const isConfirmed = window.confirm("구독을 취소하시겠습니까?");
    if (!isConfirmed) {
      return;
    }
    try {
      deleteMySubscribe(subscribeNo);
      onDelete();
    } catch (error) {
      console.log("deleteSubscription error : " + error);
    }
  };

  return (
    <Wrapper>
      <Button onClick={() => deleteSubscription(onSubscribe.subscribeNo)}>
        {text}
      </Button>
    </Wrapper>
  );
}

export default DeleteSubBtn;

const Wrapper = styled.div``;

const Button = styled.button`
  width: 90px;
  border-radius: 10px;
  cursor: pointer;
  padding: 7px 0;
  border: 1px solid gray;
  font-weight: bold;
  margin-bottom: 30px;

  //스타일 바로 추가
  border: none;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: black;
    color: white;
    scale: 1.1;
  }
`;
