package com.student_coin.api.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record AdvantageRequest(
        @Size(min = 3, max = 255, message = "Description must be between 3 and 255 characters")
        String description,
        @Min(value = 1, message = "Price must be at least 1")
        Integer price
) {
}
