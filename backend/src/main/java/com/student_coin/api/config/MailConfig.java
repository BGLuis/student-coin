package com.student_coin.api.config;

import org.springframework.validation.annotation.Validated;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.Setter;

@Validated
@ConfigurationProperties(prefix = "mail")
@Component
@Getter
@Setter
public class MailConfig {
    @NotNull
    private String domain;

    @NotNull
    private String frontURL;
}
