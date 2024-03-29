export async function getJwtUserNo() {
    const token = localStorage.getItem('access');
    const decoded = require('jwt-decode').jwtDecode(token);
    return decoded.userNo;
}

export async function getJwtUserId() {
    const token = localStorage.getItem('access');
    const decoded = require('jwt-decode').jwtDecode(token);
    return decoded.userId;
}