package com.wfl.mbtest.api.kakao;


import java.util.HashMap;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


import jakarta.servlet.http.HttpSession;

@RestController
public class KakaoController
{
   KakaoApi kakaoApi = new KakaoApi();
   
   
   @RequestMapping(value="/kakao/callback")
   public ModelAndView login(@RequestParam("code") String code, HttpSession session) {
      ModelAndView mav = new ModelAndView(); // 1번 인증코드 요청 전달
      //1번 인증코드 요청 전달
      String accessToken = kakaoApi.getAccessToken(code); // 2번 인증코드로 토큰 전달
      //2번 인증코드로 토큰 전달
      HashMap<String, Object> userInfo = kakaoApi.getUserInfo(accessToken);
      
      System.out.println("login info : " + userInfo.toString());
      
      if(userInfo.get("email") != null) {
         session.setAttribute("userId",  userInfo.get("email"));
         session.setAttribute("access_token", accessToken);
      }
      mav.addObject("userId", userInfo.get("email"));
      mav.setViewName("index");
      
//      System.out.println("Email in session: " + session.getAttribute("email"));
//      System.out.println("Nickname in session: " + session.getAttribute("nickname"));
           
      String email = session.getId();
      return mav;
   }
   
   @RequestMapping(value="/kakao/logout")
   public ModelAndView logout(HttpSession session) {
      ModelAndView mav = new ModelAndView();
      
      kakaoApi.kakaoLogout((String)session.getAttribute("access_token"));
      session.removeAttribute("accessToken");
      session.removeAttribute("userId");
      mav.setViewName("main");
      return mav;      
   }

}