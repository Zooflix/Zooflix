import styled from "styled-components";
import LoginForm from "../../components/User/LoginForm";

function Login() {
  return (
    <LoginWrapper>
      <LoginForm />
    </LoginWrapper>
  );
}

export default Login;

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
