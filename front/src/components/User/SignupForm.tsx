import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserBackground from "./UserBackground";
import UserInput from "./UserInput";
import SubmitBtn from "../Common/SubmitBtn";
import { useState } from "react";
import UserBack from "./UserBack";
import BackBtn from "../Common/BackBtn";
import { idCheck, nameCheck, signupUser } from "../../apis/api/User";
import { securityAesEncode } from "../../apis/utils/security";

function SignupForm() {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");
  const [userAppKey, setUserAppKey] = useState("");
  const [userSecretKey, setUserSecretKey] = useState("");
  const [userAccount, setUserAccount] = useState("");

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const handleSignup = async () => {
    try {
      if (
        !userName.trim() ||
        !userPw.trim() ||
        !userId.trim() ||
        !userPwCheck.trim()
      ) {
        alert("필수 항목을 모두 입력해주세요.");
        return;
      }
      if (userPw.length < 4) {
        alert("비밀번호는 4자 이상 입력해주세요.");
        return;
      }
      if (userName.length > 10) {
        alert("닉네임은 10글자 이하로 입력해주세요.");
        return;
      }

      if (userPw === userPwCheck) {
        const idCheckResult = await idCheck(userId);
        if (idCheckResult?.status === 200) {
          if (idCheckResult?.data === "중복") {
            alert("사용할 수 없는 아이디입니다.");
          } else {
            const nameCheckResult = await nameCheck(userName);
            if (nameCheckResult?.status === 200) {
              if (nameCheckResult?.data === "중복") {
                alert("사용할 수 없는 이름입니다.");
              } else {
                if (isChecked) {
                  if (
                    userAppKey === "" ||
                    userSecretKey === "" ||
                    userAccount === ""
                  ) {
                    alert("APP KEY 정보를 전부 입력해주세요.");
                    return;
                  }
                  setUserAppKey(userAppKey);
                  setUserSecretKey(userSecretKey);
                  setUserAccount(userAccount);
                }
                const signupResult = await signupUser(
                  userId,
                  userName,
                  userPw,
                  userAppKey,
                  userSecretKey,
                  userAccount
                );
                if (signupResult?.status === 200) {
                  alert("회원가입이 완료되었습니다.");
                  navigate("/login");
                } else {
                  alert("회원가입에 실패하였습니다.");
                }
              }
            } else {
              alert("사용할 수 없는 이름입니다.");
            }
          }
        } else {
          alert("사용할 수 없는 아이디입니다.");
        }
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <UserBack />
      <Container>
        <h2>REGISTER</h2>
        <InputContainer>
          <UserInput
            type="text"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <UserInput
            type="text"
            placeholder="닉네임을 입력하세요 (10자 이하)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <UserInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />
          <UserInput
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={userPwCheck}
            onChange={(e) => setUserPwCheck(e.target.value)}
          />
          <CheckboxContainer>
            <input
              type="checkbox"
              id="isAppkey"
              name="isAppkey"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <Label htmlFor="isAppkey">APP KEY를 설정하겠습니다. (선택)</Label>
          </CheckboxContainer>
          {isChecked && (
            <>
              <UserInput
                type="password"
                placeholder="한국투자증권의 APP key를 입력하세요"
                value={userAppKey}
                onChange={(e) => setUserAppKey(e.target.value)}
              />
              <UserInput
                type="password"
                placeholder="한국투자증권의 APP Secret key를 입력하세요"
                value={userSecretKey}
                onChange={(e) => setUserSecretKey(e.target.value)}
              />
              <UserInput
                type="password"
                placeholder="한국투자증권의 계좌번호를 입력하세요(10자)"
                value={userAccount}
                onChange={(e) => setUserAccount(e.target.value)}
              />
            </>
          )}
        </InputContainer>
        <SubmitBtn text="회원가입 하기" onClick={handleSignup} />
        <h5>
          회원가입 시 주플릭스의 서비스 이용 약관과 개인정보 보호정책에 동의하게
          됩니다
        </h5>
      </Container>
    </Wrapper>
  );
}

export default SignupForm;
const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  padding: 150px;
  h2 {
    color: #2a4263;
  }
  h5 {
    font-size: 15px;
    color: #737373;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  padding: 300px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-left: 5px;
  font-size: 15px;
  font-family: "NanumSquareRound";
`;

const BtnWrapper = styled.div`
  display: flex;
`;
