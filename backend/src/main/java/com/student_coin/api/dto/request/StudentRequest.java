package com.student_coin.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record StudentRequest(
        @NotBlank
        String name,
        @NotBlank
        String rg,
        @NotBlank
        String course,
        String address,
        @Email
        String email,
        @NotBlank
        String cpf,
        @NotBlank
        String educationalInstitute,
        @NotBlank
        String password) {
}
