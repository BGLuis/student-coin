package com.student_coin.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.services.sqs.SqsAsyncClient;

import java.net.URI;

@Configuration
public class SQSConfig {

    @Bean
    public SqsAsyncClient sqsAsyncClient(AWSConfig awsConfig) {
        return SqsAsyncClient.builder()
                .endpointOverride(URI.create(awsConfig.getCdnUrl()))
                .region(awsConfig.getRegion())
                .build();
    }
}
