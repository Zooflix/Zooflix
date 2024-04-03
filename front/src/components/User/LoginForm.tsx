import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/api/User";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userIdState, userZbti } from "../../Store/UserState";
import UserBack from "./UserBack";
import BackBtn from "../Common/BackBtn";
import { getJwtUserZbti } from "../../apis/utils/jwt";

function LoginForm() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useRecoilState(userIdState);
  const [zbti, setZbti] = useRecoilState(userZbti);

  // const [access, setAccess] = useState(localStorage.getItem("access") || "");

  const handleSignupClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    // const storedAccess = localStorage.getItem("access");
    // setAccess(storedAccess || "");
  }, []);

  const handleLogin = async () => {
    try {
      const result = await loginUser(id, password);
      if (result == 200) {
        setUserId(id);
        navigate("/main");
        setZbti(getJwtUserZbti());
      } else {
        alert("아이디나 비밀번호를 확인해주세요.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LoginWrapper>
      <UserBack />

      <Container>
        <h2>LOG IN</h2>
        <InputContainer>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <button onClick={handleLogin}>로그인 하기</button>
        <GoToRegister onClick={handleSignupClick}>
          아직 회원이 아니신가요?
        </GoToRegister>
      </Container>
    </LoginWrapper>
  );
}

export default LoginForm;

const LoginWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Container = styled.div`
  .backbtn {
    top: 10px;
    left: 10px;
  }
  input {
    height: 50px;
    width: 380px;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    border-radius: 20px;
    margin: 10px 0;
    font-family: "NanumSquareRound";
    font-weight: bold;
    padding: 0 20px;
    color: #091034;

    ::placeholder {
      color: #091034;
    }
  }

  button {
    background: #2a4263;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 15px 40px 15px 40px;
    font-weight: bold;
    margin: 10px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  padding: 300px;
  height: 100vh;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
`;

const GoToRegister = styled.div`
  padding-top: 10px;
  &:hover {
    color: #fff;
  }
`;
