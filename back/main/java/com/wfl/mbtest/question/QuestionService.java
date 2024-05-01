package com.wfl.mbtest.question;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wfl.mbtest.user.User;

@Service
public class QuestionService {
	
	@Autowired
	QuestionMapper questionMapper;
	
//	ArrayList<Question> getQuestion() {
//	System.out.println("QuestionService.getQuestion 시작");
//	return questionMapper.getQuestion();
//	}
//	public int registerQuestion(Question question) {
//		System.out.println("QuestionService.registerQuestion()");
//		return questionMapper.registerQuestion(question);
//	}
//	public ArrayList<Question> searchQuestion(Map<String,Object> map) {
//		System.out.println("QuestionService.searchQuestion()");
//		return questionMapper.searchQuestion(map);
//	}
	public ArrayList<Question> getMyQuestion (int userId) {
		return questionMapper.getMyQuestion(userId);
	}
	
	public int deleteMyQuestion(int questionId) {
		int result = questionMapper.deleteMyQuestion(questionId);
		return result;
	}
	
	public int postQuestion(Question question) {
		int result = questionMapper.postQuestion(question);
		return result;
	}
	public Question getQuestion(int questionId) {
		System.out.println("UserService.getQuestion()");
		return questionMapper.getQuestion(questionId);
	}
	public int updateQuestion(Question question) {
		return questionMapper.updateQuestion(question);
	}
	public ArrayList<Question> getQuestionAll() {
		System.out.println("QuestionService.getQuestionAll 시작");
		return questionMapper.getQuestionAll();
	}
	public int setAnswer(Question question) {
		return questionMapper.setAnswer(question);
}
}