import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function updateQuestion() {

    const loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

    const baseUrl = "http://localhost:8080";

    const param = useParams();

    const [titleData,setTitleData] = useState([]);
    const [contentData,setContentData] = useState([]);

    useEffect(()=> {
        console.log("수정할 questionId : " + param.questionId);

        axios
    .get(baseUrl + "/GetQuestionId?questionId=" + param.questionId)
    .then((res) => {
      setTitleData(res.data.questionTitle);
      setContentData(res.data.questionContent);

    })
    .catch((err) => {
      console.log(err);
    });

    },[])
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios({
          method: "POST",
          url: baseUrl + "/updateQuestion",
          data: {
            questionId : param.questionId,
            questionTitle: titleData,
            questionContent: contentData,
          },
          headers: { "Content-type": "application/json" },
        }).then((res) => {
            alert("수정 완료");
          console.log(res.data);
          navigate("/QuestionMainPage");
        });
    }

    return(
        <>
                <div className="container">
      <h1>게시글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input type="text" className="form-control" name="QuestionTitle" id="QuestionTitle" value={titleData} onChange={(e) => setTitleData(e.target.value)} placeholder="제목" />
          <label for="QuestionTitle" >제목</label>
        </div>
        <div class="form-floating mb-3">
          <textarea className="form-control h-25" id="QuestionContent" name="QuestionContent" rows="15" value={contentData} onChange={(e) => setContentData(e.target.value)} placeholder="내용" />
          <label for="QuestionContent" >내용</label>
        </div>
        <button type="submit" className="btn btn-outline-primary">저장하기</button>
      </form>
    </div>
        </>
    );
}