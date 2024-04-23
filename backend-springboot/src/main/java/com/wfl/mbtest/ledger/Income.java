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
public class Income {
	
	private int incomeId;
    private int ledgerId;
    private int categoryIncomeId;
    private String incomeList;
    private int incomeAmount;
    private String incomeWhy;
    private Date incomeTime;
    private String incomeMemo;
    
    private String incomedTime;

}
