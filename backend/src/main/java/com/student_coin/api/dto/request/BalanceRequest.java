package com.student_coin.api.dto.request;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Pageable;

public record BalanceRequest(
        @NotNull(message = "Informações de paginação são obrigatórias")
        Pageable pageable
) {
}
