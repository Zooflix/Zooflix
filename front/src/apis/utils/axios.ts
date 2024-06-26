import Axios from "axios";

export const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_HOME_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = Axios.create({
  baseURL: `${process.env.REACT_APP_HOME_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function tokenReissue() {
  const response = await axios.post(
    "/auth/reissue",
    {},
    { withCredentials: true }
  );
  return response;
}

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["access"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await tokenReissue(); // 토큰 재발급 요청
      if (response.status === 200) {
        localStorage.setItem("access", response.headers.access); // 새 토큰 저장
        axios.defaults.headers.common["access"] = response.headers.access; // 모든 요청에 대한 기본 헤더 업데이트
        originalRequest.headers["access"] = response.headers.access; // 실패한 요청에 대한 헤더 업데이트
        return axios(originalRequest); // 요청 재시도
      }
    }
    return Promise.reject(error);
  }
);
