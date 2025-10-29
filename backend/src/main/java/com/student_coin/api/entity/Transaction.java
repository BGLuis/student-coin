package com.student_coin.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.validator.constraints.UUID;

import java.time.LocalDateTime;

@MappedSuperclass
@Data
abstract public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
