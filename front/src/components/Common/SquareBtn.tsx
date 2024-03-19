import styled from "styled-components";

type SquareBtnProps = {
  text: string;
  style: React.CSSProperties;
};

function SquareBtn(props: SquareBtnProps): JSX.Element {
  return (
    <Content style={props.style}>{props.text}</Content>
  );
};

export default SquareBtn;

const Content = styled.button`
  width: 90px;
  border-radius: 5px;
  cursor: pointer;
  padding: 7px 0;
  border: none;
  font-weight: bold;
`;