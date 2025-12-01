package com.student_coin.api.service;

import com.student_coin.api.dto.AdvantagesDTO;
import com.student_coin.api.dto.request.EnterpriseRequest;
import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Account;
import com.student_coin.api.entity.Advantage;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.entity.Student;
import com.student_coin.api.entity.Teacher;
import com.student_coin.api.entity.TransactionRedeem;
import com.student_coin.api.enums.Roles;
import com.student_coin.api.exception.UsedCouponException;
import com.student_coin.api.mapper.EnterpriseListMapper;
import com.student_coin.api.mapper.EnterpriseMapper;
import com.student_coin.api.mapper.UpdateEnterpriseMapper;
import com.student_coin.api.repository.AccountRepository;
import com.student_coin.api.repository.AdvantageRepository;
import com.student_coin.api.repository.EnterpriseRepository;
import com.student_coin.api.repository.StudentRepository;
import com.student_coin.api.repository.TeacherRepository;
import com.student_coin.api.repository.TransactionRedeemRepository;

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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EnterpriseService {
    @Lazy
    private PasswordEncoder encoder;

    private EnterpriseRepository enterpriseRepository;
    private AccountRepository accountRepository;
    private AdvantageRepository advantageRepository;
    private TransactionRedeemRepository transactionRedeemRepository;
    private StudentRepository studentRepository;
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

    public TransactionRedeem validateRedeem(Enterprise enterprise, String coupon) {
        TransactionRedeem transaction = this.transactionRedeemRepository.findByCoupon(coupon)
                .orElseThrow(() -> new EntityNotFoundException("The coupon " + coupon + " is not valid"));
        if (!transaction.getAdvantage().getEnterprise().getId().equals(enterprise.getId())) {
            throw new SecurityException("You are not allowed to validate that code");
        }
        if (transaction.getUsedAt() != null) {
            throw new UsedCouponException("Coupon " + coupon + " already redeemed");
        }
        Student student = this.studentRepository.findByAccount_Id(transaction.getOrigin().getId())
                .orElseThrow(() -> new EntityNotFoundException("Student with account not found"));
        transaction.setUsedAt(LocalDateTime.now());
        transaction = this.transactionRedeemRepository.save(transaction);
        this.emailService.sendCodeValidatedEmail(
                student.getEmail(),
                student.getName(),
                transaction.getAdvantage(),
                enterprise.getName(),
                coupon,
                transaction.getUsedAt());
        return transaction;
    }
}
