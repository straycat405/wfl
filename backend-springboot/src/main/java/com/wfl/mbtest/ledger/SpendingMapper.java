package com.wfl.mbtest.ledger;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;
import org.springframework.stereotype.Repository;

@Alias("spending")
@Mapper
@Repository
public interface SpendingMapper {
	ArrayList<Spending> getSpending(int userId);
}