package com.student_coin.api.dto.response;

import com.student_coin.api.enums.Roles;

public record StudentResponse(
        Long id,
        String name,
        String cpf,
        String rg,
        String course,
        String address,
        String email,
        String educationalInstitute,
        Roles roles
) {
}
