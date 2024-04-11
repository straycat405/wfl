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
public class Spending {
	
	private int spendingId;
    private int userId;
    private Date spendingTime;
    private int spendingAmount;
    private String spendingWhy;
    private int spendingCategory1;
    private int spendingCategory2;
    private int spendingMethodId;
    private String spendingMemo;
    
    private String spendTime;

}
