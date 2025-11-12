package com.student_coin.api.service;

import com.student_coin.api.dto.request.AdvantageRequest;
import com.student_coin.api.entity.Advantage;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.mapper.AdvantageMapper;
import com.student_coin.api.repository.AdvantageRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AdvantageService {
    private final AdvantageRepository advantageRepository;

    private final AdvantageMapper advantageMapper;



    private final StorageImageFileService storageImageFileService;

    public Page<Advantage> findAll(Pageable filters) {
        return this.advantageRepository.findAll(filters);
    }

    public Enterprise findEnterpriseByAdvantageId(Long advantageId) {
        Advantage advantage = this.advantageRepository.findById(advantageId)
                .orElseThrow(() -> new EntityNotFoundException("Advantage not found"));
        return advantage.getEnterprise();
    }

    public Advantage register(Enterprise enterprise, AdvantageRequest advantageRequest) throws IOException {
        String imageUrl = this.saveImage(UUID.randomUUID().toString(), advantageRequest.image());

        Advantage advantage = this.advantageMapper.toAdvantage(advantageRequest);
        advantage.setEnterprise(enterprise);
        advantage.setImageUrl(imageUrl);
        return this.advantageRepository.save(advantage);
    }

    private String saveImage(String uuid, MultipartFile image) {
        return this.storageImageFileService.uploadFile(
                image,
                uuid
        );
    }

    public Advantage update(
            Long advantageId,
            AdvantageRequest advantageRequest,
            Enterprise enterprise
    ) {
        Advantage advantage = this.advantageRepository.findById(advantageId)
                .orElseThrow(() -> new EntityNotFoundException("Advantage not found"));

        if (!advantage.getEnterprise().getId().equals(enterprise.getId())) {
            throw new SecurityException("You do not have permission to update this advantage");
        }

        this.advantageMapper.toAdvantage(advantageRequest, advantage);
        return this.advantageRepository.save(advantage);
    }

    public void delete(Long advantageId, Enterprise enterprise) {
        Advantage advantage = this.advantageRepository.findById(advantageId)
                .orElseThrow(() -> new EntityNotFoundException("Advantage not found"));

        if (!advantage.getEnterprise().getId().equals(enterprise.getId())) {
            throw new SecurityException("You do not have permission to delete this advantage");
        }

        this.advantageRepository.delete(advantage);
    }

    public Advantage findAdvantageById(Long advantageId) {
        return this.advantageRepository.findById(advantageId)
                .orElseThrow(() -> new EntityNotFoundException("Advantage not found"));
    }
}
