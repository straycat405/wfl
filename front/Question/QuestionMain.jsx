import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Question.css';
import axios from 'axios';


const CommonTable = ({ headersName, children }) => {
  return (
    <table className="common-table">
      <thead>
        <tr>
          {headersName.map((item, index) => (
            <th className="common-table-header-column" key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

const baseUrl = "http://localhost:8080"; //백엔드 서버의 기본URL을 정의



const CommonTableColumn = ({ children }) => {
  return (
    <td className="common-table-column">
      {children}
    </td>
  );
};

const CommonTableRow = ({ rowData, onDelete }) => {
  const [questionId, questionTitle, questionRedDate,] = rowData;

  return (
    <tr className="common-table-row">
      <CommonTableColumn>
        <Link to={`/QuestionView/${questionId}`} style={{ color: 'black', textDecoration: 'none' }}>
          {questionId}
        </Link>
      </CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/QuestionView/${questionId}`} style={{ color: 'black', textDecoration: 'none' }}>
          {questionTitle}
        </Link>
      </CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/QuestionView/${questionId}`} style={{ color: 'black', textDecoration: 'none' }}>
          {questionRedDate}
        </Link>
      </CommonTableColumn>
      <CommonTableColumn>
        <button className="delete-button" onClick={() => onDelete(questionId)}>삭제하기</button>
      </CommonTableColumn>
    </tr>
  );
};

function QuestionMain() {

  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));
// 현재 로그인한 사용자의 정보를 가져온다
// 브라우저의 sessionStorage에 저장된 "loginedUser"라는 키로 저장된 사용자 정보를 가져와서 JSON 형식으로 파싱


  const [dataList, setDataList] = useState([]);

  useEffect(() => {

    if ( loginedUser ?? loginedUser.adminAuth == 1) {
      axios
      .get(baseUrl + "/getQuestionAll")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setDataList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    } else {
      axios
    .get(baseUrl + "/getMyQuestion?userId=" + loginedUser?.userId)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      setDataList(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
    }
  }, []);


  const handleDeleteItem = (questionId) => {
    // Filter out the item to be deleted
    axios
    .delete(baseUrl + "/deleteMyQuestion?questionId=" + questionId)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      alert(res.data);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });

    //setDataList(Data);
  };


  return (
    <>
      <h2 align="center">게시판</h2>
      <CommonTable headersName={['글번호', '제목', '작성일', '삭제하기']}>
        {dataList.length > 0 ? (
          dataList.map((item, index) => (
            <CommonTableRow
              key={index}
              rowData={[item.questionId, item.questionTitle, item.questionRegDate, "삭제하기"]}
              onDelete={handleDeleteItem}
            />
          ))
        ) : (
          <tr>
            <td colSpan="5">데이터가 없습니다.</td>
          </tr>
        )}
      </CommonTable>
      { loginedUser.adminAuth !== 1 ? 
       <button className='Insert-button-color'><Link to="/insertquestion">게시글 추가</Link></button>
       : ''
      }
    </>
  );
}

export default QuestionMain;
