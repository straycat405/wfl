package com.wfl.test.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:5173")
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
	
	@PostMapping("/post-test")
	public String Posttest(HttpServletRequest request, @RequestBody User user) {
		System.out.println(user.getUserEmail());
		System.out.println(user.getUserPw());
		System.out.println(user.getUserName());
		System.out.println(user.getUserPhone());

		return "통신 성공";
	}
	
	@RequestMapping(value = "findAll", method = RequestMethod.POST)
    public ResponseEntity<?> findAll() {
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setResultCode("S0001");
        responseDTO.setRes(userService.findAll());
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
	}

}
