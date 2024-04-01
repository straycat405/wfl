package com.wfl.mbtest.user;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;
import org.springframework.stereotype.Repository;

@Alias("user")
@Mapper
@Repository
public interface UserMapper {

	ArrayList<User> getAll();
	int registerUser(User user);
	int emailCheck(User user);
}
