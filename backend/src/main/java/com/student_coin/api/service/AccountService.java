package com.student_coin.api.service;

import com.student_coin.api.dto.request.RewardTransactionRequest;
import com.student_coin.api.entity.Account;
import com.student_coin.api.entity.RewardTransaction;
import com.student_coin.api.entity.Student;
import com.student_coin.api.entity.Teacher;
import com.student_coin.api.exception.NotEnoughBalanceException;
import com.student_coin.api.repository.AccountRepository;
import com.student_coin.api.repository.RewardTransactionRepository;
import com.student_coin.api.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class AccountService {
    private final StudentRepository studentRepository;
    private final RewardTransactionRepository rewardTransactionRepository;
    private final AccountRepository accountRepository;

    private void processTransaction(Account origin, Account destination, Integer value) {
        if (origin.getBalance().compareTo(value) < 0) {
            throw new NotEnoughBalanceException("You have not enough balance");
        }

        origin.setBalance(origin.getBalance() - value);
        destination.setBalance(destination.getBalance() + value);

        accountRepository.save(origin);
        accountRepository.save(destination);
    }

    private RewardTransaction rollbackTransaction(RewardTransaction transaction) {
        processTransaction(transaction.getOrigin(), transaction.getDestination(), -transaction.getValue());
        return transaction;
    }

    private RewardTransaction processReward(RewardTransaction transaction) {
        this.processTransaction(transaction.getOrigin(), transaction.getDestination(), transaction.getValue());
        return transaction;
    }

    private RewardTransaction generateDefaultRewardTransaction(String uuid) {
        RewardTransaction defaultTransaction = new RewardTransaction();
        defaultTransaction.setUuid(uuid);
        return defaultTransaction;
    }

    public RewardTransaction rewardStudent(Teacher teacher, String uuid, RewardTransactionRequest reward) {
        Student student = studentRepository.findById(reward.studentId()).orElseThrow(
                () -> new EntityNotFoundException("Student with id: " + reward.studentId() + " not found")
        );

        Optional<RewardTransaction> optionalTransaction = rewardTransactionRepository.findByUuid(uuid);
        RewardTransaction transaction = optionalTransaction.map(this::rollbackTransaction).orElseGet(() -> generateDefaultRewardTransaction(uuid));
        transaction.setValue(reward.value());
        transaction.setOrigin(teacher.getAccount());
        transaction.setDestination(student.getAccount());
        transaction.setMotive(reward.motive());

        return this.processReward(transaction);
    }
}
