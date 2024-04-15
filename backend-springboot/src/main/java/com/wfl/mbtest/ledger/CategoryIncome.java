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
public class CategoryIncome {
	
	private int categoryIncomeId;
    private String categoryIncomeName;
    private int userId;
}