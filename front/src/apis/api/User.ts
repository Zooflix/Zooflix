import { REACT_APP_HOME_URL } from "../constants";
import { axios } from "../utils/axios";

const REST_USER_API = `/user`;

//회원 로그인
export async function loginUser(userId: String, userPw: String) {
  try {    
    const response = await axios.post(`/login`, { userId, userPw });
    console.log(response.headers['access']);
    return response.headers['access'];
  } catch (e) { 
    console.log(e);
  } 
}
