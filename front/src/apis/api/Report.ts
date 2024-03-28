import { axios } from "../utils/axios";

const REST_REPOERT_API = "http://localhost:8089/report";

//신고하기
export async function report(userNo: number, pdNo: number) {
  try {
    const response = await axios.post(`${REST_REPOERT_API}/${userNo}/${pdNo}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
