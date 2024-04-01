import styled from "styled-components";

// 컴포넌트
import Title from "../../components/Common/Title";
import PredictCreateForm from "../../components/Predict/PredictCreateForm";
import CommonPageTransition from "../../components/Common/CommonPageTransition";

function PredictCreate() {
  return (
    <CommonPageTransition>
      <Wrapper>
        <Title text="나도 예측하기" />
        <PredictCreateForm />
      </Wrapper>
    </CommonPageTransition>
  );
}

export default PredictCreate;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 200px;
  padding-bottom: 50px;
`;
