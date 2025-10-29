package com.student_coin.api.dto.request;

public record RewardTransactionRequest(
        Integer value,
        String motive,
        Long studentId
) {
}
