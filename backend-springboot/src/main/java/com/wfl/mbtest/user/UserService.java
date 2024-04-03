package com.wfl.mbtest.user;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
    UserMapper userMapper;
	
//    public User findAllUser(int id) {
//        return userMapper.findAllUser(id);
//    }
	
	public ArrayList<User> getAll() {
		System.out.println("UserService.getAll 시작");
		return userMapper.getAll();
	}
	
	public int registerUser(User user) {
		System.out.println("UserService.registerUser()");
		return userMapper.registerUser(user);
	}
	
	public int emailCheck(User user) {
		System.out.println("UserService.emailCheck()");
		return userMapper.emailCheck(user);
	}
	
	public User loginCheck(User user) {
		System.out.println("UserService.loginCheck()");
		return userMapper.loginCheck(user);
	}
	
	public User findUserEmail(User user) {
		System.out.println("UserService.findUserEmail()");
		return userMapper.findUserEmail(user);
	}
	
	public User findUserPw(User user) {
		System.out.println("UserService.findUserPw()");
		return userMapper.findUserPw(user);
	}
	
	public int resetPwConfirm(User user) {
		System.out.println("UserService.resetPwConfirm");
		return userMapper.resetPw(user);
	}
	
	public int modifyConfirm(User user) {
		System.out.println("UserService.modifyConfirm()");
		return userMapper.modifyUser(user);
	}
	
	public User getUser(int userId) {
		System.out.println("UserService.getUser()");
		return userMapper.getUser(userId);
	}

}
