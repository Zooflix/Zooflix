import { axios } from "../utils/axios";

const REST_RADIO_API = "http://localhost:8089/radio";

// 라디오
export async function playRadio() {
    try {
        const response = await axios.post(`${REST_RADIO_API}`, {
            responseType: 'arraybuffer',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        const audioData = response.data;
        const audioBlob = new Blob([audioData], { type: 'audio/mpeg'});
        const audioUrl = URL.createObjectURL(audioBlob);
        return audioBlob;
    } catch (e) {
        console.log(e);
    }
}