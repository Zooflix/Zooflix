package com.zooflix.be_zooflix.domain.stockSubscribe.dto.request;

import lombok.*;
import jakarta.validation.constraints.NotNull;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor

public class AddStockSubscribeRequest {
    @NotNull(message = "주식 코드는 필수 항목입니다.")
    int stockCode;

    @NotNull(message = "주식 종목은 필수 항목입니다.")
    String stockName;

    @NotNull(message = "주식 구독 수량은 필수 항목입니다.")
    int stockCount;

    @NotNull(message = "주식 구독일은 필수 항목입니다.")
    int stockSubscribeDate;

    @NotNull(message = "User Id는 필수 항목입니다.")
    String userId;

    @NotNull(message = "User AppKey는 필수 항목입니다.")
    String userAppKey;

    @NotNull(message = "User 시크릿키는 필수 항목입니다.")
    String userSecretKey;

    @NotNull(message = "User 계좌는 필수 항목입니다.")
    String userAccount;
}

