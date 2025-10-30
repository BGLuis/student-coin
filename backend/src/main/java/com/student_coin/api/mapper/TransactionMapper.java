package com.student_coin.api.mapper;

import com.student_coin.api.dto.response.RedeemTransactionResponse;
import com.student_coin.api.dto.response.RewardTransactionResponse;
import com.student_coin.api.entity.RewardTransaction;
import com.student_coin.api.entity.Transaction;
import com.student_coin.api.entity.TransactionRedeem;
import org.mapstruct.Mapper;
import org.mapstruct.SubclassMapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    RewardTransactionResponse toRewardResponse(RewardTransaction rewardTransaction);
    @SubclassMapping(source = TransactionRedeem.class, target = RedeemTransactionResponse.class)
    @SubclassMapping(source = RewardTransaction.class, target = RewardTransactionResponse.class)
    Class<?> toTransactionResponse(Transaction transactionList);
}
