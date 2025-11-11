package com.student_coin.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record StudentRequest(
        @NotBlank(message = "Nome é obrigatório")
        @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
        String name,

        @NotBlank(message = "RG é obrigatório")
        String rg,

        @NotBlank(message = "Curso é obrigatório")
        String course,

        String address,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Email deve ser válido")
        String email,

        @NotBlank(message = "CPF é obrigatório")
        @Size(min = 11, max = 14, message = "CPF deve ter entre 11 e 14 caracteres")
        String cpf,

        @NotBlank(message = "Instituição de ensino é obrigatória")
        String educationalInstitute,

        @NotBlank(message = "Senha é obrigatória")
        @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
        String password
) {
}
