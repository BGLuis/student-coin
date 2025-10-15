package com.student_coin.api.config;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.time.DurationMin;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.crypto.SecretKey;
import java.time.Duration;

@Validated
@ConfigurationProperties(prefix = "jwt")
@Component
public class JWTConfig {
    @NotNull
    private String key;

    @NotEmpty
    private String issuer;

    @NotNull
    private String algorithm;

    public void setKey(@NotNull String key) {
        this.key = key;
    }

    @NotNull
    @DurationMin(seconds = 1)
    private Duration expiresIn;

    public @NotNull SecretKey getKey() {
        byte[] keyBites = Decoders.BASE64.decode(key);
        return Keys.hmacShaKeyFor(keyBites);
    }

    public @NotEmpty String getIssuer() {
        return issuer;
    }

    public void setIssuer(@NotEmpty String issuer) {
        this.issuer = issuer;
    }

    public @NotNull String getAlgorithm() {
        return algorithm;
    }

    public void setAlgorithm(@NotNull String algorithm) {
        this.algorithm = algorithm;
    }

    public @NotNull @DurationMin(seconds = 1) Duration getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(@NotNull @DurationMin(seconds = 1) Duration expiresIn) {
        this.expiresIn = expiresIn;
    }
}
