package com.student_coin.api.controller;


import com.student_coin.api.dto.request.AdvantageRequest;
import com.student_coin.api.dto.request.EnterpriseRequest;
import com.student_coin.api.dto.response.AdvantageResponse;
import com.student_coin.api.dto.response.AdvantagesResponse;
import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.mapper.AdvantageMapper;
import com.student_coin.api.mapper.EnterpriseMapper;
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

    @GetMapping("/{id}")
    public ResponseEntity<EnterpriseResponse> findEnterpriseByID(@PathVariable("id") Long id) {
        return ResponseEntity.ok(enterpriseMapper.toEnterpriseResponse(enterpriseService.findById(id)));
    }

    @GetMapping
    public ResponseEntity<List<EnterpriseResponse>> getAll() {
        return ResponseEntity.ok(enterpriseService.findAll());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EnterpriseResponse> update(@PathVariable("id") Long id, @RequestBody EnterpriseRequest data) {
            Enterprise enterprise = enterpriseService.findById(id);
            return ResponseEntity.ok().body(enterpriseService.update(enterprise, data));
    }

    @DeleteMapping("/me")
    public ResponseEntity<String> delete() {
        enterpriseService.delete();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/advantages")
    public ResponseEntity<AdvantageResponse> registerAdvantage(
            Authentication authentication,
            @RequestBody @Valid AdvantageRequest advantage
    ) {
        AdvantageResponse response = this.advantageMapper.toResponse(
                enterpriseService.registerAdvantage(
                        (Enterprise) authentication.getPrincipal(),
                        advantage
                )
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/advantages/{id}")
    public ResponseEntity<AdvantagesResponse> getAdvantages(
            @PathVariable("id") Long enterpriseId,
            @PageableDefault Pageable filters
    ) {
        AdvantagesResponse response = this.advantageMapper.toResponse(
                enterpriseService.findAdvantages(filters, enterpriseId)
        );
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/advantages/{advantageId}")
    public ResponseEntity<AdvantageResponse> updateAdvantage(
            @PathVariable Long advantageId,
            @RequestBody @Valid AdvantageRequest advantageRequest,
            Authentication authentication
    ) {
        AdvantageResponse response = this.advantageMapper.toResponse(
                enterpriseService.updateAdvantage(
                        advantageId,
                        advantageRequest,
                        (Enterprise) authentication.getPrincipal()
                )
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/advantages/{advantageId}")
    public ResponseEntity<Void> deleteAdvantage(
            @PathVariable Long advantageId,
            Authentication authentication
    ) {
        enterpriseService.deleteAdvantage(
                advantageId,
                (Enterprise) authentication.getPrincipal()
        );
        return ResponseEntity.noContent().build();
    }
}
