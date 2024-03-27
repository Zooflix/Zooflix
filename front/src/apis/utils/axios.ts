import Axios from "axios";
import { REACT_APP_HOME_URL } from "../constants";

export const axios = Axios.create({
  baseURL: `http://localhost:8089`,
  headers: {
    "Content-Type": "application/json",    
  },
  
});

export const axiosPrivate = Axios.create({
  baseURL: `http://localhost:8089`,
  headers: {
    "Content-Type": "application/json",    
  },
  
});

export async function tokenReissue() {
  const response = await axios.post('/auth/reissue', {}, { withCredentials: true });
  return response;
}

axiosPrivate.interceptors.request.use(config => {
  config.headers['access'] = localStorage.getItem('access');
  console.log(localStorage.getItem('access'));
  return config;
}, error => {
  return Promise.reject(error);
})

axiosPrivate.interceptors.response.use(  
  // 200 번대 응답 처리
  (response) => {
    return response;
  },
  // 200 번대 응답이 아닌 경우
  async (error) => {    
    const {
      config,
      response: { status },
    } = error;

    // 토큰 만료된 경우. 401
    if (status === 401) {
      
      if (error.response.data === 'access token expired') {        
        const originRequest = config;
        const response = await tokenReissue();
        // 토큰 재발급 성공
        if (response.status === 200) {          
          localStorage.setItem("access", response.headers['access']);          
          // 진행중이던 요청 이어서 하기
          console.log("재발급 성공?")
          console.log("리스폰스 토큰 : " + localStorage.getItem('access'));
          originRequest.headers['access'] = localStorage.getItem('access');
          return axios(originRequest);
        }
        // 토큰 재발급 실패(리프레시 토큰도 만료되면 재 로그인)
        else if (response.status === 404) {
          alert("다시 로그인 해주세요.");
        }
        else {
          alert("로그인 필요");
        }
      }
    }
    return Promise.reject(error);
  }
);
