package com.student_coin.api.service;

import com.mailersend.sdk.MailerSend;
import com.mailersend.sdk.MailerSendResponse;
import com.mailersend.sdk.emails.Attachment;
import com.mailersend.sdk.emails.Email;
import com.mailersend.sdk.exceptions.MailerSendException;
import com.student_coin.api.config.MailConfig;
import com.student_coin.api.entity.Advantage;
import com.student_coin.api.utils.QRCode;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

@Slf4j
@Service
@AllArgsConstructor
public class EmailService {

    private final TemplateEngine templateEngine;
    private final MailerSend mailerSend;
    private final MailConfig mailConfig;


    public void sendEmail(String to, String subject, String templateName, Map<String, Object> variables)
            throws MessagingException, MailerSendException {
        sendEmail(to, subject, templateName, variables, null);
    }

    public void sendEmail(String to, String subject, String templateName, Map<String, Object> variables,
                          Map<String, byte[]> images)
            throws MessagingException, MailerSendException {

        Email email = new Email();
        email.subject = subject;
        email.addRecipient(null, to);
        email.setFrom(null, "noreply@" + mailConfig.getDomain());
        Context context = new Context();
        context.setVariables(variables);
        email.html = templateEngine.process(templateName, context);

        if (images != null) {
            for (Entry<String, byte[]> each : images.entrySet()) {
                Attachment attachment = new Attachment();
                attachment.id = each.getKey();
                attachment.filename = each.getKey();
                attachment.content = Base64.getEncoder().encodeToString(each.getValue());
                email.attachments.add(attachment);
            }
        }

        mailerSend.emails().send(email);
        log.info("Email enviado com sucesso para: {}", to);
    }


    @Async
    public void sendEmailAsync(String to, String subject, String templateName, Map<String, Object> variables) {
        try {
            sendEmail(to, subject, templateName, variables);
        } catch (MessagingException | MailerSendException e) {
            log.error("Erro ao enviar email para: {}", to, e);
        }
    }

    @Async
    public void sendEmailAsync(String to, String subject, String templateName, Map<String, Object> variables,
            Map<String, byte[]> images) {
        try {
            sendEmail(to, subject, templateName, variables, images);
        } catch (MessagingException | MailerSendException e) {
            log.error("Erro ao enviar email para: {}", to, e);
        }
    }

    public void sendWelcomeEmail(String to, String name, String role) {
        Map<String, Object> variables = Map.of(
                "name", name,
                "role", role,
                "loginUrl", mailConfig.getFrontURL() + "/auth/login");

        sendEmailAsync(to, "Bem-vindo ao Student Coin!", "email/welcome", variables);
    }

    public void sendCoinsReceivedEmail(String to, String studentName, int amount, String teacherName, String reason,
            String category) {
        Map<String, Object> variables = Map.of(
                "studentName", studentName,
                "amount", amount,
                "teacherName", teacherName,
                "reason", reason,
                "category", category,
                "extractUrl", mailConfig.getFrontURL() + "/meu-extrato");

        sendEmailAsync(to, "Você recebeu moedas! 🎉", "email/coins-received", variables);
    }

    public void sendCoinsSentEmail(String to, String teacherName, String studentName, int amount, int newBalance) {
        Map<String, Object> variables = Map.of(
                "teacherName", teacherName,
                "studentName", studentName,
                "amount", amount,
                "newBalance", newBalance,
                "extractUrl", mailConfig.getFrontURL() + "/professor/meu-extrato");

        sendEmailAsync(to, "Confirmação de envio de moedas", "email/coins-sent", variables);
    }

    public void sendAdvantageRedeemedEmail(String to, String studentName, Advantage advantage, int cost,
            int newBalance, String code) {
        Map<String, Object> variables = Map.of(
                "studentName", studentName,
                "advantageName", advantage.getTitle(),
                "advantageImageUrl", advantage.getImageUrl(),
                "frontEndURL", this.mailConfig.getFrontURL(),
                "cost", cost,
                "newBalance", newBalance,
                "code", code != null ? code : "N/A",
                "hasCode", code != null);

        Map<String, byte[]> attachments = new HashMap<>();
        if (code != null) {
            String url = this.mailConfig.getFrontURL() + "/empresa/resgatar-vantagem?code=" + code;
            attachments.put("qr-code.png", QRCode.generateQrCodeImage(url));
        }

        sendEmailAsync(to, "Vantagem resgatada com sucesso! 🎁", "email/advantage-redeemed", variables, attachments);
    }

    public void sendPasswordResetEmail(String to, String name, String token) {
        Map<String, Object> variables = Map.of(
                "name", name,
                "resetUrl", mailConfig.getFrontURL() + "/auth/reset-password?token=" + token,
                "expirationTime", "24 horas");

        sendEmailAsync(to, "Recuperação de Senha - Student Coin", "email/password-reset", variables);
    }

    public void sendNewAdvantageEmail(String to, String enterpriseName, Advantage advantage,
            String description, int cost) {
        Map<String, Object> variables = Map.of(
                "enterpriseName", enterpriseName,
                "advantageName", advantage.getTitle(),
                "advantageImageURL", advantage.getImageUrl(),
                "description", description,
                "cost", cost);

        sendEmailAsync(to, "Nova Vantagem Disponível! 🎁", "email/new-advantage", variables);
    }

    public void sendNewAdvantageEmail(String to, String enterpriseName, String advantageName,
            String description, int cost, Integer quantity,
            String expirationDate, Integer userBalance) {
        Map<String, Object> variables = Map.of(
                "enterpriseName", enterpriseName,
                "advantageName", advantageName,
                "description", description,
                "cost", cost,
                "quantity", quantity != null ? quantity : "",
                "expirationDate", expirationDate != null ? expirationDate : "",
                "userBalance", userBalance != null ? userBalance : "");

        sendEmailAsync(to, "Nova Vantagem Disponível! 🎁", "email/new-advantage", variables);
    }

    public void sendCodeValidatedEmail(String to, String studentName, Advantage advantage, String enterpriseName,
            String coupon, LocalDateTime usedAt) {
        Map<String, Object> variables = Map.of(
                "advantageName", advantage.getTitle(),
                "advantageImageURL", advantage.getImageUrl(),
                "studentName", studentName,
                "enterpriseName", enterpriseName,
                "coupon", coupon,
                "usedAt", usedAt);
        sendEmailAsync(to, "Seu Código Foi Usado!", "email/used-code", variables);
    }
}
