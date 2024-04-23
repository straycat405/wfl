import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from './BoardUpdateForm.module.css'

const BoardUpdateForm = ({ no, board, onUpdate, onDelete }) => {
    const [title, setTitle] = useState('')
    const [userNickname, setuserNickname] = useState('')
    const [content, setContent] = useState('')

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeuserNickname = (e) => {
        setuserNickname(e.target.value)
    }

    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }

    const onSubmit = () => {
        onUpdate(no, title, userNickname, content)
    }

    useEffect(() => {
        if (board) {
            setTitle(board.title);
            setuserNickname(board.userNickname);
            setContent(board.content);
        }
    }, [board])

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
                            <input type="text" className={styles['form-input']} value={title} onChange={handleChangeTitle} />
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
                            <input type="text" className={styles['form-input']} value={userNickname} onChange={handleChangeuserNickname} />
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <textarea cols="40" rows="5" className={`${styles['form-input']} ${styles['textarea-box']}`} value={content} onChange={handleChangeContent}></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <div className={styles['but-box']}>
                <div className="itemm">
                    <Link to="/Home/boards" className={`${styles.but} ${styles['button']}`}>목록</Link>
                </div>
                <div className="itemm">
                    <button className={`${styles.but} ${styles['button']} ${styles['delete']}`} onClick={() => onDelete(no)}>삭제</button>
                    <button className={`${styles.but} ${styles['button']} ${styles['update']}`} onClick={onSubmit}>수정</button>
                </div>
            </div>
        </div>
    )
}

export default BoardUpdateForm
