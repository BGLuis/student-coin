package com.student_coin.api.dto.response;

import org.springframework.data.domain.Page;

public record BalanceResponse(
        Integer balance,
        Page<TransactionResponse> transactions
) {}
