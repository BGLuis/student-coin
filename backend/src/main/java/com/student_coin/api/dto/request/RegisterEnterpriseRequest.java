package com.student_coin.api.dto.request;

public record RegisterEnterpriseRequest(
        String cnpj,
        String name,
        String password,
        String email
) {
}
