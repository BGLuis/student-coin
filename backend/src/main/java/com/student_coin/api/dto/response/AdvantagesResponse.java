package com.student_coin.api.dto.response;

import org.springframework.data.domain.Page;

public record AdvantagesResponse(
        EnterpriseResponse enterprise,
        Page<AdvantageResponse> advantages
) {
}
