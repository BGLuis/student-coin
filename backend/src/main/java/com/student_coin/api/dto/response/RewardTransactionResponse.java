package com.student_coin.api.dto.response;

import java.time.LocalDateTime;

public record RewardTransactionResponse(
        String uuid,
        Integer value,
        LocalDateTime createdAt,
        String motive
) {
}
