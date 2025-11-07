package com.student_coin.api.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;

public record PageRequest(
        @Positive Integer page,
        @Positive Integer offset,
        @Max(value = 100) Integer quantity
) {
    public PageRequest(Integer page, Integer offset, Integer quantity) {
        this.page = page == null ? 0 : page;
        this.offset = offset == null ? 0 : offset;
        this.quantity = quantity == null ? 20 : quantity;
    }
}
