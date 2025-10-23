package com.student_coin.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EnterpriseRequest(
        @NotBlank
        String cnpj,
        @NotBlank
        String name,
        @NotBlank
        String password,
        @NotBlank
        @Email
        String email
) {
}
