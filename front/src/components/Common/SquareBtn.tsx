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
  width: 5.5rem;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.3rem 0;
  border: none;
  font-weight: bold;
`;