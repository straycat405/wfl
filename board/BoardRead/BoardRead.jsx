import React from "react"
import { Link, useParams } from "react-router-dom"
import styles from './BoardRead.module.css'
import * as format from '../../apis/format'

const BoardRead = ({ no, board }) => {
    return (
        <div className={styles.con}>
            <h3>{board.title}</h3>
            <hr />
            <table className={styles.tab}>
                <tbody>
                    {/* <tr>
                        <td>번호</td>
                        <td>
                            <input type="text" className={styles['form-input']} value={board.no} readOnly />
                        </td>
                    </tr> */}
                    <tr>
                        <td>제목</td>
                        <td>
                            <input type="text" className={styles['form-input']} value={board.title} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>등록일자</td>
                        <td>
                            <input type="text" className={styles['form-input']} value={board.regDate} readOnly />
                        </td>
                    </tr>

                    <tr>
                        <td>작성자</td>
                        <td>
                            <input type="text" className={styles['form-input']} value={board.userNickname} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <textarea cols="40" rows="5" className={`${styles['form-input']} ${styles['textarea-box']}`} value={board.content} readOnly></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>

            <hr />
            <div className={styles['but-box']}>
                <Link to="/Home/boards" className={`but ${styles.but}`}>목록</Link>
                <Link to={`/Home/boards/update/${no}`} className={`but ${styles.but} ${styles.update}`}>수정</Link>
            </div>
        </div>
    );
}

export default BoardRead;
