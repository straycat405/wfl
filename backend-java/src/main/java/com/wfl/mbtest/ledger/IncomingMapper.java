package com.wfl.mbtest.ledger;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;
import org.springframework.stereotype.Repository;

@Alias("incoming")
@Mapper
@Repository
public interface IncomingMapper {
	
	ArrayList<Incoming> getTotalIncoming(Incoming incoming);
	ArrayList<Incoming> getIncoming(int userId);
	int insertIncoming(Incoming incoming);
	int deleteIncoming(Incoming incoming);
	Incoming getModifyIncoming(int incomingId);
	int modifyIncomingConfirm(Incoming incoming);
	ArrayList<Incoming> getDailyIncoming(Incoming incoming);
	
}