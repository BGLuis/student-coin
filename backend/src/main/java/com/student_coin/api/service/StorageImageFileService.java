package com.student_coin.api.service;

import com.student_coin.api.config.AWSConfig;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.util.Objects;

@Service
@AllArgsConstructor
@Getter
@Setter
@ConfigurationProperties(prefix = "aws")
public class StorageImageFileService {

    private final S3Client s3Client;

    private final AWSConfig awsConfig;

    public String uploadFile(MultipartFile multipartFile, String uuid) {
        String fileName = uuid;
        File fileObject = convertMultipartFileToFile(multipartFile);
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(awsConfig.getBucketName())
                .key(fileName)
                .build();
        s3Client.putObject(putObjectRequest, fileObject.toPath());
        return awsConfig.getImageEndpointUrl() + "/" + awsConfig.getBucketName() + "/" + fileName;
    }

    private File convertMultipartFileToFile(MultipartFile multipartFile) {
        File convertedFile = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        try (var fos = new java.io.FileOutputStream(convertedFile)) {
            fos.write(multipartFile.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return convertedFile;
    }


}
