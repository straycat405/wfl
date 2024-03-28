package com.wfl.test.user;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
    UserMapper userMapper;
	
    public ArrayList<HashMap<String, Object>> findAll() {
        return userMapper.findAll();
    }

}
