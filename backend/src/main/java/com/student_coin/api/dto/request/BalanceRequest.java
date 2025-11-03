package com.student_coin.api.dto.request;

import org.springframework.data.domain.Pageable;

public record BalanceRequest(
        Pageable pageable
) {
}
