package com.student_coin.api.dto.request;

public record RegisterStudentRequest(
        String name,
        String rg,
        String course,
        String address,
        String email,
        String cpf,
        String educationalInstitute,
        String password) {
}
