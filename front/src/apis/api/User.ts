import { axios } from "../utils/axios";

const REST_USER_API = `/user`;

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
