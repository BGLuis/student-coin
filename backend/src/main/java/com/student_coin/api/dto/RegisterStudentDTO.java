package com.student_coin.api.dto;

public record RegisterStudentDTO(
        String name,
        String rg,
        String course,
        String address,
        String email,
        String cpf,
        String educationalInstitute,
        String password) {
}
