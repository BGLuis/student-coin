package com.student_coin.api.mapper;

import com.student_coin.api.dto.request.EnterpriseRequest;
import com.student_coin.api.entity.Enterprise;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-27T16:41:18+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class UpdateEnterpriseMapperImpl implements UpdateEnterpriseMapper {

    @Override
    public void updateEnterpriseFromRequest(EnterpriseRequest request, Enterprise enterprise) {
        if ( request == null ) {
            return;
        }

        if ( request.name() != null ) {
            enterprise.setName( request.name() );
        }
        if ( request.password() != null ) {
            enterprise.setPassword( request.password() );
        }
        if ( request.email() != null ) {
            enterprise.setEmail( request.email() );
        }
        if ( request.cnpj() != null ) {
            enterprise.setCnpj( request.cnpj() );
        }
    }
}
