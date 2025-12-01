package com.student_coin.api.controller;

import com.student_coin.api.dto.request.EnterpriseRequest;
import com.student_coin.api.dto.response.AdvantagesResponse;
import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.dto.response.RedeemValidationResponse;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.mapper.AdvantageMapper;
import com.student_coin.api.mapper.EnterpriseMapper;
import com.student_coin.api.mapper.RedeemValidationMapper;
import com.student_coin.api.service.EnterpriseService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enterprises")
@AllArgsConstructor
public class EnterpriseController {
    private EnterpriseService enterpriseService;
    private EnterpriseMapper enterpriseMapper;
    private AdvantageMapper advantageMapper;
    private RedeemValidationMapper redeemValidationMapper;



    @GetMapping("/me")
    public ResponseEntity<EnterpriseResponse> getMe(Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof Enterprise)) {
            return ResponseEntity.status(403).build();
        }
        Enterprise enterprise = (Enterprise) authentication.getPrincipal();
        return ResponseEntity.ok(enterpriseMapper.toEnterpriseResponse(enterprise));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnterpriseResponse> findEnterpriseByID(@PathVariable("id") Long id) {
        return ResponseEntity.ok(enterpriseMapper.toEnterpriseResponse(enterpriseService.findById(id)));
    }

    @GetMapping
    public ResponseEntity<List<EnterpriseResponse>> getAll() {
        return ResponseEntity.ok(enterpriseService.findAll());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EnterpriseResponse> update(
            @PathVariable("id") Long id,
            @Valid @RequestBody EnterpriseRequest data) {
        Enterprise enterprise = enterpriseService.findById(id);
        return ResponseEntity.ok().body(enterpriseService.update(enterprise, data));
    }

    @DeleteMapping("/me")
    public ResponseEntity<String> delete() {
        enterpriseService.delete();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/advantages")
    public ResponseEntity<AdvantagesResponse> getAdvantages(
            @PathVariable("id") Long enterpriseId,
            @PageableDefault Pageable filters) {
        AdvantagesResponse response = this.advantageMapper.toResponse(
                enterpriseService.findAllAdvantages(filters, enterpriseId));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate-redeem/{coupon}")
    public ResponseEntity<RedeemValidationResponse> validateRedeemed(Authentication authentication,
            @PathVariable String coupon) {
        return ResponseEntity.ok(this.redeemValidationMapper
                .toResponse(this.enterpriseService.validateRedeem(
                        (Enterprise) authentication.getPrincipal(), coupon)));
    }
}
