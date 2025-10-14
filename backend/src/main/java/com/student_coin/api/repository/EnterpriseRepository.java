package com.student_coin.api.repository;

import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
    Optional<Enterprise> findEnterpriseByName(String name);
}
