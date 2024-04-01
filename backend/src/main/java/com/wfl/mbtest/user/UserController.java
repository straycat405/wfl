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

@CrossOrigin(origins = "*")
@RestController
public class UserController {
	
	@Autowired
    UserService userService;

	@GetMapping("/data-test")
	public String springDataTest() {
		return "스프링에서 보내는 데이터입니다";
	}
	
	@PostMapping("/data-test/click") 
	public String springDataTest2(@RequestBody String name) {
		return name;
	}
	
	@PostMapping("/signupConfirm")
	public String signUpConfirm(HttpServletRequest request, @RequestBody User user) {
		System.out.println("UserController.signup");
		System.out.println(user.getUserEmail());
		System.out.println(user.getUserPw());
		System.out.println(user.getUserName());
		System.out.println(user.getUserPhone());
		
		int result = userService.registerUser(user);

		if (result <= 0) {
			return "회원가입 실패";
		}
		
		System.out.println("가입 결과 :" + result);
		
		return "회원가입 성공";
	}
	
	@GetMapping("/findall")
	public String findAll(Model model) {
		System.out.println("UserController.findAll 조회시작");
		ArrayList<User> userList = userService.getAll();
		
		String json = new Gson().toJson(userList);
		
//		model.addAttribute("userList", userList);
		
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

}
