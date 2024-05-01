import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Question.css';

export default function QuestionView () {
  const [dataList, setDataList] = useState([]); //가져온 데이터를 저장
  const navigate = useNavigate();  
  const qId = useParams().questionId;  
  //useParams()는 React Router에서 제공하는 훅
// 라우터를 사용하는 컴포넌트에서 URL의 매개변수 값을 가져올 때 사용
// useParams()를 호출하면 현재 페이지의 URL 매개변수 정보를 가져온다
// useParams().questionId는 현재 페이지의 URL에서 questionId라는 매개변수 값을 추출, 값은 qId 변수에 저장
  const [answer, setAnswer] = useState('');

  const baseUrl = "http://localhost:8080";  //백엔드 서버의 기본URL을 정의

  const loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

  useEffect(() => {
    axios
    .get(baseUrl + "/GetQuestionId?questionId=" + qId)
    .then((res) => {
      setDataList(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  },[]);

  function handleAnswerSubmit() {

    axios({
      method: "POST",
      url: baseUrl + "/setAnswer",
      data: {
        questionId : qId,
        questionReply : answer
      },
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      console.log(res.data);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })

  }
  
  return (
    <>
      <h2 align="center">게시글 상세정보</h2>
      <div className="Question-view-wrapper">
        {dataList ? (
          <>
            <div className="Question-view-row">
              <label>번호</label>
              <label>{dataList.questionId}</label>
            </div>
             <div className="Question-view-row">
              <label>작성자</label>
              <label>{dataList.userId}</label>
            </div>
             <div className="Question-view-row">
              <label>작성일</label>
              <label>{dataList.questionRegDate}</label>
            </div>
            <div className="Question-view-row">
              <label>제목</label>
              <label>{dataList.questionTitle}</label>
            </div>
            <div className="Question-view-row">
              <label>내용</label>
              <div>{dataList.questionContent}</div>
            </div>
            <div className="Question-view-row">
            <label>답변</label>
              {/* 답변이 있을 경우 */}
              {dataList.questionReply ? (
                <div>{dataList.questionReply}</div>
              ) : (
                // 답변이 없을 경우
                <div>답변이 없습니다.</div>
              )}
            </div>
          </>
        ) : (
          '해당 게시글을 찾을 수 없습니다.'
        )}
       { loginedUser.adminAuth !== 1 ? 
       <>
       <button className="btn btn-primary" onClick={() => navigate("/updateQuestion/" + dataList.questionId)}>
          수정하기
        </button>
        <div className="Question-view-btn-group">
        <button className="Question-view-go-list-btn" onClick={() => navigate(-1)}>
          목록으로 돌아가기
        </button>
        </div>
        </>
         : ''
        }

      { loginedUser.adminAuth == 1 ? 
      
      
        <>
<div className="Question-view-answer-form">
          <h3>답변 작성</h3>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                rows="5"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="답변 내용을 입력하세요."
              />
              <label>답변을 입력하세요</label>
            </div>
            <button onClick={handleAnswerSubmit} className="btn btn-primary">답변 등록</button>
        </div>
                <div className="Question-view-btn-group">
         
                <button className="Question-view-go-list-btn" onClick={() => navigate(-1)}>
                  목록으로 돌아가기
                </button>
              </div>
              </>
        : ''
      
      }
      </div>
    </>
  );
};
