import styled from "styled-components";
import UserInput from "../User/UserInput";
import { useEffect, useState } from "react";
import SubmitBtn from "../Common/SubmitBtn";
import { useRecoilState } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";
import { updateUserInfo, loginCheck, nameCheck, updateUser } from "../../apis/api/User";
import { updateUserInfoState } from "../../Store/UserState";
import { securityAesEncode, securityAesDecode } from "../../apis/utils/security";
import { useNavigate } from "react-router-dom";

const InputStyle = {
  backgroundColor: "#D7F1FF",
};

function UpdateMyInfo() {
    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(false);
    
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userPw, setUserPw] = useState("");
    const [userNewPw, setUserNewPw] = useState("");
    const [userNewPwCheck, setUserNewPwCheck] = useState("");
    const [userAppKey, setUserAppKey] = useState("");
    const [userSecretKey, setUserSecretKey] = useState("");
    const [userAccount, setUserAccount] = useState("");

    const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    };

    const handleUserUpdate = async () => {
        try {
            if (!userName.trim() || !userPw.trim() || !userNewPw.trim() || !userNewPwCheck) {
                alert("필수 항목을 입력해주세요.");
                return;
            }

            if (userNewPw.length < 4) {
                alert("비밀번호는 4글자 이상이어야 합니다.");
                return ;
            }

            if (userNewPw !== userNewPwCheck) {
                alert("새 비밀번호가 일치하지 않습니다.");
                return;
            }

            if (isChecked) {
                if (!userAppKey.trim() && !userSecretKey.trim() && !userAccount.trim()) {                    
                }
                else if (!userAppKey.trim() || !userSecretKey.trim() || !userAccount.trim()) {
                    alert("AppKey 항목을 다 입력하거나 전부 비워주세요.");
                    return;
                }
            }

            const pwCheckResult = await loginCheck(userId, userPw);
            if (pwCheckResult === "로그인 실패") {
                alert("비밀번호가 잘못되었습니다.");
                return;
            }

            // const nameCheckResult = await nameCheck(userName);
            // if (nameCheckResult?.data === "중복") {
            //     alert("사용할 수 없는 이름입니다.");
            //     return;
            // }

            const updateResult = await updateUser(userId, userName, userNewPw, userAppKey, userSecretKey, userAccount);
            if (updateResult?.status) {
                alert("회원 정보 수정 완료")
                navigate("/my-page");
            }
            else {
                alert("회원 정보 수정 실패");
            }
            
        } catch (e) {
            console.error(e);
        }
    }

  // access 토큰 받아지면 사용할 것
    const [updateUserInfoData, setUpdateUserInfoData] =
    useRecoilState(updateUserInfoState);

    useEffect(() => {

        const fetchData = async () => {
            //내 정보
            try {
                const response = await updateUserInfo();
                setUserId(response?.data.userId);
                setUserName(response?.data.userName);
                setUserAppKey(await securityAesDecode(response?.data.userAppKey));                
                setUserSecretKey(await securityAesDecode(response?.data.userSecretKey));                
                setUserAccount(await securityAesDecode(response?.data.userAccount));
            } catch (error) {
                console.log("내 정보 불러오기 실패");
                console.error(error);
            }
        };
        fetchData();    
    }, []);

  return (
    <Wrapper>
      <h2>UPDATE</h2>
      <InputContainer>
        {/* 로그인유저의 이름 들어가기 */}
        <UserInput
          type="text"
          style={InputStyle}
          placeholder="새로운 이름을 입력하세요"
          value={userName}
          readonly
        />
        <UserInput
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          style={InputStyle}
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
        />
        <UserInput
          type="password"
          placeholder="새로운 비밀번호를 입력하세요"
          style={InputStyle}
          value={userNewPw}
          onChange={(e) => setUserNewPw(e.target.value)}
        />
        <UserInput
          type="password"
          placeholder="새로운 비밀번호를 다시 입력하세요"
          style={InputStyle}
          value={userNewPwCheck}
          onChange={(e) => setUserNewPwCheck(e.target.value)}
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
              type="text"
              placeholder="한국투자증권의 APP key를 입력하세요"
              style={InputStyle}
              value={userAppKey}
              onChange={(e) => setUserAppKey(e.target.value)}
            />
            <UserInput
              type="text"
              placeholder="한국투자증권의 APP Secret key를 입력하세요"
              style={InputStyle}
              value={userSecretKey}
              onChange={(e) => setUserSecretKey(e.target.value)}
            />
            <UserInput
              type="text"
              placeholder="한국투자증권의 계좌번호를 입력하세요(10자)"
              style={InputStyle}
              value={userAccount}
              onChange={(e) => setUserAccount(e.target.value)}
            />
          </>
        )}
      </InputContainer>
      <SubmitBtn text="수정 완료" onClick={handleUserUpdate} />
    </Wrapper>
  );
}

export default UpdateMyInfo;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    color: #2a4263;
  }
  h5 {
    font-size: 15px;
    color: #737373;
  }
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
