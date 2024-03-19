import styled from "styled-components";

type PlayButtonProps = {
  img: string;
  // onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

function PlayButton(props: PlayButtonProps) {
  return (
      <div>
        <ButtonImg src={props.img}/> {/* onClick 이벤트 작성 필요 */}
      </div>
  );
}

export default PlayButton   ;

const ButtonImg = styled.img`
  width: 50px;
  height: 30px;
  margin: 5px 0 20px;
  cursor: pointer;
`;