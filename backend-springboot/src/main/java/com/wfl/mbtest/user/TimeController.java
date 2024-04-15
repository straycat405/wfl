package com.wfl.mbtest.user;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
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
public class TimeController {
	
	@Autowired
	TimeService timeService;
	
	@GetMapping("/datatest")
	public String springDataTest() {
		ArrayList<Time> timeList = timeService.getAll();
		
		String json = new Gson().toJson(timeList);
		
		
		return json;
	}
	
	@PostMapping("/timetest")
	public String timeTest(@RequestBody Time time) {
		
		System.out.println(time.getTime());
		
		timeService.insertTime(time);
		
		return "dd";
	}
}