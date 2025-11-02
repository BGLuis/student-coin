package com.student_coin.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@DiscriminatorValue(value = "REWARD")
public class RewardTransaction extends Transaction {
    private String motive;
}
