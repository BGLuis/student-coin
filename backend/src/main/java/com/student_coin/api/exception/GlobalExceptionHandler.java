package com.student_coin.api.exception;

import com.student_coin.api.exception.message.RestErrorMessage;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException exception,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {

        Map<String, Object> errors = new HashMap<>();
        errors.put("status", HttpStatus.BAD_REQUEST.value());
        errors.put("message", "Erro de validação");

        Map<String, String> fieldErrors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            fieldErrors.put(fieldName, errorMessage);
        });
        errors.put("errors", fieldErrors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

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

    @ExceptionHandler(NotEnoughBalanceException.class)
    public ResponseEntity<RestErrorMessage> handleNotEnoughBalance(
            NotEnoughBalanceException exception) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        RestErrorMessage message = new RestErrorMessage(status, exception.getMessage());
        return ResponseEntity.status(status).body(message);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<RestErrorMessage> handleInvalidCredentials(
            InvalidCredentialsException exception) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        RestErrorMessage message = new RestErrorMessage(status, exception.getMessage());
        return ResponseEntity.status(status).body(message);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<RestErrorMessage> handleDuplicateResource(
            DuplicateResourceException exception) {
        HttpStatus status = HttpStatus.CONFLICT;
        RestErrorMessage message = new RestErrorMessage(status, exception.getMessage());
        return ResponseEntity.status(status).body(message);
    }

    @ExceptionHandler(InvalidRequestException.class)
    public ResponseEntity<RestErrorMessage> handleInvalidRequest(
            InvalidRequestException exception) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        RestErrorMessage message = new RestErrorMessage(status, exception.getMessage());
        return ResponseEntity.status(status).body(message);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<RestErrorMessage> handleIllegalArgument(
            IllegalArgumentException exception) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        RestErrorMessage message = new RestErrorMessage(status, exception.getMessage());
        return ResponseEntity.status(status).body(message);
    }

    @ExceptionHandler(UsedCouponException.class)
    public ResponseEntity<RestErrorMessage> handleUsedCoupon(
            UsedCouponException exception) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        RestErrorMessage message = new RestErrorMessage(status, exception.getMessage());
        return ResponseEntity.status(status).body(message);
    }
}
