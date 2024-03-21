import styled from "styled-components";
import UserBackground from "./UserBackground";
import UserInput from "./UserInput";
import SubmitBtn from "../Common/SubmitBtn";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/api/User";
import { useState } from "react";

function LoginForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignupClick = () => {
        navigate("/signup");
    };

    const handleLogin = async () => {
        try {
            const aceessToken = await loginUser(username, password);
            console.log(aceessToken);
            localStorage.setItem("accessToken", aceessToken);
            if(aceessToken != null) {
                navigate("/main");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Wrapper>
            <UserBackground />
            <Container>
                <h2>REGISTER</h2>
                <InputContainer>
                    <input
                        type="text"
                        placeholder="아이디를 입력하세요"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
        </Wrapper>
    );
}

export default LoginForm;

const Wrapper = styled.div`
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
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 1;
    padding: 300px;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
`;

const GoToRegister = styled.div`
    padding-top: 10px;
`;
