import styled from "styled-components";

type SquareBtnProps = {
  text: string;
  style?: React.CSSProperties;
};

function SquareBtn(props: SquareBtnProps): JSX.Element {
  return (
    <Button style={props.style}>{props.text}</Button>
  );
};

export default SquareBtn;

const Button = styled.button`
  width: 90px;
  border-radius: 5px;
  cursor: pointer;
  padding: 7px 0;
  border: 1px solid gray;
  font-weight: bold;
`;