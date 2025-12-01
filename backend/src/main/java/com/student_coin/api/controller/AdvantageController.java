package com.student_coin.api.controller;

import com.student_coin.api.dto.request.AdvantageRequest;
import com.student_coin.api.dto.response.AdvantageResponse;
import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.entity.Advantage;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.mapper.AdvantageMapper;
import com.student_coin.api.mapper.EnterpriseMapper;
import com.student_coin.api.service.AdvantageService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/advantages")
@AllArgsConstructor
public class AdvantageController {
    private final AdvantageService advantageService;

    private final AdvantageMapper advantageMapper;
    private final EnterpriseMapper enterpriseMapper;

    @GetMapping
    public ResponseEntity<Page<AdvantageResponse>> getAllAdvantages(
            @PageableDefault Pageable filters
    ) {
        Page<AdvantageResponse> response = this.advantageMapper.mapPage(
                advantageService.findAll(filters)
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/enterprise")
    public ResponseEntity<EnterpriseResponse> getAdvantageEnterprise(
            @PathVariable("id") Long advantageId
    ) {
        EnterpriseResponse response = this.enterpriseMapper.toEnterpriseResponse(
                advantageService.findEnterpriseByAdvantageId(advantageId)
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdvantageResponse> getAdvantage(
            @PathVariable("id") Long advantageId
    ) {
        AdvantageResponse response = this.advantageMapper.toResponse(
                advantageService.findAdvantageById(advantageId)
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AdvantageResponse> registerAdvantage(
            Authentication authentication,
            @Valid AdvantageRequest advantage
    ) throws IOException {
        AdvantageResponse response = this.advantageMapper.toResponse(
                advantageService.register(
                        (Enterprise) authentication.getPrincipal(),
                        advantage
                )
        );
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AdvantageResponse> updateAdvantage(
            @PathVariable(name = "id") Long advantageId,
            @RequestBody @Valid AdvantageRequest advantageRequest,
            Authentication authentication
    ) {
        AdvantageResponse response = this.advantageMapper.toResponse(
                advantageService.update(
                        advantageId,
                        advantageRequest,
                        (Enterprise) authentication.getPrincipal()
                )
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdvantage(
            @PathVariable(name = "id") Long advantageId,
            Authentication authentication
    ) {
        advantageService.delete(
                advantageId,
                (Enterprise) authentication.getPrincipal()
        );
        return ResponseEntity.noContent().build();
    }
}
