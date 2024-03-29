import { axios, axiosPrivate } from "../utils/axios";

const REST_MYPAGE_API = `/my-page`;

// 유저 정보 가져오기
export const getUserInfo = async (userNo: Number) => {
  try {
    const response = await axiosPrivate.get(
      `${REST_MYPAGE_API}/info/${userNo}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 유저 예측 글 목록 가져오기
export const getUserPredictList = async (userNo: Number) => {
  try {
    const response = await axios.get(`${REST_MYPAGE_API}/predict/${userNo}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 유저가 구독한 사람 목록 가져오기(유저 구독 인덱스, 닉네임, 온도)
export const getUserSubscribeList = async (userNo: Number) => {
  try {
    const response = await axios.get(`${REST_MYPAGE_API}/subscribe/${userNo}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 유저 주식 구독 목록
export const getUserStockList = async (userId: String) => {
  try {
    const response = await axios.get(`/stock/subscribe/list/${userId}`);
    console.log(response.data.resultData);
    return response.data.resultData;
  } catch (error) {
    console.error(error);
  }
};
