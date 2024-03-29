package com.wfl.mbtest.user;

import java.util.ArrayList;
import java.util.List;

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

}
