package com.student_coin.api.exception;

public class MissingAuthorizationHeaderException extends RuntimeException {
    public MissingAuthorizationHeaderException(String message) {
        super(message);
    }

    public MissingAuthorizationHeaderException() {
        super("Missing Authorization header");
    }
}
