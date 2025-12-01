package com.student_coin.api.dto.response;

public record AdvantageResponse(
        Long id,
        String title,
        String description,
        String imageUrl,
        Integer price
) {}
