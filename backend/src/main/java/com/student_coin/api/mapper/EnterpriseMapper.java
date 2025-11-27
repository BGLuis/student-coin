package com.student_coin.api.mapper;

import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Enterprise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EnterpriseMapper {
    @Mapping(target = "roles", source = "role")
    EnterpriseResponse toEnterpriseResponse(Enterprise enterprise);
}
