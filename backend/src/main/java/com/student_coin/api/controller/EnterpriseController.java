package com.student_coin.api.controller;


import com.student_coin.api.dto.request.EnterpriseRequest;
import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.mapper.EnterpriseMapper;
import com.student_coin.api.service.EnterpriseService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enterprises")
@AllArgsConstructor
public class EnterpriseController {
    private EnterpriseService enterpriseService;
    private EnterpriseMapper enterpriseMapper;

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
}
