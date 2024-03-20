import styled from "styled-components";
import PredictCreateForm from "../../components/Predict/PredictCreateForm";

function PredictCreate() {
  return (
    <Wrapper>
      <h3 className="title">나도 예측하기</h3>
      <PredictCreateForm />
    </Wrapper>
  );
}

export default PredictCreate;

const Wrapper = styled.div`
  .title {
    margin-left: 300px;
    font-weight: bolder;
  }
`;
