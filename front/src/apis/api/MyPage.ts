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

export const getMyPredictList = async (userNo: Number) => {
    try {
        const response = await axios.get(`${REST_MYPAGE_API}/predict/${userNo}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};