package co.com.sofka.questions.services;

import reactor.core.publisher.Mono;

@FunctionalInterface
public interface SendEmailService {
    public Mono<String> sendEMail(String to, String subject, String body);
}
