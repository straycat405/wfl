package com.wfl.mbtest.ledger;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;
import org.springframework.stereotype.Repository;

@Alias("income")
@Mapper
@Repository
public interface IncomeMapper {
	
	ArrayList<Income> getIncome(int userId);
	
}