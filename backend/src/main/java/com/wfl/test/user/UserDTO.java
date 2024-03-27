package com.wfl.test.user;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Alias("user")
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private int userId;
    private String userEmail;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userProfile;
    private Date userRegDate;
    private Date userModDate;
    private String userPhone;
    private int userPremium;
    private int adminAuth;
    private int userResign;

}