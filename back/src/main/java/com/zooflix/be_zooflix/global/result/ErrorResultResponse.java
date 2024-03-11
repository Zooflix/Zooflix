package com.zooflix.be_zooflix.global.result;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@Builder
public class ErrorResultResponse<T> {

    private HttpStatus statusCode;
    private String resultMsg;
    private T resultData;

    public ErrorResultResponse(final HttpStatus statusCode, final String resultMsg) {
        this.statusCode = statusCode;
        this.resultMsg = resultMsg;
        this.resultData = null;
    }

    public static <T> ErrorResultResponse<T> errRes(final HttpStatus statusCode, final String resultMsg){
        return errRes(statusCode, resultMsg, null);
    }

    public static <T> ErrorResultResponse<T> errRes(final HttpStatus statusCode, final String resultMsg, final T data) {
        return ErrorResultResponse.<T>builder()
                .statusCode(statusCode)
                .resultMsg(resultMsg)
                .resultData(data)
                .build();

//                ResponseEntity.status(status).body(new ResultResponse<>(status.value(), message, data, errorCode));
    }

}
