import { axios, axiosPrivate } from "../utils/axios";
import { securityAesEncode } from "../../apis/utils/security";

export async function getUserApi() {
  try {
    const response = await axiosPrivate.get(`/stock/subscribe/checkApikey`);
    console.log("result Data" + response.data.resultData);
    return response.data.resultData;
  } catch (e) {
    console.log(e);
  }
}

interface subscribeProps {
  stockName?: string;
  stockCode?: string;
  stockSubscribeDay: number;
  stockCount: number;
  userAccount?: string;
  userAppKey?: string;
  userSecretKey?: string;
}

export async function insertStockSubscribe(subscribe: subscribeProps) {
  try {
    if (subscribe.userAppKey !== undefined && subscribe.userAppKey !== "")
      subscribe.userAppKey = await securityAesEncode(subscribe.userAppKey);
    if (subscribe.userSecretKey !== undefined && subscribe.userSecretKey !== "")
      subscribe.userSecretKey = await securityAesEncode(
        subscribe.userSecretKey
      );
    if (subscribe.userAccount !== undefined && subscribe.userAccount! !== "")
      subscribe.userAccount = await securityAesEncode(subscribe.userAccount);

    const response = await axiosPrivate.post(`/stock/subscribe`, subscribe);
    console.log("result Data" + response.data.resultData);
    return response.data.resultData;
  } catch (e) {
    console.log(e);
  }
}

export async function cancelStockSubscribe(subscribeNo: number) {
  try {
    const response = await axiosPrivate.delete(
      `/stock/subscribe/termination/${subscribeNo}`
    );
    console.log("result Data" + response.data.resultData);
    return response.data.resultData;
  } catch (e) {
    console.log(e);
  }
}
