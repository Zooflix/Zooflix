package com.zooflix.be_zooflix.global.rsa;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class RsaController {
    private final RsaUtils rsaUtils;

    public RsaController(RsaUtils rsaUtils) {
        this.rsaUtils = rsaUtils;
    }

    @GetMapping
    public String test(){
        HashMap<String, String> rsaKeyPair = rsaUtils.createKeypairAsString();
        String publicKey = rsaKeyPair.get("publicKey");
        String privateKey = rsaKeyPair.get("privateKey");

        System.out.println("만들어진 공개키:" + publicKey);
        System.out.println("만들어진 개인키:" + privateKey);

        String encdodeStr = rsaUtils.encode("테스트평문", publicKey);
        System.out.println("암호화 된 문장 : " + encdodeStr);
        System.out.println("복호화 된 문장 : " + rsaUtils.decode(encdodeStr, privateKey));

        return "성공";
    }
}
