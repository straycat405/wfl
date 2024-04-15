package com.wfl.mbtest.ledger;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LedgerService {
	
	@Autowired
    LedgerMapper ledgerMapper;
	
	@Autowired
	SpendingMapper spendingMapper;
	
	@Autowired
	IncomeMapper incomeMapper;
	
	@Autowired
	CategorySpendingMapper categorySpendingMapper;
	
	@Autowired
	CategoryIncomeMapper categoryIncomeMapper;
	
//    public User findAllUser(int id) {
//        return userMapper.findAllUser(id);
//    }
	
//	public ArrayList<Ledger> getMyAllLedger(int userId) {
//		return ledgerMapper.getMyAllLedger(userId);
//	}
//	
//	public int newLedgerConfirm(Ledger ledger) {
//		return ledgerMapper.newLedgerConfirm(ledger);
//	}
	
	public ArrayList<Spending> getSpending(int userId) {
		return spendingMapper.getSpending(userId);
	}
	
	public ArrayList<Income> getIncome(int userId) {
		return incomeMapper.getIncome(userId);
	}
	
	public int insertSpending(Spending spending) {
		return spendingMapper.insertSpending(spending);
	}
	
	public int deleteSpending(Spending spending) {
		return spendingMapper.deleteSpending(spending);
	}
	public Spending getModifySpending(int spendingId) {
		return spendingMapper.getModifySpending(spendingId);
	}
	public int modifySpendingConfirm(Spending spending) {
		return spendingMapper.modifySpendingConfirm(spending);
	}
	
	public ArrayList<Spending> getTotalSpending(int userId) {
		return spendingMapper.getTotalSpending(userId);
	}
	
	public ArrayList<Spending> getDailySpending(Spending spending) {
		return spendingMapper.getDailySpending(spending);
	}
}
