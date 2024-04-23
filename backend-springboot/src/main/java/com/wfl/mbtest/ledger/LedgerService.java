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
	IncomingMapper incomingMapper;
	
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
	public ArrayList<Incoming> getTotalIncoming(int userId) {
		return incomingMapper.getTotalIncoming(userId);
	}
	public ArrayList<Incoming> getIncoming(int userId) {
		return incomingMapper.getIncoming(userId);
	}
	public int insertIncoming(Incoming incoming) {
		return incomingMapper.insertIncoming(incoming);
	}
	public int deleteIncoming(Incoming incoming) {
		return incomingMapper.deleteIncoming(incoming);
	}
	public Incoming getModifyIncoming(int incomingId) {
		return incomingMapper.getModifyIncoming(incomingId);
	}
	public int modifyIncomingConfirm(Incoming incoming) {
		return incomingMapper.modifyIncomingConfirm(incoming);
	}
	public ArrayList<Incoming> getDailyIncoming(Incoming incoming) {
		return incomingMapper.getDailyIncoming(incoming);
	}
}
