package com.student_coin.api.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

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

    private String region = Regions.US_EAST_1.getName();
    private Optional<String> s3Url = Optional.empty();

    public AWSCredentials credentials() {
        return new BasicAWSCredentials(
            accessKey,
            secretKey
        );
    }

    @Bean
    public AmazonS3 s3Client() {
        AmazonS3ClientBuilder builder = AmazonS3ClientBuilder
                .standard();
        if (s3Url.isPresent()) {builder.withEndpointConfiguration(
                    new AwsClientBuilder.EndpointConfiguration(
                            s3Url.get(),
                            this.region
                    )
            );
            builder.enablePathStyleAccess();
        } else {
            builder.withRegion(this.region);
        }
        return builder
                .withCredentials(new AWSStaticCredentialsProvider(this.credentials()))
                .build();
    }
}
