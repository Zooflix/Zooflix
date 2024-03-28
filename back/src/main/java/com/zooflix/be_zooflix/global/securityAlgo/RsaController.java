package com.zooflix.be_zooflix.global.securityAlgo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/security/{text}")
    public String test(@PathVariable String text){
//        HashMap<String, String> rsaKeyPair = rsaUtils.createKeypairAsString();
//        String publicKey = rsaKeyPair.get("publicKey");
//        String privateKey = rsaKeyPair.get("privateKey");
//
//        System.out.println("만들어진 공개키:" + publicKey);
//        System.out.println("만들어진 개인키:" + privateKey);
//
//        String encdodeStr = rsaUtils.encode(text, publicKey);
//        System.out.println("암호화 된 문장 : " + encdodeStr);
//        System.out.println("복호화 된 문장 : " + rsaUtils.decode(encdodeStr, privateKey));

        String aesEncodeStr = aesUtils.aesCBCEncode(text, "api");
        System.out.println("중요한 aes 암호화 데이터 : " + aesEncodeStr);
        System.out.println("중요한 aes 복호화 데이터 : " + aesUtils.aesCBCDecode(aesEncodeStr, "api"));

        return "성공";
    }
}
