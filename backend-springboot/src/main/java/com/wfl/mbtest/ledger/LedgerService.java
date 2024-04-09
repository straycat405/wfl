package com.wfl.mbtest.ledger;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LedgerService {
	
	@Autowired
    LedgerMapper ledgerMapper;
	
//    public User findAllUser(int id) {
//        return userMapper.findAllUser(id);
//    }
	
	public ArrayList<Ledger> getMyAllLedger(int userId) {
		return ledgerMapper.getMyAllLedger(userId);
	}
	
	public int newLedgerConfirm(Ledger ledger) {
		return ledgerMapper.newLedgerConfirm(ledger);
	}
}
