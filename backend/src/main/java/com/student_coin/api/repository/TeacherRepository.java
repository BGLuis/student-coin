package com.student_coin.api.repository;

import com.student_coin.api.entity.Student;
import com.student_coin.api.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findTeacherByName(String name);
}
