import styled from "styled-components";

type BarIconProps = {
  img: string;
  text: string;
};

function BarIcon(props: BarIconProps) {
  return (
    <MenuWrapper>
      <IconImg src={props.img} />
      <Text>{props.text}</Text>
    </MenuWrapper>
  );
}

export default BarIcon;

const MenuWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const IconImg = styled.img``;

const Text = styled.div`
  text-decoration: none;
  color: white;
  margin-top: 2px;
  font-size: 10px;
`;
