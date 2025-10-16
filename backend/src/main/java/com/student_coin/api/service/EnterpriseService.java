package com.student_coin.api.service;

import com.student_coin.api.dto.request.EnterpriseRequest;
import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.mapper.EnterpriseMapper;
import com.student_coin.api.repository.EnterpriseRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EnterpriseService {

    @Autowired
    @Lazy
    private PasswordEncoder encoder;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private EnterpriseMapper enterpriseMapper;

    public EnterpriseResponse register(@Valid EnterpriseRequest register) {
        Enterprise enterprise = new Enterprise();
        enterprise.setEmail(register.email());
        enterprise.setCnpj(register.cnpj());
        enterprise.setName(register.name());
        enterprise.setPassword(encoder.encode(register.password()));
        Enterprise data = enterpriseRepository.save(enterprise);
        return enterpriseMapper.toEnterpriseResponse(data);
    }
}
