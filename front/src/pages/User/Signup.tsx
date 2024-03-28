import styled from "styled-components";
import BackBtn from "../../components/Common/BackBtn";
import SignupForm from "../../components/User/SignupForm";

function Signup() {
  return (
    <SignupWrapper>
      <BackBtn link="/main" />
      <SignupForm />;
    </SignupWrapper>
  );
}

export default Signup;

const SignupWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
