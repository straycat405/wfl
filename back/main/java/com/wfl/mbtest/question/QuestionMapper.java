package com.wfl.mbtest.question;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;
import org.springframework.stereotype.Repository;

import com.wfl.mbtest.user.User;


@Alias("question")
@Mapper
@Repository
public interface QuestionMapper {

//	ArrayList<Question> getQuestion();
//	String insertQuestion(Question question);
//	
//	int registerQuestion(Question question);
//	ArrayList<Question> searchQuestion(Map<String,Object> map);
	
	ArrayList<Question> getMyQuestion(int userId);
	int deleteMyQuestion(int questionId);
	int postQuestion(Question question);
	Question getQuestion(int questionId);
	int updateQuestion(Question question);
	ArrayList<Question> getQuestionAll();
	int setAnswer(Question question);
}
