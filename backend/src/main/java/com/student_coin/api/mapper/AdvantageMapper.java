package com.student_coin.api.mapper;

import com.student_coin.api.dto.AdvantagesDTO;
import com.student_coin.api.dto.request.AdvantageRequest;
import com.student_coin.api.dto.response.AdvantageResponse;
import com.student_coin.api.dto.response.AdvantagesResponse;
import com.student_coin.api.entity.Advantage;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface AdvantageMapper {
    Advantage toAdvantage(AdvantageRequest request);
    AdvantageResponse toResponse(Advantage advantage);
    AdvantagesResponse toResponse(AdvantagesDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void toAdvantage(AdvantageRequest request, @MappingTarget Advantage advantage);
}
