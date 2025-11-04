package com.student_coin.api.dto.response;

public record AdvantageResponse(
        String description,
        String imageUrl,
        Integer price
) {}