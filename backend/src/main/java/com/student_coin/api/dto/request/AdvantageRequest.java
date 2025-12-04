package com.student_coin.api.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record AdvantageRequest(
        @Size(min = 3, max = 80, message = "Title must be between 3 and 80 characters")
        String title,
        @Size(min = 3, max = 255, message = "Description must be between 3 and 255 characters")
        String description,
        @Min(value = 1, message = "Price must be at least 1")
        Integer price,
        MultipartFile image
) {
}
