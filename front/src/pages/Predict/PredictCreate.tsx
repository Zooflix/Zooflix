import styled from "styled-components";

// 컴포넌트
import Title from "../../components/Common/Title";
import PredictCreateForm from "../../components/Predict/PredictCreateForm";

function PredictCreate() {
  return (
    <Wrapper>
      <Title text="나도 예측하기" />
      <PredictCreateForm />
    </Wrapper>
  );
}

export default PredictCreate;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
