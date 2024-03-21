import { REACT_APP_HOME_URL } from "../constants";
import { axios } from "../utils/axios";

const REST_USER_API = `/user`;

//회원 정보 조회 - 요런느낌으로 짜세용.. 아래는 가상코드!
export async function selectOneUserInfo(userId: number) {
  try {
    const response = await axios.get(`${REST_USER_API}/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}


//회원 로그인
export async function loginUser(username: String, password: String) {
  try {    
    const response = await axios.post(`/login`, { username, password });
    console.log(response.data);
    return response.data.access;
  } catch (e) {
    console.log(e);
  } 
}
