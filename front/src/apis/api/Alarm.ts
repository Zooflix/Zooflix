import { axios } from "../utils/axios";

// 알람을 위한 SSE 연결
export async function getSSELink(userId: string) {
  try {
    const response = await axios.get(`/alarm/subscribe/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 알람 전체 조회
export async function getAlarmList(userId: string) {
  try {
    const response = await axios.get(`/alarm/${userId}`);
    console.log(response.data.resultData);
    return response.data.resultData;
  } catch (e) {
    console.log(e);
  }
}

// 알람 읽음 여부 수정
export async function UpdateIsRead(alarmNo: number) {
  try {
    // const data = {}
    const response = await axios.put(`/alarm/${alarmNo}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 알람 전체 지우기
export async function RemoveAlarm() {
  try {
    const response = await axios.delete(`/alarm`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
