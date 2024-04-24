package com.wfl.mbtest.ledger;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
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
	
	@PostMapping("/getExcelMonthData")
	public void getExcelMonthData(
			HttpServletRequest request,
			HttpServletResponse response ) throws IOException {
		
		// 다운받은 데이터 셋업
		System.out.println("엑셀 다운로드 시작");	
		System.out.println("다운받을 가계부 유저 ID : " + request.getParameter("userId"));
		System.out.println("다운받을 가계부 유저명 : " + request.getParameter("userName"));
		System.out.println("조회 연도 : " + request.getParameter("year"));
		System.out.println("조회 월 : " + request.getParameter("month"));
		
		Spending spending = new Spending();
		
		String userName = request.getParameter("userName");
		String userId = request.getParameter("userId");
		String year = request.getParameter("year");
		String month = request.getParameter("month");
		
		spending.setUserId(Integer.parseInt(userId));
		spending.setYear(Integer.parseInt(year));
		spending.setMonth(Integer.parseInt(month));
		
		System.out.println("-------------------------------------");
		System.out.println(spending.getUserId());
		System.out.println(spending.getYear());
		System.out.println(spending.getMonth());
		
		ArrayList<Spending> monthList = ledgerService.getTotalSpending(spending);
		
		//엑셀파일 작성
		Workbook wb = new XSSFWorkbook();
		Sheet sheet = wb.createSheet();
        Row row = null;
        Cell cell = null;
        int rowNum = 0;
        
        // Header
        row = sheet.createRow(rowNum++);
        cell = row.createCell(0);
        cell.setCellValue("연도");
        cell = row.createCell(1);
        cell.setCellValue("월");
        cell = row.createCell(2);
        cell.setCellValue("일");
        cell = row.createCell(3);
        cell.setCellValue("지출합계(원)");
        
        // Body
        for (int i=0; i<monthList.size(); i++) {
            row = sheet.createRow(rowNum++);
            cell = row.createCell(0);
            cell.setCellValue(monthList.get(i).getYears());
            cell = row.createCell(1);
            cell.setCellValue(monthList.get(i).getMonths());
            cell = row.createCell(2);
            cell.setCellValue(monthList.get(i).getDays());
            cell = row.createCell(3);
            cell.setCellValue(monthList.get(i).getDaystotal());
        }
        
        // 컨텐츠 타입과 파일명 지정
        String fileName = userName + "님의_" + year + "년_" + month + "월_" + "지출내역" + ".xlsx";
        String encodedFileName = "attachment; filename*=" + "UTF-8" + "''" + URLEncoder.encode(fileName, "UTF-8");
        
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", encodedFileName);

        // Excel File Output
        wb.write(response.getOutputStream());
        wb.close();
		
	}

}