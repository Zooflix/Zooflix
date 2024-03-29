import { axios, axiosPrivate } from "../utils/axios";

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
    const response = await axiosPrivate.post(`/stock/subscribe`, subscribe);
    console.log("result Data" + response.data.resultData);
    return response.data.resultData;
  } catch (e) {
    console.log(e);
  }
}
