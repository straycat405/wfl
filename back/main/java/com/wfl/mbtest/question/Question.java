package com.wfl.mbtest.question;

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
public class Question {

	private int questionId;
	private String questionTitle;
	private String questionContent;
	private String questionReply;
	private String questionRegDate;
	private int userId;
	
}