package com.student_coin.api.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

import java.net.URI;

@Component
@AllArgsConstructor
public class S3Config {
    private final AwsCredentialsProvider credentialsProvider;
    private final AWSConfig awsConfig;

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .credentialsProvider(credentialsProvider)
                .forcePathStyle(true)
                .endpointOverride(URI.create(awsConfig.getS3Url()))
                .region(awsConfig.getRegion())
                .serviceConfiguration(S3Configuration.builder().build())
                .build();
    }
}
