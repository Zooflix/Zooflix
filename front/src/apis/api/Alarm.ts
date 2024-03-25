import { Routes } from "react-router-dom";
import { axios } from "../utils/axios";

const REST_ALARM_API = `/alarm`;

// 알람을 위한 SSE 연결
// /alarm/subscribe/{userNo}
export async function getSSELink(userNo: number) {
  try {
    const response = await axios.get(`/alarm/subscribe/{userNo}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 알람 전체 조회
// /alarm/{userNo}
export async function getAlarmList(userNo: number) {
  try {
    const response = await axios.get(`/alarm/{userNo}`);
    console.log(response.data.resultData);
    return response.data.resultData;
  } catch (e) {
    console.log(e);
  }
}

// 알람 읽음 여부 수정
// /alarm/{alarmNo}
export async function UpdateIsRead(alarmNo: number) {
  try {
    // const data = {}
    const response = await axios.put(`/alarm/{alarmNo}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 알람 전체 지우기
// /alarm
export async function RemoveAlarm() {
  try {
    const response = await axios.delete(`/alarm`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
