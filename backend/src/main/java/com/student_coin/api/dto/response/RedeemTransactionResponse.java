package com.student_coin.api.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RedeemTransactionResponse extends TransactionResponse {
    private String cupom;
}
