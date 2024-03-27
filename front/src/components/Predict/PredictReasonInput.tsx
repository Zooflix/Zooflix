import styled from "styled-components";

type InputProps = {
  onReasonChange: (value: string) => void;
}

function PredictReasonInput(props: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    props.onReasonChange(e.target.value);
  }
  return (
    <Wrapper>
      <label className="small-title">근거</label>
      <textarea
      placeholder="근거를 입력하세요." 
      onChange={handleChange}
      maxLength={255}
      />
    </Wrapper>
  );
}

export default PredictReasonInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 10px;

  textarea {
    width: 45vw;
    height: 10vw;
    border: none;
    resize: none;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 30px;
    margin-right: 30px;
  }

  .small-title {
    width: 70px;
    font-weight: bold;
    padding: 10px 30px;
  }
`;
