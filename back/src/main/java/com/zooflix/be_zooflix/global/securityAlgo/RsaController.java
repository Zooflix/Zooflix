package com.zooflix.be_zooflix.global.securityAlgo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class RsaController {
    private final RsaUtils rsaUtils;
    private final AesUtils aesUtils;

    public RsaController(RsaUtils rsaUtils, AesUtils aesUtils) {
        this.rsaUtils = rsaUtils;
        this.aesUtils = aesUtils;
    }

    @GetMapping("/security")
    public String test(){
        HashMap<String, String> rsaKeyPair = rsaUtils.createKeypairAsString();
        String publicKey = rsaKeyPair.get("publicKey");
        String privateKey = rsaKeyPair.get("privateKey");

        System.out.println("만들어진 공개키:" + publicKey);
        System.out.println("만들어진 개인키:" + privateKey);

        String encdodeStr = rsaUtils.encode("테스트평문", publicKey);
        System.out.println("암호화 된 문장 : " + encdodeStr);
        System.out.println("복호화 된 문장 : " + rsaUtils.decode(encdodeStr, privateKey));

        String aesEncodeStr = aesUtils.aesCBCEncode("중요한데이터임");
        System.out.println("중요한 aes 암호화 데이터 : " + aesEncodeStr);
        System.out.println("중요한 aes 복호화 데이터 : " + aesUtils.aesCBCDecode(aesEncodeStr));

        String dbEncodeStr = aesUtils.aesCBCEncode(encdodeStr);
        System.out.println("이중 암호화 : " + dbEncodeStr);
        String dbOneDecodeStr = aesUtils.aesCBCDecode(dbEncodeStr);
        System.out.println("이중 복호화 첫번째 : " + dbOneDecodeStr);
        System.out.println("이중 복호화 두번째 : " + rsaUtils.decode(dbOneDecodeStr, privateKey));

        return "성공";
    }
}
