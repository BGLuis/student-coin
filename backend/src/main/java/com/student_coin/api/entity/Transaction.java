package com.student_coin.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.UUID;

import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "transaction_type", discriminatorType = DiscriminatorType.STRING)
@Data
abstract public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @Column(unique = true)
    @UUID
    private String uuid;

    private Integer value;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createTime;

    @ManyToOne
    private Account origin;

    @ManyToOne(optional = false)
    private Account destination;
}
