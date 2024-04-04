import styled from "styled-components";

type TitleProps = {
  text: string;
};

function Title(props: TitleProps): JSX.Element {
  return (
    <Content>{props.text}</Content>
  );
};

export default Title;

const Content = styled.h3``;

