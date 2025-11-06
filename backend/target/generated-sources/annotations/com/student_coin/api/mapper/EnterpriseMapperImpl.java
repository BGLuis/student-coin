package com.student_coin.api.mapper;

import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Enterprise;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-27T16:41:18+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class EnterpriseMapperImpl implements EnterpriseMapper {

    @Override
    public EnterpriseResponse toEnterpriseResponse(Enterprise enterprise) {
        if ( enterprise == null ) {
            return null;
        }

        Long id = null;
        String cnpj = null;
        String name = null;
        String email = null;

        id = enterprise.getId();
        cnpj = enterprise.getCnpj();
        name = enterprise.getName();
        email = enterprise.getEmail();

        EnterpriseResponse enterpriseResponse = new EnterpriseResponse( id, cnpj, name, email );

        return enterpriseResponse;
    }
}
