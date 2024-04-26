package com.wfl.mbtest.user;

import java.util.ArrayList;
import java.util.Map;

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
	int modifyUser(User user);
	User getUser(int userId);
	int setProfile(User user);
	int deleteUser(int userId);
	ArrayList<User> searchUser(Map<String,Object> map);
	User getByEmail(String email);
	int resignUser(int userId);
	int unResignUser(int userId);
}
