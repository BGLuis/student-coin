package com.student_coin.api.mapper;

import org.mapstruct.Mapper;

import com.student_coin.api.dto.response.RedeemValidationResponse;
import com.student_coin.api.entity.TransactionRedeem;

@Mapper(componentModel = "spring")
public interface RedeemValidationMapper {
    RedeemValidationResponse toResponse(TransactionRedeem transaction);
}
