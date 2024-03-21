import { axios } from "../utils/axios";

const REST_MYPAGE_API = `/my-page`;

let accessToken = localStorage.getItem("accessToken");

axios.defaults.headers.common["access"] = accessToken;

export const updateAccessToken = (newAccessToken: string | null) => {
    accessToken = newAccessToken;
    axios.defaults.headers.common["accessToken"] = newAccessToken;
};

export const getMyPageData = async (accessToken: String) => {
    try {
        if(!accessToken) {
            throw new Error("Access token is not set");
        }
        const response = await axios.get(`${REST_MYPAGE_API}/info/${userNo}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
