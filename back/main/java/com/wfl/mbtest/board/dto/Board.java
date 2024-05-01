package com.wfl.mbtest.board.dto;


import lombok.Data;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Board {
   
   private int no;
   private String title;
   private String userNickname;
   private String content;
   private String regDate;
   private String updDate;
   private int views;

}