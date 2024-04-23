import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './BoardList.css'
import styles from './BoardList.module.css'
import * as format from '../../apis/format'

const BoardList = ({ boardList }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/Home/boards');
    }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 useEffect가 실행되도록 합니다.

    // boardList가 유효한 배열인지 확인
    if (!Array.isArray(boardList)) {
        alert('게시물이 존재하지 않습니다');
        return (
            <div>
                <h1>게시글 목록</h1>
                <Link to="/Home/boards/insert">글쓰기</Link>
            </div>
        );
    }

    return (
        <div className='con'>
            {/* <h1 className='tit'>게시글 목록</h1> */}
            <button className={styles.button}><Link to="/Home/boards/insert">글쓰기</Link></button>
            <table border={1} className={ styles.tab }>
                <thead>
                    <tr>
                        {/* <th align='100'>번호</th> */}
                        <th align='100'>작성자</th>
                        <th align='100'>제목</th>
                        <th align='100'>등록일자</th>
                    </tr>
                </thead>
                <tbody>
    {boardList.map((board) => (
        <tr key={board.no}>
            {/* <td align='center'>{board.no}</td> */}
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
                    { (board.regDate) }
                    {/* {format.formatDate(board.regDate)} */}
                </Link>
            </td>
        </tr>
    ))}
</tbody>

            </table>
        </div>
    );
};

export default BoardList;
