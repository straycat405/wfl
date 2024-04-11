package com.wfl.mbtest.ledger;

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
import com.wfl.mbtest.user.User;

import jakarta.servlet.http.HttpServletRequest;

// CrossOrigin 설정으로 5173 (리액트 기본 포트번호)에서 request및 response 송수신 허용
@CrossOrigin(origins = "*")
@RestController
public class LedgerController {
	
	@Autowired
    LedgerService ledgerService;
	
//	@GetMapping("/ledger/myLedger")
//	public String getMyAllLedger(@RequestParam("userId") int userId) {
//		System.out.println("LedgerController.getAll 조회시작");
//		System.out.println("받아온 userId : " + userId);
//		ArrayList<Ledger> ledgerList = ledgerService.getMyAllLedger(userId);
//		
//		String json = new Gson().toJson(ledgerList);
//		
//		System.out.println(json);
//		
//		return json;
//	}
	
//	// 새로운 가계부 생성
//	@PostMapping("/ledger/newLedgerConfirm")
//	public String newLedgerConfirm(@RequestBody Ledger ledger) {
//		System.out.println("가계부 작성 요청 보낸 userId : " + ledger.getUserId());
//		System.out.println("가계부 이름 : " + ledger.getLedgerName());
//		System.out.println("가계부 메모 : " + ledger.getLedgerMemo());
//		
//		int result = ledgerService.newLedgerConfirm(ledger);
//		
//		System.out.println(result);
//		
//		if (result == 1) {
//			return "가계부 생성 성공";
//		} else {
//			return "가계부 생성 중 오류 발생";
//		}
//	}
	
	// 가계부 지출 상세조회
	@GetMapping("/ledger/spendingData")
	public String getSpending(@RequestParam ("userId") int userId) {
		
		ArrayList<Spending> spendingList = ledgerService.getSpending(userId);
		
		String json = new Gson().toJson(spendingList);
		
		System.out.println(json);
		
		return json;
	}
	
	// 가계부 수입 상세조회
	@GetMapping("/ledger/incomeData")
	public String getIncome(@RequestParam ("ledgerId") int ledgerId) {
		
		ArrayList<Income> incomeList = ledgerService.getIncome(ledgerId);
		
		String json = new Gson().toJson(incomeList);
		
		System.out.println(json);
		
		return json;
	}
	
	
}