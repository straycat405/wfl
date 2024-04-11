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
public class CategorySpending {
	
	private int categorySpendingId;
    private String categorySpengindName;
    private int userId;
}
