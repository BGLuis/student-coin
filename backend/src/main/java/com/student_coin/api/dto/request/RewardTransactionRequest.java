package com.student_coin.api.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RewardTransactionRequest(
        @Min(value = 1)
        Integer value,
        @Size(min = 3, max = 100)
        String motive,
        @NotNull
        Long studentId
) {
}
