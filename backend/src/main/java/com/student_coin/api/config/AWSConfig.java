package com.student_coin.api.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.S3Uri;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@Validated
@ConfigurationProperties(prefix = "aws")
@Component
@Setter
@Getter
public class AWSConfig {
    @NotEmpty
    private String accessKey;

    @NotEmpty
    private String secretKey;


    private Region region = Region.US_EAST_1;

    @NotEmpty
    private String s3Url;

    @NotEmpty
    private String bucketName;

    public AWSCredentials credentials() {
        return new BasicAWSCredentials(
            accessKey,
            secretKey
        );
    }

    @Bean
    public S3Client s3Client() {
        AwsBasicCredentials credentials = AwsBasicCredentials.create(
            accessKey,
            secretKey
        );

        return S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .forcePathStyle(true)
                .endpointOverride(URI.create(String.valueOf(s3Url)))
                .region(region)
                .serviceConfiguration(S3Configuration.builder().build())
                .build();
    }
}
