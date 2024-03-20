import styled from "styled-components";

function PredictReasonInput() {
  return (
    <Wrapper>
      <label className="small-title">근거</label>
      <textarea />
    </Wrapper>
  );
}

export default PredictReasonInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 10px;

  textarea {
    width: 650px;
    height: 200px;
    border: none;
    resize: none;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding-left: 30px;
  }

  .small-title {
    font-weight: bold;
    padding: 5px 30px;
  }
`;
