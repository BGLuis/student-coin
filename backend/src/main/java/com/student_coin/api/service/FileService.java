package com.student_coin.api.service;

import com.student_coin.api.config.AWSConfig;
import com.student_coin.api.enums.Bucket;
import com.student_coin.api.exception.FileParsingException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;
import java.util.Objects;

@Service
@AllArgsConstructor
@Getter
@Setter
public class FileService {
    private final S3Client s3Client;
    private final AWSConfig awsConfig;

    public String uploadFile(MultipartFile multipartFile, String uuid, Bucket bucket) {
        File convertedFile = convertMultipartFileToFile(multipartFile);
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket.getName())
                .key(uuid)
                .build();
        s3Client.putObject(putObjectRequest, convertedFile.toPath());
        return awsConfig.getCdnUrl() + "/" + bucket.getName() + "/" + uuid;
    }

    private File convertMultipartFileToFile(MultipartFile multipartFile) {
        File convertedFile = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        try (var fos = new java.io.FileOutputStream(convertedFile)) {
            fos.write(multipartFile.getBytes());
        } catch (IOException e) {
            throw new FileParsingException("The received file could not be parsed");
        }
        return convertedFile;
    }

}
