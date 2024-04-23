package com.wfl.mbtest.ledger;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.UUID;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
import jakarta.servlet.http.HttpServletResponse;

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
	public String getSpending(@RequestParam("userId") int userId) {

		ArrayList<Spending> spendingList = ledgerService.getSpending(userId);

		String json = new Gson().toJson(spendingList);

		System.out.println(json);

		return json;
	}

	// 가계부 지출 내역 업로드
	@PostMapping("/spendingInsert")
	public String insertSpending(@RequestBody Spending spending) {

		System.out.println(spending.getUserId());
		System.out.println(spending.getSpendingTime());
		System.out.println(spending.getSpendingAmount());
		System.out.println(spending.getSpendingWhy());
		System.out.println(spending.getSpendingCategory1());
		System.out.println(spending.getSpendingCategory2());
		System.out.println(spending.getSpendingMethod());
		System.out.println(spending.getSpendingMemo());

		ledgerService.insertSpending(spending);

		return "지출 등록 성공";
	}

	// 가계부 지출 내역 삭제
	@PostMapping("/deleteSpending")
	public String spendingDelete(@RequestBody Spending spending) {

		int result = ledgerService.deleteSpending(spending);

		if (result >= 1) {
			return "지출 내역 삭제 성공";
		} else {
			return "지출 내역 삭제 실패";
		}
	}

	// 가계부 지출 내역 수정
	@GetMapping("/getModifySpending")
	public String getModifySpending(@RequestParam("spendingId") int spendingId) {

		System.out.println("수정할 spendingId : " + spendingId);

		Spending spending = ledgerService.getModifySpending(spendingId);

		System.out.println(spending.getSpendingAmount());
		System.out.println(spending.getSpendingTime());
		System.out.println(spending.getSpendingId());

		String json = new Gson().toJson(spending);

		return json;
	}

	// 가계부 지출 내역 수정 제출 확인
	@PostMapping("/modifySpendingConfirm")
	public String modifySpendingConfirm(@RequestBody Spending spending) {

		System.out.println(spending.getSpendingId());
		System.out.println(spending.getSpendingAmount());
		System.out.println(spending.getSpendingWhy());

		int result = ledgerService.modifySpendingConfirm(spending);

		if (result >= 1) {
			return "수정 성공";
		} else {
			return "수정 실패";
		}
	}

	// 지출연월일별합계
	@PostMapping("/ledger/totalSpendingData")
	public String getTotalSpending(@RequestBody Spending spending) {
		
		System.out.println(spending.getUserId());
		System.out.println(spending.getYear());
		System.out.println(spending.getMonth());
		
		ArrayList<Spending> totalList = ledgerService.getTotalSpending(spending);

		String json = new Gson().toJson(totalList);

		return json;
	}
	
	// 지출 일별 데이타
	@PostMapping("/ledger/spendingDailyData")
	public String getDailySpending(@RequestBody Spending spending) {
		System.out.println(spending.getUserId());
		System.out.println(spending.getYear());
		System.out.println(spending.getMonth());
		System.out.println(spending.getDay());

		ArrayList<Spending> dailyList = ledgerService.getDailySpending(spending);

		String json = new Gson().toJson(dailyList);

		return json;
	}

	// 수입연월일별합계
	@PostMapping("/ledger/totalIncomingData")
	public String getTotalIncoming(@RequestBody Incoming incoming) {
		
		ArrayList<Incoming> totalList = ledgerService.getTotalIncoming(incoming);

		String json = new Gson().toJson(totalList);

		return json;
	}

	// 가계부 지출 상세조회
	@GetMapping("/ledger/incomingData")
	public String getIncoming(@RequestParam("userId") int userId) {

		ArrayList<Incoming> incomingList = ledgerService.getIncoming(userId);

		String json = new Gson().toJson(incomingList);

		System.out.println(json);

		return json;
	}

	// 가계부 수입 내역 업로드
	@PostMapping("/incomingInsert")
	public String insertIncoming(@RequestBody Incoming incoming) {

		ledgerService.insertIncoming(incoming);

		return "수입 등록 성공";
	}

	// 가계부 수입 내역 삭제
	@PostMapping("/deleteIncoming")
	public String incomingDelete(@RequestBody Incoming incoming) {

		int result = ledgerService.deleteIncoming(incoming);

		if (result >= 1) {
			return "수입 내역 삭제 성공";
		} else {
			return "수입 내역 삭제 실패";
		}
	}

	// 가계부 수입 내역 수정
	@GetMapping("/getModifyIncoming")
	public String getModifyIncoming(@RequestParam("incomingId") int incomingId) {
		
		System.out.println("수정할 수입 아이디 : " + incomingId);

		Incoming incoming = ledgerService.getModifyIncoming(incomingId);
		
		System.out.println(incoming.getIncomingAmount());
		

		String json = new Gson().toJson(incoming);

		return json;
	}

	// 가계부 지출 내역 수정 제출 확인
	@PostMapping("/modifyIncomingConfirm")
	public String modifyIncomingConfirm(@RequestBody Incoming incoming) {

		int result = ledgerService.modifyIncomingConfirm(incoming);

		if (result >= 1) {
			return "수정 성공";
		} else {
			return "수정 실패";
		}
	}
	
	// 수입 일별 데이타
	@PostMapping("/ledger/incomingDailyData")
	public String getDailyIncoming(@RequestBody Incoming incoming) {
		
		ArrayList<Incoming> dailyList = ledgerService.getDailyIncoming(incoming);

		String json = new Gson().toJson(dailyList);

		return json;
	}
	
	// 차트 조회용 월간 데이타
	@GetMapping("/getMonthSpending")
	public String getMonthSpending(@RequestParam("userId") int userId) {
		
		System.out.println("차트 데이터 조회");
		
		ArrayList<Spending> monthList = ledgerService.getMonthSpending(userId);
		
		String json = new Gson().toJson(monthList);
		
		return json;
	}
	
	// 차트 조회용 카테고리별 월간 지출 데이타
	@GetMapping("/getCategorySpending")
	public String getCategorySpending(@RequestParam("userId") int userId) {
		
		System.out.println("차트 카테고리별 데이터 조회");
		
		ArrayList<Spending> monthCategoryList = ledgerService.getCategorySpending(userId);
		
		String json = new Gson().toJson(monthCategoryList);
		
		return json;
	}
	
	@GetMapping("/getExcelMonthData")
	public void getExcelMonthData(HttpServletResponse response) throws IOException {
		
		List<String> list = new ArrayList<String>();
		
		list.add("123");
		list.add("456");
		list.add("789");

		//액셀 객체 파일 생성
		Workbook wb = new HSSFWorkbook();
		//시트 생성
		Sheet sheet = wb.createSheet("Test Sheet");
		//셀 스타일 생성
		CellStyle style = wb.createCellStyle();
		
		//타이틀 행 생성. 첫째줄
		Row titleRow = sheet.createRow(0);
		// 첫째줄 (0번인덱스)
		int titleColNum = 0;
		
		// 첫번째 행의 첫번째 열 지정
		Cell titleCell = titleRow.createCell(titleColNum);
		//setCellValue 값 넣기
		titleCell.setCellValue("This is Test"); 
		// Row -> setHeight (행 높이 조절)
		titleRow.setHeight((short)920);
		
	}

}