package com.wfl.mbtest.user;

import java.sql.Date;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private int userId;
    private String userEmail;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userProfile;
    private String userRegDate;
    private String userModDate;
    private String userPhone;
    private int userPremium;
    private int adminAuth;
    private int userResign;

}