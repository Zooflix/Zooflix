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
  width: 2.1rem;
  height: 2.1rem;
  margin: 0.7rem;
  cursor: pointer;
`;