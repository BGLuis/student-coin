package com.student_coin.api.dto.request;

public record EnterpriseRequest(
        String cnpj,
        String name,
        String password,
        String email
) {
}
