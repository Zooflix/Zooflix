package com.zooflix.be_zooflix.global.securityAlgo;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Component
public class AesUtils {

    @Value("${security.db.aes.private-key}")
    private String DBPrivateKey;

    @Value("${security.api.aes.private-key}")
    private String APIPrivateKey;

    public String aesCBCEncode(String data, String type) {
        String privateKey = "";
        if (type.equals("db")) privateKey = DBPrivateKey;
        else if (type.equals("api")) privateKey = APIPrivateKey;
        else return "암호화 타입 설정 실패";

        try {
            SecretKeySpec secretKeySpec = new SecretKeySpec(privateKey.getBytes("UTF-8"), "AES");
            IvParameterSpec IV = new IvParameterSpec(privateKey.substring(0, 16).getBytes());

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, IV);

            byte[] encrpytionByte = cipher.doFinal(data.getBytes("UTF-8"));
            return Hex.encodeHexString(encrpytionByte);

        } catch (NoSuchPaddingException | NoSuchAlgorithmException | InvalidAlgorithmParameterException |
                 InvalidKeyException | IllegalBlockSizeException | BadPaddingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

    }

    public String aesCBCDecode(String encodeData, String type) {

        String privateKey = "";
        if (type.equals("db")) privateKey = DBPrivateKey;
        else if (type.equals("api")) privateKey = APIPrivateKey;
        else return "암호화 타입 설정 실패";

        try {
            SecretKeySpec secretKeySpec = new SecretKeySpec(privateKey.getBytes("UTF-8"), "AES");
            IvParameterSpec IV = new IvParameterSpec(privateKey.substring(0, 16).getBytes());

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, IV);

            byte[] decodeByte = Hex.decodeHex(encodeData.toCharArray());
            return new String(cipher.doFinal(decodeByte), "UTF-8");
        } catch (NoSuchPaddingException | NoSuchAlgorithmException | InvalidAlgorithmParameterException |
                 InvalidKeyException | DecoderException | IllegalBlockSizeException | BadPaddingException |
                 UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

    }

    public String APItoDB(String data) {
        return aesCBCEncode(aesCBCDecode(data, "api"), "db");
    }

    public String DBtoAPI(String data) {
        return aesCBCEncode(aesCBCDecode(data, "db"), "api");
    }
}
