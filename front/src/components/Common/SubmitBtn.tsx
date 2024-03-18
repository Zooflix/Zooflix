import styled from "styled-components";

type SubmitBtnProps = {
  text: string;
};

function SubmitBtn(props: SubmitBtnProps) {
  return <Button>{props.text}</Button>;
}

export default SubmitBtn;

const Button = styled.button`
  background: #2a4263;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 30px 10px 30px;
  font-weight: bold;
  margin: 10px;
`;
