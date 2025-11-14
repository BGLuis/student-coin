package com.student_coin.api.dto.response;

import java.time.LocalDateTime;

public record RedeemValidationResponse(
        LocalDateTime usedAt) {
}
