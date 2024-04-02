import { axios } from "../utils/axios";

const REST_RADIO_API = "/radio";

// 라디오 캐싱 데이터 가져오기
export async function getCachedData() {
    try {
        const response = await axios.get(`${REST_RADIO_API}/cachedData`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// 라디오 tts 가져오기
export async function playRadio() {
    try {
        const response = await axios.get(`${REST_RADIO_API}/tts`);
        const base64List = response.data;
        const blobList = base64List.map((base64String: string) => {
            const byteDecode = atob(base64String);
            const byteNumbers = new Array(byteDecode.length);
            for(let i=0; i<byteDecode.length; i++) {
                byteNumbers[i] = byteDecode.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: "audio/mpeg" });
        })

        const blobUrlList = blobList.map((audio: Blob) => {
            return URL.createObjectURL(audio);
        })
        return blobUrlList;
    } catch (error) {
        console.error('Error while fetching radio:', error);
        throw error;
    }
}
