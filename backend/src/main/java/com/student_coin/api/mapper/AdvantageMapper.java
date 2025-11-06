package com.student_coin.api.mapper;

import com.student_coin.api.dto.AdvantagesDTO;
import com.student_coin.api.dto.request.AdvantageRequest;
import com.student_coin.api.dto.response.AdvantageResponse;
import com.student_coin.api.dto.response.AdvantagesResponse;
import com.student_coin.api.entity.Advantage;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface AdvantageMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "enterprise", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    Advantage toAdvantage(AdvantageRequest request);

    AdvantageResponse toResponse(Advantage advantage);

    // Update the AdvantagesResponse mapping to handle Page properly
    default AdvantagesResponse toResponse(AdvantagesDTO dto) {
        if (dto == null) {
            return null;
        }

        Page<Advantage> advantages = dto.advantages();
        if (advantages == null) {
            return new AdvantagesResponse(null, null);
        }

        Page<AdvantageResponse> mappedAdvantages = advantages.map(this::toResponse);
        return new AdvantagesResponse(null, mappedAdvantages);
    }

    // Add page mapping method
    default Page<AdvantagesResponse> toResponse(Page<Advantage> advantages) {
        if (advantages == null) {
            return null;
        }
        return advantages.map(advantage -> {
            AdvantageResponse response = toResponse(advantage);
            return new AdvantagesResponse(null, null);  // You may need to adjust this based on your needs
        });
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "enterprise", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    void toAdvantage(AdvantageRequest request, @MappingTarget Advantage advantage);
}
