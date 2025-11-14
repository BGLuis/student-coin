package com.student_coin.api.dto;

import com.student_coin.api.entity.Advantage;
import com.student_coin.api.entity.Enterprise;
import org.springframework.data.domain.Page;

public record AdvantagesDTO(
        Enterprise enterprise,
        Page<Advantage> advantages
) {
}
