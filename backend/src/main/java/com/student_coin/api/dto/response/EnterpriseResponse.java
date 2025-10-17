package com.student_coin.api.dto.response;

public record EnterpriseResponse(
        Long id,
        String cnpj,
        String name,
        String email
) {
}
