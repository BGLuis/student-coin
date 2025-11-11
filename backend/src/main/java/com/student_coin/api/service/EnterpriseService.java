package com.student_coin.api.service;

import com.student_coin.api.dto.AdvantagesDTO;
import com.student_coin.api.dto.request.EnterpriseRequest;
import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Account;
import com.student_coin.api.entity.Advantage;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.enums.Roles;
import com.student_coin.api.mapper.EnterpriseListMapper;
import com.student_coin.api.mapper.EnterpriseMapper;
import com.student_coin.api.mapper.UpdateEnterpriseMapper;
import com.student_coin.api.repository.AccountRepository;
import com.student_coin.api.repository.AdvantageRepository;
import com.student_coin.api.repository.EnterpriseRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EnterpriseService {
    @Lazy
    private PasswordEncoder encoder;

    private EnterpriseRepository enterpriseRepository;
    private AccountRepository accountRepository;
    private AdvantageRepository advantageRepository;
    private EnterpriseMapper enterpriseMapper;
    private EnterpriseListMapper listMapper;
    private UpdateEnterpriseMapper updateEnterpriseMapper;
    private EmailService emailService;

    @Transactional
    public EnterpriseResponse register(@Valid EnterpriseRequest register) {
        Enterprise enterprise = new Enterprise();
        enterprise.setEmail(register.email());
        enterprise.setCnpj(register.cnpj());
        enterprise.setName(register.name());
        enterprise.setPassword(encoder.encode(register.password()));
        enterprise.setRole(Roles.ROLE_ENTERPRISE);

        Account account = this.accountRepository.save(new Account());
        enterprise.setAccount(account);

        Enterprise data = enterpriseRepository.save(enterprise);

        emailService.sendWelcomeEmail(data.getEmail(), data.getName(), "Empresa");

        return enterpriseMapper.toEnterpriseResponse(data);
    }

    public Enterprise findById(Long id) {
        return enterpriseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Enterprise not found"));
    }

    public List<EnterpriseResponse> findAll() {
        return listMapper.toEnterpriseResponse(enterpriseRepository.findAll());
    }

    public void delete() {
        enterpriseRepository.delete((Enterprise) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    public EnterpriseResponse update(Enterprise enterprise, EnterpriseRequest data) {
        updateEnterpriseMapper.updateEnterpriseFromRequest(data, enterprise);
        if (data.password() != null) {
            enterprise.setPassword(encoder.encode(data.password()));
        }
        enterpriseRepository.save(enterprise);
        return enterpriseMapper.toEnterpriseResponse(enterprise);
    }

    public AdvantagesDTO findAllAdvantages(Pageable filters, Long enterpriseId) {
        Enterprise enterprise = this.findById(enterpriseId);
        Page<Advantage> advantages = this.advantageRepository.findByEnterprise(filters, enterprise);

        return new AdvantagesDTO(
                enterprise,
                advantages);
    }
}
