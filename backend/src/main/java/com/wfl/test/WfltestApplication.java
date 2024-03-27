package com.wfl.test;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value = {"com.wfl.test.mapper"})
public class WfltestApplication {

	public static void main(String[] args) {
		SpringApplication.run(WfltestApplication.class, args);
	}

}
