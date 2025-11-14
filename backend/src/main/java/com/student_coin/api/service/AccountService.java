package com.student_coin.api.service;

import com.student_coin.api.dto.BalanceDTO;
import com.student_coin.api.dto.request.BalanceRequest;
import com.student_coin.api.dto.request.RedeemTransactionRequest;
import com.student_coin.api.dto.request.RewardTransactionRequest;
import com.student_coin.api.entity.*;
import com.student_coin.api.exception.NotEnoughBalanceException;
import com.student_coin.api.repository.*;
import com.student_coin.api.utils.Base62;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class AccountService {
    private final StudentRepository studentRepository;
    private final EnterpriseRepository enterpriseRepository;
    private final RewardTransactionRepository rewardTransactionRepository;
    private final TransactionRedeemRepository transactionRedeemRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final AdvantageRepository advantageRepository;
    private final EmailService emailService;
    private final EntityManager entityManager;
    private final Base62 base62Util;

    public static final Integer COUPON_SIZE = 8;

    private void setGenericTransactionValues(Transaction transaction, Person origin, Person destination,
            Integer value) {
        transaction.setOrigin(origin.getAccount());
        transaction.setDestination(destination.getAccount());
        transaction.setValue(value);
    }

    private void processTransaction(Account origin, Account destination, Integer value) {
        origin.setBalance(origin.getBalance() - value);
        destination.setBalance(destination.getBalance() + value);

        accountRepository.save(origin);
        accountRepository.save(destination);
    }

    private <T extends Transaction> T generateDefaultTransaction(String uuid, Class<T> transactionClass) {
        try {
            T defaultTransaction = transactionClass.getDeclaredConstructor().newInstance();
            defaultTransaction.setUuid(uuid);
            return defaultTransaction;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao instanciar transação: " + transactionClass.getName(), e);
        }
    }

    private <T extends Transaction> T rollbackTransaction(T transaction) {
        processTransaction(transaction.getOrigin(), transaction.getDestination(), -transaction.getValue());
        return transaction;
    }

    private <T extends Transaction> T validateProcess(T transaction) {
        Account origin = transaction.getOrigin();
        if (origin == null || transaction.getDestination() == null) {
            throw new IllegalStateException("Transaction origin or destination cannot be null.");
        }

        if (origin.getBalance().compareTo(transaction.getValue()) < 0) {
            throw new NotEnoughBalanceException("Account id:" + origin.getId() + " has insufficient balance.");
        }

        this.processTransaction(origin, transaction.getDestination(), transaction.getValue());
        return transaction;
    }

    public RewardTransaction rewardStudent(Teacher teacher, String uuid, RewardTransactionRequest reward) {
        teacher = entityManager.merge(teacher);
        Student student = studentRepository.findById(reward.studentId()).orElseThrow(
                () -> new EntityNotFoundException("Student with id: " + reward.studentId() + " not found"));
        Optional<RewardTransaction> optionalTransaction = rewardTransactionRepository.findByUuid(uuid);
        RewardTransaction rewardTransaction = optionalTransaction.map(this::rollbackTransaction)
                .orElseGet(() -> generateDefaultTransaction(uuid, RewardTransaction.class));
        setGenericTransactionValues(rewardTransaction, teacher, student, reward.value());
        rewardTransaction.setMotive(reward.motive());
        rewardTransaction = this.validateProcess(rewardTransaction);

        emailService.sendCoinsReceivedEmail(student.getEmail(), student.getName(), reward.value(), teacher.getName(),
                reward.motive(), "Reward");
        return this.rewardTransactionRepository.save(rewardTransaction);
    }

    public TransactionRedeem redeemAdvantage(Student student, String uuid, RedeemTransactionRequest redeem) {
        student = entityManager.merge(student);
        Advantage advantage = advantageRepository.findById(redeem.advantageId()).orElseThrow(
                () -> new EntityNotFoundException("Advantage with id: " + redeem.advantageId() + " not found"));
        Enterprise enterprise = enterpriseRepository.findEnterpriseByAdvantagesContains(advantage).orElseThrow(
                () -> new EntityNotFoundException(
                        "Enterprise with advantage id: " + redeem.advantageId() + " not found"));
        Optional<TransactionRedeem> optionalTransaction = transactionRedeemRepository.findByUuid(uuid);
        TransactionRedeem redeemTransaction = optionalTransaction.map(this::rollbackTransaction)
                .orElseGet(() -> generateDefaultTransaction(uuid, TransactionRedeem.class));
        setGenericTransactionValues(redeemTransaction, student, enterprise, advantage.getPrice());
        redeemTransaction.setCoupon(this.base62Util.random(COUPON_SIZE));
        redeemTransaction.setAdvantage(advantage);
        redeemTransaction = this.validateProcess(redeemTransaction);

        emailService.sendAdvantageRedeemedEmail(student.getEmail(), student.getName(), advantage.getDescription(),
                advantage.getPrice(), student.getAccount().getBalance(), redeemTransaction.getCoupon());
        return this.transactionRedeemRepository.save(redeemTransaction);
    }

    @Transactional(readOnly = true)
    public BalanceDTO getBalance(
            Person target,
            BalanceRequest filters) {
        Page<Transaction> transactions = this.transactionRepository.findAllByDestination_IdOrOrigin_Id(
                target.getId(),
                target.getId(),
                filters.pageable()).map(transaction -> {
                    if (transaction.getOrigin().equals(target.getAccount())) {
                        transaction.setValue(-transaction.getValue());
                    }
                    return transaction;
                });

        return new BalanceDTO(
                target.getAccount().getBalance(),
                transactions);
    }
}
