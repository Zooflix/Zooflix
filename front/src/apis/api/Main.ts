import { axios } from "../utils/axios";

//팔로잉한 유저 피드 조회
export async function getRankingList() {
  try {
    console.log("getRanking");
    const response = await axios.get(`/main/ranking`);
    console.log("result Data" + response.data.resultData);
    return response.data.resultData;
  } catch (e) {
    console.log(e);
  }
}
