package com.student_coin.api.controller;


import com.student_coin.api.dto.request.EnterpriseRequest;
import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.mapper.EnterpriseMapper;
import com.student_coin.api.service.EnterpriseService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enterprises")
public class EnterpriseController {

    @Autowired
    private EnterpriseService enterpriseService;

    @Autowired
    private EnterpriseMapper enterpriseMapper;

    @GetMapping("/{id}")
    public ResponseEntity<EnterpriseResponse> findEnterpriseByID(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(enterpriseMapper.toEnterpriseResponse(enterpriseService.findById(id)));
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<EnterpriseResponse>> getAll() {
        return ResponseEntity.ok(enterpriseService.findAll());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EnterpriseResponse> update(@PathVariable("id") Long id, @RequestBody EnterpriseRequest data) {
        try {
            Enterprise enterprise = enterpriseService.findById(id);
            return ResponseEntity.ok().body(enterpriseService.update(enterprise, data));
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @DeleteMapping("/me")
    public ResponseEntity<String> delete() {
        enterpriseService.delete();
        return ResponseEntity.noContent().build();
    }
}
