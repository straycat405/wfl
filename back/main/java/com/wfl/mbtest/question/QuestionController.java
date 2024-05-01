package com.wfl.mbtest.question;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.wfl.mbtest.user.User;

@CrossOrigin(origins = "*")
@RestController
public class QuestionController {
	
	@Autowired
	QuestionService questionService;
		
//	@PostMapping("/insertQuestion")
//	public String InsertQuestion (HttpServletRequest request, @RequestBody Question question) {
//		System.out.println("QuestionController.insert");
//		System.out.println(question.getNo());
//		System.out.println(question.getUserId());
//		System.out.println(question.getQuestionTitle());
//		System.out.println(question.getQuestionContent());
//		System.out.println(question.getQuestionReply());
//		System.out.println(question.getQuestionRegDate());
//		
//		int result = questionService.registerQuestion(question);
//	}	
	@GetMapping("/getMyQuestion")
	public String getMyQuestion (@RequestParam ("userId") int userId) {
		System.out.println("QuestionController.getMyQuestion");
		System.out.println("조회할 userId : " + userId);
		
		ArrayList<Question> findedList = questionService.getMyQuestion(userId);
		
		String json = new Gson().toJson(findedList);
		
		return json;
	}
	
	@DeleteMapping("/deleteMyQuestion")
	public String deleteMyQuestion (@RequestParam ("questionId") int questionId) {
		
		int result = questionService.deleteMyQuestion(questionId);
		
		System.out.println(result);
		
		if (result <= 1) {
			return "삭제 성공";
		} else {
			return "삭제 실패";
		}
	}
	@PostMapping("/postQuestion")
	public String postQuestion (@RequestBody Question question) {
		System.out.println(question.getUserId());
		System.out.println(question.getQuestionTitle());
		System.out.println(question.getQuestionContent());
		
		int result = questionService.postQuestion(question);
		
		if (result <= 1) {
			return "등록 성공";
		} else {
			return "등록 실패";
		}
	}
	@GetMapping("/GetQuestionId")
	public String getQuestion (@RequestParam ("questionId") int questionId) {
		System.out.println(questionId);
		
		Question findedList = questionService.getQuestion(questionId);
		
		String json = new Gson().toJson(findedList);
		
		return json;

	}
	
	@PostMapping("/updateQuestion")
	public String updateQuestion(@RequestBody Question question) {
		
		int result = questionService.updateQuestion(question);
		
		if ( result >= 1 ) {
			return "수정 성공";
		} else {
			return "수정 실패";
		}
	}
	@GetMapping("/getQuestionAll")
	public String getQuestionAll () {
		System.out.println("QuestionController.getQuestionAll 조회시작");
		ArrayList<Question> findedList = questionService.getQuestionAll();
		
		String json = new Gson().toJson(findedList);
		
		
		return json;
	}
	@PostMapping("/setAnswer")
	public String setAnswer(@RequestBody Question question) {
		
		System.out.println(question.getQuestionId());
		System.out.println(question.getQuestionReply());
		
		int result = questionService.setAnswer(question);
		
		
			return "";
		
	}
}	