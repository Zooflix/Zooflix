import styled from "styled-components";
import UserInput from "../User/UserInput";
import { useEffect, useState } from "react";
import SubmitBtn from "../Common/SubmitBtn";
import { useRecoilState } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";
import { getMyInfo } from "../../apis/api/MyPage";
import { updateUserInfoState } from "../../Store/UserState";

const InputStyle = {
    backgroundColor: "#D7F1FF",
};

function UpdateMyInfo() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: any) => {
        setIsChecked(event.target.checked);
    };

    // access 토큰 받아지면 사용할 것
    const [updateUserInfo, setUpdateUserInfo] = useRecoilState(updateUserInfoState);

    // 임시용
    const userName = "다라란";
    const password = "user1";

    useEffect(() => {
        const fetchData = async () => {
            // //내 정보
            // try {
            //     const data = await getMyInfo();
            //     setMyPageInfo(data);
            //     console.log(data);
            // } catch (error) {
            //     console.log("내 정보 불러오기 실패");
            //     console.error(error);
            // }
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
                    placeholder={userName}
                    readonly
                />
                <UserInput
                    type="password"
                    placeholder="현재 비밀번호를 입력하세요"
                    style={InputStyle}
                />
                <UserInput
                    type="password"
                    placeholder="새로운 비밀번호를 입력하세요"
                    style={InputStyle}
                />
                <UserInput
                    type="password"
                    placeholder="새로운 비밀번호를 다시 입력하세요"
                    style={InputStyle}
                />
                <CheckboxContainer>
                    <input
                        type="checkbox"
                        id="isAppkey"
                        name="isAppkey"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="isAppkey">
                        APP KEY를 설정하겠습니다. (선택)
                    </Label>
                </CheckboxContainer>
                {isChecked && (
                    <>
                        <UserInput
                            type="password"
                            placeholder="한국투자증권의 APP key를 입력하세요"
                            style={InputStyle}
                        />
                        <UserInput
                            type="password"
                            placeholder="한국투자증권의 APP Secret key를 입력하세요"
                            style={InputStyle}
                        />
                        <UserInput
                            type="password"
                            placeholder="한국투자증권의 계좌번호를 입력하세요(10자)"
                            style={InputStyle}
                        />
                    </>
                )}
            </InputContainer>
            <SubmitBtn text="수정 완료" />
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
