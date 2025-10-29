package com.student_coin.api.controller;

import com.student_coin.api.dto.request.RewardTransactionRequest;
import com.student_coin.api.dto.response.RewardTransactionResponse;
import com.student_coin.api.dto.response.RedeemTransactionResponse;
import com.student_coin.api.entity.Teacher;
import com.student_coin.api.mapper.RewardTransactionMapper;
import com.student_coin.api.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/account")
@AllArgsConstructor
public class AccountController {
    private final AccountService accountService;

    private final RewardTransactionMapper rewardTransactionMapper;

    @PutMapping("/reward/{uuid}")
    public ResponseEntity<RewardTransactionResponse> rewardStudent(Authentication authentication, @PathVariable String uuid, @RequestBody RewardTransactionRequest reward) {
        return ResponseEntity.ok(rewardTransactionMapper.toRewardResponse(accountService.rewardStudent((Teacher) authentication.getPrincipal(), uuid, reward)));
    }

    @PutMapping("/redeem/{uuid}")
    public ResponseEntity<RedeemTransactionResponse> redeemAdvantage(@PathVariable String uuid) {
        return null;
    }
}
