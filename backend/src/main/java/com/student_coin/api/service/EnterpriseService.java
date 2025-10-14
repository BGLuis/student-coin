package com.student_coin.api.service;

import com.student_coin.api.dto.RegisterDTO;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.entity.Student;
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

    public Enterprise register(@Valid RegisterDTO register) {
        Enterprise enterprise = new Enterprise();
        enterprise.setName(register.name());
        enterprise.setPassword(encoder.encode(register.password()));
        return enterpriseRepository.save(enterprise);
    }
}
