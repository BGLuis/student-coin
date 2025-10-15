package com.student_coin.api.dto;

public record RegisterEnterpriseDTO(
        String cnpj,
        String name,
        String password,
        String email
) {
}
