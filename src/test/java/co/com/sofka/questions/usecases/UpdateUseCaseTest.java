package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;

import static org.mockito.Mockito.when;


@SpringBootTest
class UpdateUseCaseTest {

    @SpyBean
    private UpdateUseCase updateUseCase;

    @MockBean
    private QuestionRepository repository;

    @Test
    void updateTest(){
//String id, String userId, String question, String type, String category, Integer numberOfReviews, Integer sumOfReviewScores, List<String> userReviews, String userEmail
        var questionDTO = new QuestionDTO("1","1","What is the best JavaScript Framework?", "OPEN","TECHNOLOGY AND COMPUTER",  1, 2,List.of("x1","x2"),"test-email@gmail.com");
        var question = new Question();
        question.setId("1");
        question.setUserId("1");
        question.setQuestion("What is the best JavaScript Framework?");
        question.setType("OPEN");
        question.setCategory("TECNOLOGIA");
        question.setNumberOfReviews(1);
        question.setSumOfReviewScores(2);
        question.setUserReviews(List.of("x1","x2"));
        question.setUserEmail("test-email@gmail.com");

        when(repository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        var result = updateUseCase.apply(questionDTO);

        Assertions.assertEquals(Objects.requireNonNull(result.block()),"1");
    }

}