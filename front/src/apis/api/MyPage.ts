import { axios } from "../utils/axios";

const REST_MYPAGE_API = `/my-page`;


export const getMyInfo = async (userNo: Number) => {
    try {
        const response = await axios.get(`${REST_MYPAGE_API}/info/${userNo}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// 내 예측 글 목록 가져오기
export const getMyPredictList = async (userNo: Number) => {
    try {
        const response = await axios.get(`${REST_MYPAGE_API}/predict/${userNo}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// 내가 구독한 사람 목록 가져오기(유저 구독 인덱스, 닉네임, 온도)
export const getMySubscribeList = async (userNo: Number) => {
    try {
        const response = await axios.get(`${REST_MYPAGE_API}/subscribe/${userNo}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// 유저 구독 취소
export const deleteMySubscribe = async (subscribeNo: Number) => {
    try {
        const response = await axios.delete(`${REST_MYPAGE_API}/subscribe/delete/${subscribeNo}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);        
    }
}

//내 주식 구독 목록
export const getMyStockList = async (userId: String) => {
    try {
        const response = await axios.get(`/stock/subscribe/list/${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

