package com.student_coin.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue(value = "REDEEM")
public class TransactionRedeem extends Transaction {
    private String cupom;
}
