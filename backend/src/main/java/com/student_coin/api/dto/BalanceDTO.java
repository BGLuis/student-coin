package com.student_coin.api.dto;

import com.student_coin.api.entity.Transaction;
import org.springframework.data.domain.Page;

public record BalanceDTO(
        Integer balance,
        Page<Transaction> transactions
) {}
