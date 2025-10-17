package com.student_coin.api.mapper;

import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Enterprise;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EnterpriseListMapper {
    List<EnterpriseResponse> toEnterpriseResponse(List<Enterprise> enterprises);
}
