package com.student_coin.api.repository;

import com.student_coin.api.entity.TransactionRedeem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransactionRedeemRepository extends JpaRepository<TransactionRedeem, Long> {
    Optional<TransactionRedeem> findByUuid(String uuid);
}
