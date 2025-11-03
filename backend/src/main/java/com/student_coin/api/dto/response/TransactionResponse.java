package com.student_coin.api.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public abstract class TransactionResponse {
    private String uuid;
    private Integer value;
    private LocalDateTime createdAt;
}
