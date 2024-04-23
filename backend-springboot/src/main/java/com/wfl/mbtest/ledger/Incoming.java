package com.wfl.mbtest.ledger;

import java.sql.Date;

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
public class Incoming {
	
	private int incomingId;
    private int userId;
    
    private String incomingTime;
    
    private int incomingAmount;
    private String incomingWhy;
    private String incomingCategory1;
    private String incomingCategory2;
    private String incomingMemo;
    private String incomingMethod;
    
    private int years;
    private int year;
    private int months;
    private int month;
    private int days;
    private int day;
    private int daystotal;

}
