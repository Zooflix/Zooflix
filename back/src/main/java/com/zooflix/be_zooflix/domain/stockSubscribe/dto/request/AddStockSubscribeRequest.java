package com.zooflix.be_zooflix.domain.stockSubscribe.dto.request;

import lombok.*;
import jakarta.validation.constraints.NotNull;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor

public class AddStockSubscribeRequest {

    @NotNull(message = "주식 종목은 필수 항목입니다.")
    String stockName;

    @NotNull(message = "주식 구독 수량은 필수 항목입니다.")
    int stockCount;

    @NotNull(message = "주식 구독일은 필수 항목입니다.")
    String subscribeDate;

    @NotNull(message = "user pk는 필수 항목입니다.")
    int userNo;
    String userAppKey;
    String userSecretKey;
    String userAccount;
}
