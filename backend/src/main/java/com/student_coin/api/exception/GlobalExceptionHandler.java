package com.student_coin.api.exception;

import com.student_coin.api.exception.message.RestErrorMessage;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<RestErrorMessage> handleBadCredentials(BadCredentialsException exception) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        RestErrorMessage message = new RestErrorMessage(status, exception.getMessage());
        return ResponseEntity.status(status).body(message);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(EntityNotFoundException exception) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        RestErrorMessage message = new RestErrorMessage(status, exception.getMessage());
        return ResponseEntity.status(status).body(message);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<RestErrorMessage> handleUsernameNotFound(UsernameNotFoundException exception) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        RestErrorMessage message = new RestErrorMessage(status, exception.getMessage());
        return ResponseEntity.status(status).body(message);
    }

    @ExceptionHandler(MissingAuthorizationHeaderException.class)
    public ResponseEntity<RestErrorMessage> handleMissingAuthorizationHeader(
            MissingAuthorizationHeaderException exception) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        RestErrorMessage message = new RestErrorMessage(status, exception.getMessage());
        return ResponseEntity.status(status).body(message);
    }
}
