package com.student_coin.api.mapper;

import com.student_coin.api.dto.AdvantagesDTO;
import com.student_coin.api.dto.request.AdvantageRequest;
import com.student_coin.api.dto.response.AdvantageResponse;
import com.student_coin.api.dto.response.AdvantagesResponse;
import com.student_coin.api.entity.Advantage;

import org.mapstruct.*;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", subclassExhaustiveStrategy = SubclassExhaustiveStrategy.RUNTIME_EXCEPTION)
public interface AdvantageMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "enterprise", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    Advantage toAdvantage(AdvantageRequest request);

    AdvantageResponse toResponse(Advantage advantage);

    @Named("mapPage")
    default Page<AdvantageResponse> mapPage(Page<Advantage> advantages) {
        return advantages.map(this::toResponse);
    }

    @Mapping(source = "advantages", target = "advantages", qualifiedByName = "mapPage")
    AdvantagesResponse toResponse(AdvantagesDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "enterprise", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    void toAdvantage(AdvantageRequest request, @MappingTarget Advantage advantage);
}
