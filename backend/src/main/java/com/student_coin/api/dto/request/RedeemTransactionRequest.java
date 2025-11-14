package com.student_coin.api.dto.request;

import jakarta.validation.constraints.NotNull;

public record RedeemTransactionRequest(@NotNull(message = "Advantage ID is mandatory") Long advantageId)
        implements TransactionRequest {
}
