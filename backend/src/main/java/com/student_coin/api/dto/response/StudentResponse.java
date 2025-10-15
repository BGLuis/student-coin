package com.student_coin.api.dto.response;

public record StudentResponse(
        String name,
        String course,
        String address,
        String email,
        String educationalInstitute
) {
}
