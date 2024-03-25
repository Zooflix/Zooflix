import { axios } from "../utils/axios";

const REST_RADIO_API = "http://localhost:8089";

// 라디오
export async function playRadio() {
    try {
        const response = await axios.get(`${REST_RADIO_API}/radio`, {
            responseType: 'blob',
        });
        const url = URL.createObjectURL(response.data);
        return url;
    } catch (error) {
        console.error('Error while fetching radio:', error);
        throw error;
    }
}