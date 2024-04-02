export function getJwtUserNo() {
  const token = localStorage.getItem("access");
  const decoded = require("jwt-decode").jwtDecode(token);
  return decoded.userNo;
}

export function getJwtUserId() {
  const token = localStorage.getItem("access");
  const decoded = require("jwt-decode").jwtDecode(token);
  return decoded.userId;
}

export function getJwtUserName() {
  const token = localStorage.getItem("access");
  const decoded = require("jwt-decode").jwtDecode(token);
  return decoded.userName;
}

export function getJwtUserZbti() {
  const token = localStorage.getItem("access");
  const decoded = require("jwt-decode").jwtDecode(token);
  return decoded.userZbti;
}