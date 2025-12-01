package com.student_coin.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AlreadyUsedRedeemedException extends RuntimeException {

    public AlreadyUsedRedeemedException(String message) {
        super(message);
    }

    public AlreadyUsedRedeemedException(String message, Throwable cause) {
        super(message, cause);
    }
}