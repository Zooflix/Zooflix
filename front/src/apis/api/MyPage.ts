import { axios, axiosPrivate } from "../utils/axios";

const REST_MYPAGE_API = `/my-page`;

// 내 정보 가져오기
export const getMyInfo = async () => {
  try {
    const response = await axiosPrivate.get(`${REST_MYPAGE_API}/info`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 내 예측 글 목록 가져오기
export const getMyPredictList = async () => {
  try {
    const response = await axiosPrivate.get(`${REST_MYPAGE_API}/predict`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 내가 구독한 사람 목록 가져오기(유저 구독 인덱스, 닉네임, 온도)
export const getMySubscribeList = async () => {
  try {
    const response = await axiosPrivate.get(`${REST_MYPAGE_API}/subscribe`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 유저 구독하기
export async function subscribeUser(userNo: Number, subscribeNo: Number) {
  try {
    const response = await axios
      .post(`user/subscribe`, { userNo, subscribeNo })
      .then((res) => {
        return res;
      });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

// 유저 구독 취소
export const deleteMySubscribe = async (subscribeNo: Number) => {
  try {
    const response = await axiosPrivate.delete(
      `${REST_MYPAGE_API}/subscribe/delete/${subscribeNo}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//내 주식 구독 목록
export const getMyStockList = async (userId: String) => {
  try {
    const response = await axiosPrivate.get(`/stock/subscribe/list/${userId}`);
    console.log(response.data.resultData);
    return response.data.resultData;
  } catch (error) {
    console.error(error);
  }
};
