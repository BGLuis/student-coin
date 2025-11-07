package com.student_coin.api.mapper;

import com.student_coin.api.dto.BalanceDTO;
import com.student_coin.api.dto.response.BalanceResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {TransactionMapper.class})
public interface BalanceMapper {
    BalanceResponse toBalanceResponse(BalanceDTO balance);
}
