package com.student_coin.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue(value = "REDEEM")
public class TransactionRedeem extends Transaction {
    @Column(unique = true)
    private String coupon;

    @Column(updatable = false)
    private LocalDateTime expiresAt = LocalDateTime.now().plusDays(30);

    private LocalDateTime usedAt;

    @ManyToOne(optional = false)
    private Advantage advantage;
}
