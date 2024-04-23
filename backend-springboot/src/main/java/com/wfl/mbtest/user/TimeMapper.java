package com.wfl.mbtest.user;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;
import org.springframework.stereotype.Repository;

@Alias("time")
@Mapper
@Repository
public interface TimeMapper {
	
	ArrayList<Time> getAll();
	int insertTime(Time time);

}
