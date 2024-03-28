import cryptoJs from 'crypto-js';


const privateKey = "ZOOFLIXAESMALANG203FFSTEWMDFKHOT";
const iv = cryptoJs.enc.Utf8.parse(privateKey.substring(0, 16));

export async function securityAesEncode(data: string) {
    const cipher = cryptoJs.AES.encrypt(data, cryptoJs.enc.Utf8.parse(privateKey), {
        iv: iv,
        mode: cryptoJs.mode.CBC,
        padding: cryptoJs.pad.Pkcs7,
    });
    return cipher.ciphertext.toString(cryptoJs.enc.Hex);
}

export async function securityAesDecode(data: string) {
    // Hex 문자열을 바이트 배열로 변환
    const hexToBytes = cryptoJs.enc.Hex.parse(data);
    // 바이트 배열을 Base64로 변환하여 decrypt 함수에 전달할 수 있는 형태로 만듦
    const base64Data = cryptoJs.enc.Base64.stringify(hexToBytes);

    const bytes  = cryptoJs.AES.decrypt(base64Data, cryptoJs.enc.Utf8.parse(privateKey), {
        iv: iv,
        mode: cryptoJs.mode.CBC,
        padding: cryptoJs.pad.Pkcs7,
    });
    return bytes.toString(cryptoJs.enc.Utf8);
}
  