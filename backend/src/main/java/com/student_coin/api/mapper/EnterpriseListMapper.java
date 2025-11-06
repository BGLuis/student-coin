package com.student_coin.api.mapper;

import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Enterprise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EnterpriseListMapper {
    @Mapping(target = "roles", source = "role")
    EnterpriseResponse toEnterpriseResponseItem(Enterprise enterprise);

    List<EnterpriseResponse> toEnterpriseResponse(List<Enterprise> enterprises);
}
