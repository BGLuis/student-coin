package com.student_coin.api.controller;

import com.student_coin.api.dto.request.BalanceRequest;
import com.student_coin.api.dto.request.RewardTransactionRequest;
import com.student_coin.api.dto.response.RewardTransactionResponse;
import com.student_coin.api.dto.response.RedeemTransactionResponse;
import com.student_coin.api.entity.Person;
import com.student_coin.api.entity.Teacher;
import com.student_coin.api.entity.Transaction;
import com.student_coin.api.mapper.TransactionMapper;
import com.student_coin.api.service.AccountService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.hibernate.validator.constraints.UUID;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@AllArgsConstructor
public class AccountController {
    private final AccountService accountService;

    private final TransactionMapper transactionMapper;

    @PutMapping("/reward/{uuid}")
    public ResponseEntity<RewardTransactionResponse> rewardStudent(
            Authentication authentication,
            @PathVariable @Valid @UUID String uuid,
            @Valid @RequestBody RewardTransactionRequest reward
    ) {
        return ResponseEntity.ok(transactionMapper.toRewardResponse(accountService.rewardStudent((Teacher) authentication.getPrincipal(), uuid, reward)));
    }

    @PutMapping("/redeem/{uuid}")
    public ResponseEntity<RedeemTransactionResponse> redeemAdvantage(@PathVariable @Valid @UUID String uuid) {
        return null;
    }

    @GetMapping("/balance")
    public ResponseEntity<BalanceResponse> getBalance(
            Authentication authentication,
            @Valid BalanceRequest filters
    ) {
        Page<Transaction> result = this.accountService.getBalance(
                (Person) authentication.getPrincipal(),
                filters
        );
        result.map(this.transactionMapper::toTransactionResponse);
        return this.transactionMapper.toTransactionResponseList();
    }
}
