import styled from "styled-components";
import { JsxElement } from "typescript";

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

