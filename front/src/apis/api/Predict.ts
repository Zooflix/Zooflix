import { axios, axiosPrivate } from "../utils/axios";

const REST_PREDICT_API = "/predict";

//전체 예측 글 조회
export async function selectPredicts(
  sorted: string,
  stockName: string,
  zbti: string,
  toggle: boolean
) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}`, {
      params: {
        sorted: sorted,
        stockName: stockName,
        zbti: zbti,
        toggle: toggle,
      },
    });
    return response.data;
  } catch (e) {}
}

//예측 글 작성
interface PredictReqDto {
  stockName: string;
  userNo: number;
  pdDate: string;
  pdValue: number;
  pdContent: string;
  preValue: number;
  pdUpDown: boolean;
}
export async function insertPredict(predictReqDto: PredictReqDto) {
  try {
    const response = await axiosPrivate.post(
      `${REST_PREDICT_API}`,
      predictReqDto
    );
    return response.data;
  } catch (e) {}
}

//예측 글 삭제
export async function deletePredict(pdNo: number) {
  try {
    const response = await axios.delete(`${REST_PREDICT_API}/${pdNo}`);
    return response.data;
  } catch (e) {}
}

//종목 차트
export async function selectGraph(stockName: string) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/graph`, {
      params: {
        stockName: stockName,
      },
    });
    return response.data;
  } catch (e) {}
}

//종목과 예측 차트 비교
export async function selectCompareGraph(userNo: number, stockName: string) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/graph/${userNo}`, {
      params: {
        stockName: stockName,
      },
    });
    return response.data;
  } catch (e) {}
}

//매매정보
export async function selectStockHistory(userNo: number) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/stock/${userNo}`);
    return response.data;
  } catch (e) {}
}

//종목검색
export async function stockSearch(stockName: string) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/stock/search`, {
      params: {
        stockName: stockName,
      },
    });
    return response.data;
  } catch (e) {}
}

//현재 가격 조회
export async function selectNowPrice(stockName?: string) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/prevalue`, {
      params: {
        stockName: stockName,
      },
    });
    return response.data;
  } catch (e) {}
}

//현재 가격 조회
export async function checkPredict(userNo: number, stockName: string) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/check`, {
      params: {
        userNo: userNo,
        stockName: stockName,
      },
    });
    return response.data;
  } catch (e) {}
}

//랭킹
export async function getZoostra(stockName: string) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/rank`, {
      params: {
        stockName: stockName,
      },
    });
    return response.data;
  } catch (e) {}
}
