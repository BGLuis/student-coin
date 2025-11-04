package com.student_coin.api.repository;

import com.student_coin.api.entity.Advantage;
import com.student_coin.api.entity.Enterprise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvantageRepository extends JpaRepository<Advantage, Long> {
    Page<Advantage> findByEnterprise(Pageable filters, Enterprise enterprise);
}
