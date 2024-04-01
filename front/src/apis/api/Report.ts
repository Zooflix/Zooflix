import { axios } from "../utils/axios";

const REST_REPOERT_API = "/report";

//신고하기
export async function report(userNo: number, pdNo: number, reason: string) {
  try {
    const response = await axios.post(`${REST_REPOERT_API}/${userNo}/${pdNo}`, {
      reason,
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
