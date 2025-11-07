package com.student_coin.api.dto.response;

public record AdvantageResponse(
        Long id,
        String description,
        String imageUrl,
        Integer price
) {}