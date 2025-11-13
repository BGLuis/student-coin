package com.student_coin.api.config;

import com.student_coin.api.enums.Bucket;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.S3Client;

@Component
@AllArgsConstructor
public class CDNConfig implements CommandLineRunner {
    private final S3Client s3Client;

    @Override
    public void run(String... args) {
        for (Bucket bucket : Bucket.values()) {
            this.s3Client.createBucket(builder -> {
                builder.bucket(bucket.getName());
            });
        }
    }
}
