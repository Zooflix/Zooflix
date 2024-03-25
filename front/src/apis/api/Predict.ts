import { axios } from "../utils/axios";

const REST_PREDICT_API = "http://localhost:8089/predict";

//전체 예측 글 조회
export async function selectPredicts(sorted: string, stockName: string) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}`, {
      params: {
        sorted: sorted,
        stockName: stockName,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
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
    const response = await axios.post(`${REST_PREDICT_API}`, predictReqDto);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//예측 글 삭제
export async function deletePredict(pdNo: number) {
  try {
    const response = await axios.delete(`${REST_PREDICT_API}/${pdNo}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//종목 차트
export async function selectGraph(stockName: string) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/graph`, {
      params: {
        stockName: stockName,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//종목과 예측 차트 비교
export async function selectCompareGraph(userNo: number, stockName: string) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/graph/${userNo}`, {
      params: {
        stockName: stockName,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//매매정보
export async function selectStockHistory(userNo: number) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/stock/${userNo}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//매매정보
export async function stockSearch(stockName: string) {
  try {
    const response = await axios.get(`${REST_PREDICT_API}/stock/search`, {
      params: {
        stockName: stockName,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
