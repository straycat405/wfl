package com.wfl.mbtest.ledger;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;
import org.springframework.stereotype.Repository;

@Alias("ledger")
@Mapper
@Repository
public interface LedgerMapper {
	ArrayList<Ledger> getMyAllLedger(int userId);
	int newLedgerConfirm(Ledger ledger);
}