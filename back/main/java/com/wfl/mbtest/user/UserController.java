package com.wfl.mbtest.user;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	@GetMapping("/api/findall")
	public String findAll() {
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
		// 프론트의 localstorage 보안을 위한 pw 삭제
		System.out.println(loginedUser.getUserRegDate());
		
		if (loginedUser.getUserResign() == 1) {
			return "";
		} else {
			loginedUser.setUserPw(null);
			loginedUser.setUserRegDate(null);
			loginedUser.setUserModDate(null);
		
			System.out.println("로그인 시도 유저 이메일 :" + loginedUser);
		
			String json = new Gson().toJson(loginedUser);
		
			return json;
		}
		

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
		
		// 유저 정보 수정
		int modifiedUserCheck = userService.modifyConfirm(user);
		// 수정된 유저 정보 객체 리턴
		User modifiedUserData = userService.getUser(userId);
		
		modifiedUserData.setUserPw(null);
		modifiedUserData.setUserRegDate(null);
		modifiedUserData.setUserModDate(null);
		
		if (modifiedUserCheck != 1) {
			return "유저 정보 수정 실패";
		} else {
			String json = new Gson().toJson(modifiedUserData);
			modifiedUserData.setUserPw(null);
			return json;
		}
	}
	
	@PostMapping("/api/files/images")
	public String uploadImage(@RequestParam("userId") int userId, 
											@RequestParam("files") MultipartFile file)	 {
		System.out.println("UserController.uploadImage()");
		
		// 이미지 저장 로직
		String savedFileName = saveImage(file, userId);
		
		return savedFileName;
	}
	
	public String saveImage(MultipartFile file, int userId) {
		// 파일 저장 경로 설정 (프론트엔드 - src - assets - profileimages)
		// 작업환경마다 맞게 세팅해주셔야 정상작동됩니다
		//String filePath = "D:\\team\\my-project\\src\\assets\\profileimages\\";
		String filePath = "C:\\project\\myproject\\src\\assets\\profileimages\\";
		
		// 파일 이름 변경
		String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
		
		// 파일 저장
		try {
			file.transferTo(new File(filePath + fileName));

			// 리액트 불러오기를 위한 상대파일경로 설정
			String reactProfilePath = "/src/assets/profileimages/" + fileName;
			
			
			// DB 유저테이블에 프로필이미지 경로 저장
			User user = new User();
			
			user.setUserId(userId);
			user.setUserProfile(reactProfilePath);
			
			userService.setProfile(user);
			
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		// 업데이트된 유저 정보 리턴
		User modifiedUserData = userService.getUser(userId);
		
		modifiedUserData.setUserPw(null);
		modifiedUserData.setUserRegDate(null);
		modifiedUserData.setUserModDate(null);

		String json = new Gson().toJson(modifiedUserData);
		modifiedUserData.setUserPw(null);
		return json;
	}
	
	//관리자 유저 삭제
	@DeleteMapping("/deleteUser")
	public String deleteUser (@RequestParam("userId") int userId) {
		
		System.out.println("UserController.deleteUser()");
		
		userService.deleteUser(userId);
		return "";
	}
	
	// 관리자 검색
	@PostMapping("/api/searchUser")
	public String searchUser (@RequestParam("category") String category,
								@RequestParam("value") String value) {
		
		System.out.println("UserController.searchUser()");
		
		System.out.println("검색할 카테고리 : " + category);
		System.out.println("검색할 키워드 : " + value);
		
		Map<String,Object> map = new HashMap<String,Object>();
		
		map.put("category", category);
		map.put("value", value);
		
		ArrayList<User> searchedUser = userService.searchUser(map);
		
		for (int i=0; i < searchedUser.size() ; i++ )
		System.out.println("검색 결과 유저 ID : " + searchedUser.get(i).getUserId());
		
		String json = new Gson().toJson(searchedUser);
		
		return json;
	}
	
	//회원 탈퇴
	@GetMapping("/resignUser")
	public String resignUser(@RequestParam ("userId") int userId) {
		System.out.println("회원 탈퇴");
		
		int result = userService.resignUser(userId);
		
		if (result >= 1) {
			return "회원 탈퇴 완료. 이용해주셔서 감사합니다.";
		} else {
			return "회원 탈퇴 처리중 오류 발생";
		}
	}
	
	//회원 복구 (관리자 기능)
	@GetMapping("/unResignUser")
	public String unResignUser(@RequestParam ("userId") int userId) {
		System.out.println("탈퇴 회원 복구");
		
		int result = userService.unResignUser(userId);
		
		if (result >= 1) {
			return "회원 복구 완료";
		} else {
			return "회원 복구 처리중 오류 발생";
		}
	}
}
