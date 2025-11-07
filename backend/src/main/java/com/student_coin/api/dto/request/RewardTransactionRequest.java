package com.student_coin.api.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RewardTransactionRequest(
        @NotNull(message = "Valor é obrigatório")
        @Min(value = 1, message = "Valor deve ser maior que zero")
        Integer value,

        @NotBlank(message = "Motivo é obrigatório")
        @Size(min = 3, max = 100, message = "Motivo deve ter entre 3 e 100 caracteres")
        String motive,

        @NotNull(message = "ID do estudante é obrigatório")
        Long studentId
) {
}
