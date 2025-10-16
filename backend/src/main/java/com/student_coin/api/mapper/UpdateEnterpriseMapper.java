package com.student_coin.api.mapper;

import com.student_coin.api.dto.request.EnterpriseRequest;
import com.student_coin.api.entity.Enterprise;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UpdateEnterpriseMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEnterpriseFromRequest(EnterpriseRequest request, @MappingTarget Enterprise enterprise);
}
