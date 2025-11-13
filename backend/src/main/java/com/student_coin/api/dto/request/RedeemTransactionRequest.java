package com.student_coin.api.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RedeemTransactionRequest (
        @NotNull(message = "ID da empresa é obrigatório")
        Long advantageId
) implements TransactionRequest{
}
