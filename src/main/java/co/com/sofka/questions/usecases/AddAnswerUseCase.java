package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.services.SendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@Validated
public class AddAnswerUseCase implements SaveAnswer {
    private final AnswerRepository answerRepository;
    private final MapperUtils mapperUtils;
    private final GetUseCase getUseCase;

    @Autowired
    private final SendEmailService sendEmailService;

    public AddAnswerUseCase(SendEmailService sendEmailService, MapperUtils mapperUtils, GetUseCase getUseCase, AnswerRepository answerRepository) {
        this.sendEmailService = sendEmailService;
        this.answerRepository = answerRepository;
        this.getUseCase = getUseCase;
        this.mapperUtils = mapperUtils;
    }

    public Mono<QuestionDTO> apply(AnswerDTO answerDTO) {
        Objects.requireNonNull(answerDTO.getQuestionId(), "Id of the answer is required");
        return getUseCase.apply(answerDTO.getQuestionId()).flatMap(question ->
                answerRepository.save(mapperUtils.mapperToAnswer().apply(answerDTO))
                        .map(answer -> {
                            question.getAnswers().add(answerDTO);
                            sendEmailService.sendMail(
                                    question.getUserEmail(),
                                    "Someone has answered one of your questions!",
                                    "Hello! Hope you're doing great!\n" +
                                            "You're receiving this email because someone answered on of your questions.\n\n" +
                                            "Go to out web page to see more details :)");

                            return question;
                        })
        );
    }
}
