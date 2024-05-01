import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
import axios from 'axios';

const baseUrl = "http://localhost:8080";

let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

const getQuestionByNo = (questionId) => {
  const array = Data.filter(x => x.no === Number(questionId));
  if (array.length === 1) {
    return array[0];
  }
  return null;
};

const InsertQuestion = () => {
  const [newData, setNewData] = useState({
    userId: '',
    QuestionTitle: '',
    QuestionContent: '',
    QuestionRegDate: ''
  });

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const addData = (data) => {
    
    console.log('새로운 데이터:', data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: baseUrl + "/postQuestion",
      data: {
        userId: loginedUser?.userId,
        questionTitle: newData.QuestionTitle,
        questionContent: newData.QuestionContent,
      },
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      console.log(res.data);
    });

    
    addData(newData);
    navigate('/questionMainPage');
  };

  return (
    <div className="container">
      <h1>게시글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input type="text" className="form-control" name="QuestionTitle" id="QuestionTitle" 
          value={newData.QuestionTitle} onChange={onInputChange} placeholder="제목" />
          <label for="QuestionTitle" >제목</label>
        </div>
        <div class="form-floating mb-3">
          <textarea className="form-control h-25" id="QuestionContent" name="QuestionContent" rows="15" 
          value={newData.QuestionContent} onChange={onInputChange} placeholder="내용" />
          <label for="QuestionContent" >내용</label>
        </div>
        <button type="submit" className="btn btn-outline-primary">저장하기</button>
      </form>
    </div>
  );
};

export default InsertQuestion;
export { getQuestionByNo, InsertQuestion };
