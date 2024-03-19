import styled from "styled-components";

type BarIconProps = {
  img: string;
  text: string;
};

function BarIcon(props: BarIconProps) {
  return (
    <div>
      <IconImg src={props.img} />
      <Text>{props.text}</Text>
    </div>
  );
}

export default BarIcon;

const IconImg = styled.img``;

const Text = styled.div`
  text-decoration: none;
  color: white;
  margin-top: 2px;
  font-size: 12px;
`;
