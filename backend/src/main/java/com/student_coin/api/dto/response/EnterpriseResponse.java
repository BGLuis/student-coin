package com.student_coin.api.dto.response;

import com.student_coin.api.enums.Roles;

public record EnterpriseResponse(
        Long id,
        String cnpj,
        String name,
        String email,
        Roles roles
) {
}
