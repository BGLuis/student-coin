package com.student_coin.api.entity;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class RewardTransaction extends Transaction {
    private String motive;
}
