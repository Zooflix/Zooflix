import styled from "styled-components";

type SquareBtnProps = {
  text: string;
  style?: React.CSSProperties;
};

function SquareBtn(props: SquareBtnProps): JSX.Element {
  return <Button style={props.style}>{props.text}</Button>;
}

export default SquareBtn;

const Button = styled.button`
  width: 90px;
  border-radius: 10px;
  cursor: pointer;
  padding: 7px 0;
  border: 1px solid gray;
  font-weight: bold;
  margin-top: 30px;

  //스타일 바로 추가
  border: none;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: black;
    color: white;
  }
`;
