// import { REACT_APP_HOME_URL } from "../constants";
import { axios } from "../utils/axios";
import { useState, useEffect } from "react";

const REST_USER_API = `/user`;
const REACT_APP_HOME_URL = 'http://localhost:8089';

//회원 로그인
export async function loginUser(userId: String, userPw: String) {  
  try {
    const response = await axios.post(
      `/login`, 
      { userId, userPw },
      { headers: { "access": localStorage.getItem('access') }, withCredentials: true},)
      .then(res => {
      localStorage.setItem("access", res.headers['access']);
      
      return res;
    });
    
    return response.status;
  } catch (e) {
    console.log("실패")
    console.log(e);
  }
}

// 수정용 회원 정보
export async function updateUserInfo(userId: String){
  try {
    const response = await axios.get(`/auth/update/info/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


// 로그아웃
export async function logoutUser() {
  try {
    const response = await axios.post(
      `/logout`,
      {},
      { headers: { "access": localStorage.getItem('access') }, withCredentials: true},)
      .then(res => {        
        localStorage.removeItem("access");
        return res;
    });
    
    return response.status;
  } catch (e) {
    console.log(e);
  } 
}
