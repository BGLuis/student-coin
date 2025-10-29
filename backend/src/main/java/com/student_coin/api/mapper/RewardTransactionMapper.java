package com.student_coin.api.mapper;

import com.student_coin.api.dto.response.RewardTransactionResponse;
import com.student_coin.api.entity.RewardTransaction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RewardTransactionMapper {
    RewardTransactionResponse toRewardResponse(RewardTransaction rewardTransaction);
}
