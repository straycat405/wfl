package com.wfl.mbtest.user;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimeService {
	
	@Autowired
    TimeMapper timeMapper;
	
    public ArrayList<Time> getAll() {
        return timeMapper.getAll();
    }
    
    public int insertTime(Time time) {
    	return timeMapper.insertTime(time);
    }
	

}
