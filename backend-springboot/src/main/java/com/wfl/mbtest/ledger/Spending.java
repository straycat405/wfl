package com.wfl.mbtest.ledger;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Spending {
	
	private int spendingId;
    private int userId;
    
    private String spendingTime;
    
    private int spendingAmount;
    private String spendingWhy;
    private String spendingCategory1;
    private String spendingCategory2;
    private String spendingMemo;
    private String spendingMethod;
    
    private int years;
    private int year;
    private int months;
    private int month;
    private int days;
    private int day;
    private int daystotal;

}
