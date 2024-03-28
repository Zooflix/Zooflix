// import { REACT_APP_HOME_URL } from "../constants";
import { axios } from "../utils/axios";
import { useState, useEffect } from "react";

const REST_USER_API = `/auth`;
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

export async function signupUser(userId: String, userName: String, userPw: String, userAppKey: String, userSecretKey: String, userAccount: String) {
  try {
    
    const response = await axios.post(
      `${REST_USER_API}/signup`,
      { userId, userName, userPw, userAppKey, userSecretKey, userAccount },      
    )
    .then(res => {
      return res;
    });
    
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function idCheck(userId: String) {
  try {
    const response = await axios.post(
      `${REST_USER_API}/id-check`,
      { userId },)
      .then(res => {
        return res;
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function nameCheck(userName: String) {
  try {
    const response = await axios.post(
      `${REST_USER_API}/name-check`,
      { userName },)
      .then(res => {
        return res;
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}
