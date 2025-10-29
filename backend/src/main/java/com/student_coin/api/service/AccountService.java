package com.student_coin.api.service;

import com.student_coin.api.dto.request.RewardTransactionRequest;
import com.student_coin.api.entity.RewardTransaction;
import com.student_coin.api.entity.Student;
import com.student_coin.api.entity.Teacher;
import com.student_coin.api.repository.RewardTransactionRepository;
import com.student_coin.api.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountService {
    private final StudentRepository studentRepository;
    private final RewardTransactionRepository rewardTransactionRepository;

    public RewardTransaction rewardStudent(Teacher teacher, String uuid, RewardTransactionRequest reward) {
        Student student = studentRepository.findById(reward.studentId()).orElseThrow(
                () -> new EntityNotFoundException("Student with id: " + reward.studentId() + " not found")
        );

        RewardTransaction transaction = rewardTransactionRepository.findByUuid(uuid).orElseGet(() -> {
            RewardTransaction defaultTransaction = new RewardTransaction();
            defaultTransaction.setUuid(uuid);
            return defaultTransaction;
        });
        transaction.setValue(reward.value());
        transaction.setOrigin(teacher.getAccount());
        transaction.setDestination(student.getAccount());
        transaction.setMotive(reward.motive());

        return rewardTransactionRepository.save(transaction);
    }
}
