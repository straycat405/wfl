import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import styles from './BoardList.module.css';
import axios from 'axios';

const BoardList = ({ boardList }) => {
    let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("title");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate(); 

    const baseUrl = "http://localhost:8080";

    useEffect(() => {
        navigate('/Home/boards');

        if(loginedUser.userPremium = 0) {
            alert("프리미엄 유저가 아닙니다.");
            navigate("/");
        }
    }, []); 

    if (!Array.isArray(boardList)) {
        alert('게시물이 존재하지 않습니다');
        return (
            <div>
                <h1>게시글 목록</h1>
                <Link to="/Home/boards/insert">글쓰기</Link>
            </div>
        );
    }

    function searchForBoardCategory() {
        if (inputValue.trim() === "") {
            alert("검색어를 입력하세요.");
            return;
        }

        axios.post(baseUrl + "/Home/boards/searchBoard", null, { params: { category: selected, value: inputValue } })
            .then((res) => {
                setData(res.data);
                if (res.data.length === 0) {
                    setShowAlert(true);
                } else {
                    setShowAlert(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='con'>
            <button className={styles.button}><Link to="/Home/boards/insert">글쓰기</Link></button>
            <table border={1} className={styles.tab}>
                <thead>
                    <tr>
                        <th align='100'>작성자</th>
                        <th align='100'>제목</th>
                        <th align='100'>등록일자</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((board) => (
                            <tr key={board.no}>
                                <td align='center'>
                                    <Link to={`/Home/boards/${board.no}`}>
                                        {board.userNickname}
                                    </Link>
                                </td>
                                <td align='left'>
                                    <Link to={`/Home/boards/${board.no}`}>
                                        {board.title}
                                    </Link>
                                </td>
                                <td align='center'>
                                    <Link to={`/Home/boards/${board.no}`}>
                                        {board.regDate}
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        boardList.map((board) => (
                            <tr key={board.no}>
                                <td align='center'>
                                    <Link to={`/Home/boards/${board.no}`}>
                                        {board.userNickname}
                                    </Link>
                                </td>
                                <td align='left'>
                                    <Link to={`/Home/boards/${board.no}`}>
                                        {board.title}
                                    </Link>
                                </td>
                                <td align='center'>
                                    <Link to={`/Home/boards/${board.no}`}>
                                        {board.regDate}
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <select
                className="w-40 h-10 border-2 border-green-500 focus:outline-none focus:border-green-500 text-green-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
            >
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="userNickname">작성자</option>
            </select>

            <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                className="w-40 md:w-60 px-3 h-10 rounded-l border-2 border-green-500 focus:outline-none focus:border-green-500"
            />

            <button onClick={searchForBoardCategory} className={styles.searchbtn}>
                검색
            </button>
            {showAlert && (
                <div className={styles.alert}>
                    검색 결과가 없습니다.
                </div>
            )}
        </div>
    );
};

export default BoardList;