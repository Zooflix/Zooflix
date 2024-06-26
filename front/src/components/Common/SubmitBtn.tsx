import styled from "styled-components";

type SubmitBtnProps = {
  text: string;
  onClick?: () => void;
};



function SubmitBtn(props: SubmitBtnProps) {
  return <Button onClick={props.onClick}>{props.text}</Button>;
}

export default SubmitBtn;

const Button = styled.button`
  background: #2a4263;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 15px 40px 15px 40px;
  font-weight: bold;
  margin: 10px;
`;
