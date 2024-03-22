import styled from "styled-components";

function PredictReasonInput() {
  return (
    <Wrapper>
      <label className="small-title">근거</label>
      <textarea placeholder="근거를 입력하세요."/>
    </Wrapper>
  );
}

export default PredictReasonInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 10px;

  textarea {
    width: 700px;
    height: 200px;
    border: none;
    resize: none;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding-left: 30px;
    padding-top: 10px;
    margin-right: 30px;
  }

  .small-title {
    width: 70px;
    font-weight: bold;
    padding: 10px 30px;
  }
`;
