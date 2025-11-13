package com.student_coin.api.config;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;

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
    private String cdnUrl;

    @Bean
    public StaticCredentialsProvider credentialsProvider() {
        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);
        return StaticCredentialsProvider.create(credentials);
    }
}
