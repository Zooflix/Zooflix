// import { REACT_APP_HOME_URL } from "../constants";
import { axios, axiosPrivate } from "../utils/axios";
import { securityAesEncode } from "../../apis/utils/security";
const REST_USER_API = `/auth`;

//회원 로그인
export async function loginUser(userId: String, userPw: String) {
  try {
    const response = await axios
      .post(
        `/login`,
        { userId, userPw },
        {
          headers: { access: localStorage.getItem("access") },
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.setItem("access", res.headers["access"]);

        return res;
      });

    return response.status;
  } catch (e) {
    console.log("실패");
    console.log(e);
  }
}

// 수정용 회원 정보
export async function updateUserInfo(){
  try {
    const response = await axiosPrivate.get(`${REST_USER_API}/update/info`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(userId: String, userName:String, userPw: String, userAppKey:string, userSecretKey:string, userAccount:string) {
  try {
    userAppKey = await securityAesEncode(userAppKey);
    userSecretKey = await securityAesEncode(userSecretKey);
    userAccount = await securityAesEncode(userAccount);
    const response = await axiosPrivate.put(`${REST_USER_API}/update`, {
      userId,
      userName,
      userPw,
      userAppKey,
      userSecretKey,
      userAccount,
    })
    return response;
  } catch (error) {
    console.error(error);
  }

}

export async function loginCheck(userId: String, userPw: String) {
  try {
    const response = await axios
      .post(
        `${REST_USER_API}/login`,
        { userId, userPw },
      )
      .then((res) => {
        return res;
      });
    console.log(response);  
    return response.data;
  } catch (e) {
    console.log("실패");
    console.log(e);
  }
}

// 로그아웃
export async function logoutUser() {
  try {
    const response = await axios
      .post(
        `/logout`,
        {},
        {
          headers: { access: localStorage.getItem("access") },
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.removeItem("access");
        return res;
      })
      .catch((error) => {
        localStorage.removeItem("access");
      });

    // return response.status;
  } catch (e) {
    // localStorage.removeItem("access");
    console.log(e);
  }
}

// 회원 가입
export async function signupUser(
  userId: String,
  userName: String,
  userPw: String,
  userAppKey: string,
  userSecretKey: string,
  userAccount: string
) {
  try {
    userAppKey = await securityAesEncode(userAppKey);
    userSecretKey = await securityAesEncode(userSecretKey);
    userAccount = await securityAesEncode(userAccount);
    const response = await axios
      .post(`${REST_USER_API}/signup`, {
        userId,
        userName,
        userPw,
        userAppKey,
        userSecretKey,
        userAccount,
      })
      .then((res) => {
        return res;
      });

    return response;
  } catch (e) {
    console.log(e);
  }
}

// 아이디 체크
export async function idCheck(userId: String) {
  try {
    const response = await axios
      .post(`${REST_USER_API}/id-check`, { userId })
      .then((res) => {
        return res;
      });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

// 이름 체크
export async function nameCheck(userName: String) {
  try {
    const response = await axios
      .post(`${REST_USER_API}/name-check`, { userName })
      .then((res) => {
        return res;
      });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//예측 게시글 작성자 정보 조회
export async function selectInfo(userNo: number) {
  try {
    const response = await axios.get(`${REST_USER_API}/info/${userNo}`);
    return response.data;
   } catch (e) {
      console.log(e);
  }
}


// zbti 업데이트
export async function zbtiUpdate(userZbti: String) {
  try {
    const response = await axiosPrivate.put(`${REST_USER_API}/zbti/${userZbti}`);
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
}
