package com.wfl.mbtest.user;

import java.util.ArrayList;

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
	User loginCheck(User user);
	User findUserEmail(User user);
	User findUserPw(User user);
	int resetPw(User user);
}