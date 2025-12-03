package com.student_coin.api.config;

import com.mailersend.sdk.MailerSend;
import org.springframework.context.annotation.Bean;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;

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

    @NotNull
    private String token;

    @Bean
    public MailerSend mailerSend() {
        MailerSend mailerSend = new MailerSend();
        mailerSend.setToken(this.token);
        return mailerSend;
    }


}
