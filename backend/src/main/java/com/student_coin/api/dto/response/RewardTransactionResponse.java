package com.student_coin.api.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RewardTransactionResponse extends TransactionResponse {
    private String motive;
}
