package com.wfl.mbtest.user;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import jakarta.servlet.http.HttpServletRequest;

// CrossOrigin 설정으로 5173 (리액트 기본 포트번호)에서 request및 response 송수신 허용
@CrossOrigin(origins = "*")
@RestController
public class UserController {
	
	@Autowired
    UserService userService;
	
	//리액트 Axios api GET 요청 , 통신 테스트
	@GetMapping("/data-test")
	public String springDataTest() {
		return "스프링에서 보내는 데이터입니다";
	}
	
	//리액트 Axios api POST 요청 , 통신 테스트
	@PostMapping("/data-test/click") 
	public String springDataTest2(@RequestBody String name) {
		return name;
	}
	
	//회원가입 제출 (DB에 INSERT)
	@PostMapping("/signupConfirm")
	public String signUpConfirm(HttpServletRequest request, @RequestBody User user) {
		System.out.println("UserController.signup");
		System.out.println(user.getUserEmail());
		System.out.println(user.getUserPw());
		System.out.println(user.getUserName());
		System.out.println(user.getUserPhone());
		
		int result = userService.registerUser(user);
		
		//INSERT 쿼리문 실행결과 레코드 수에따라 조건문 작동
		if (result <= 0) {
			return "회원가입 실패";
		}
		
		System.out.println("가입 결과 :" + result);
		
		return "회원가입 성공";
	}
	
	// 테스트용 (유저테이블 전체 데이터 리스트 JSON으로 리액트로 넘겨주기)
	@GetMapping("/findall")
	public String findAll(Model model) {
		System.out.println("UserController.findAll 조회시작");
		ArrayList<User> userList = userService.getAll();
		
		String json = new Gson().toJson(userList);
		
		System.out.println(userList.get(0).getUserId());
		System.out.println(userList.get(0).getUserEmail());
		System.out.println(json);
		
		return json;
	}
	
	// 이메일 중복확인
	@PostMapping("/signupEmailCheck")
	public int emailCheck(HttpServletRequest request, @RequestBody User user) {
		System.out.println("UserController.signupEmailCheck");
		System.out.println(user.getUserEmail());
		
		int result = userService.emailCheck(user);
		System.out.println("검색된 이메일 수 : " + result);
		
		return result;
	}
	
	//로그인 확인
	@PostMapping("/loginConfirm")
	public String loginCheck(HttpServletRequest request, @RequestBody User user) {
		System.out.println("UserController.loginConfirm()");
		
		User loginedUser = userService.loginCheck(user);
		// 프론트의 localstorage 보안을 위한 Pw삭제
		loginedUser.setUserPw(null);
		
		System.out.println("로그인 시도 유저 이메일 :" + loginedUser);
		
		String json = new Gson().toJson(loginedUser);
		
		return json;
	}
	
	//아이디 찾기
	@PostMapping("/findUserEmail")
	public String findUserEmail(HttpServletRequest request, @RequestBody User user) {
		System.out.println("UserController.findUserEmail()");
		
		User findedUser = userService.findUserEmail(user);
		
		if (findedUser == null) {
			return "해당하는 이메일이 없습니다.";
		} else {
			return findedUser.getUserEmail();
		}
	}
	
	@PostMapping("/findUserPw")
	public String findUserPw(HttpServletRequest request, @RequestBody User user) {
		System.out.println("UserController.findUserPw()");
		
		User findedUser = userService.findUserPw(user);
		
		String json = new Gson().toJson(findedUser);
		
		if (findedUser == null) {
			return "해당하는 사용자 정보가 없습니다.";
		} else {
			return json;
		}
	}
	
	@PostMapping("/resetPwConfirm")
	public int resetPwConfirm(HttpServletRequest request, @RequestBody User user) {
		System.out.println("UserController.resetPwConfirm()");
		
		int resetUser = userService.resetPwConfirm(user);
		
		return resetUser;
	}
	
	@PostMapping("/modifyConfirm")
	public String modifyConfirm(HttpServletRequest request, @RequestBody User user) {
		System.out.println("UserController.modifyConfirm()");
		
		int userId = user.getUserId();
		
		int modifiedUserCheck = userService.modifyConfirm(user);
		User modifiedUserData = userService.getUser(userId);
		
		if (modifiedUserCheck != 1) {
			return "유저 정보 수정 실패";
		} else {
			String json = new Gson().toJson(modifiedUserData);
			modifiedUserData.setUserPw(null);
			return json;
		}
	}
}
