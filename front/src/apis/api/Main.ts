import { axios } from "../utils/axios";

//팔로잉한 유저 피드 조회
export async function getRankingList() {
  try {
    const response = await axios.get(`/main/ranking`);
    return response.data.resultData;
  } catch (e) {
    console.log(e);
  }
}

export async function getMainIndices() {
  try {
    const response = await axios.get(`/main/indices`);
    return response.data.resultData;
  } catch (e) {
    console.log(e);
  }
}
