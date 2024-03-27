// import { REACT_APP_HOME_URL } from "../constants";
import { axios } from "../utils/axios";

const REST_USER_API = `/user`;
const REACT_APP_HOME_URL = 'http://localhost:8089';

//회원 로그인
export async function loginUser(userId: String, userPw: String) {
  try {
    const response = await axios.post(
      `${REACT_APP_HOME_URL}/login`, 
      { userId, userPw },)
      .then(res => {
      localStorage.setItem("access", res.headers['access']);
      
      return res;
    });
    
    return response.status;
  } catch (e) {
    console.log("실패")
    console.log(e);
  }
}

export async function logoutUser() {
  try {
    const response = await axios.post(
      `${REACT_APP_HOME_URL}/logout`,)
      .then(res => {
      localStorage.removeItem("access");      
      return res;
    });
    
    return response.status;
  } catch (e) {
    console.log(e);
  } 
}
