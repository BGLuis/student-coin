package com.student_coin.api.entity;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class TransactionRedeem extends Transaction {
    private String cupom;
}
