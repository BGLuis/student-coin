package com.student_coin.api.repository;

import com.student_coin.api.entity.RewardTransaction;
import com.student_coin.api.entity.TransactionRedeem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RewardTransactionRepository extends JpaRepository<RewardTransaction, Long> {
    Optional<RewardTransaction> findByUuid(String uuid);
}
