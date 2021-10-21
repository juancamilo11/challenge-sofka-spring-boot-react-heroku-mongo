package co.com.sofka.questions.collections;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Document
public class Question {

    @Id
    private String id;
    private String userId;
    private String question;
    private String type;
    private String category;
    private Integer numberOfReviews = 0;
    private Integer sumOfReviewsScores = 0;
    private List<String> userReviews = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(Integer numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public Integer getSumOfReviewScores() {
        return sumOfReviewsScores;
    }

    public void setSumOfReviewScores(Integer sumOfReviews) {
        this.sumOfReviewsScores = sumOfReviews;
    }

    public List<String> getUserReviews() {
        return userReviews;
    }

    public void setUserReviews(List<String> userReviews) {
        this.userReviews = userReviews;
    }
}
