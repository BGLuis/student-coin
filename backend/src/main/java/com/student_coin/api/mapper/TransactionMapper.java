package com.student_coin.api.mapper;

import com.student_coin.api.dto.response.RedeemTransactionResponse;
import com.student_coin.api.dto.response.RewardTransactionResponse;
import com.student_coin.api.dto.response.TransactionResponse;
import com.student_coin.api.entity.RewardTransaction;
import com.student_coin.api.entity.Transaction;
import com.student_coin.api.entity.TransactionRedeem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.SubclassExhaustiveStrategy;
import org.mapstruct.SubclassMapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", subclassExhaustiveStrategy = SubclassExhaustiveStrategy.RUNTIME_EXCEPTION)
public interface TransactionMapper {
    @Mapping(target = "createdAt", source = "createTime")
    RewardTransactionResponse toRewardResponse(RewardTransaction rewardTransaction);

    @Mapping(target = "createdAt", source = "createTime")
    @SubclassMapping(source = TransactionRedeem.class, target = RedeemTransactionResponse.class)
    @SubclassMapping(source = RewardTransaction.class, target = RewardTransactionResponse.class)
    TransactionResponse toTransactionResponse(Transaction transaction);

    default Page<TransactionResponse> toTransactionResponsePage(Page<Transaction> transactionList) {
        return transactionList.map(this::toTransactionResponse);
    }
}
