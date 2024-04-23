import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './BoardInsertForm.module.css'

const BoardInsertForm = ({ onInsert }) => {

    let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

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
        onInsert(title, loginedUser.userNickname, content)
    }

    return (
        <div className='con'>
            <table border={1} className={styles.tab}>
                <tbody>
                    <tr>
                        <td>제목</td>
                        <td>
                            <input type="text" className={styles['form-input']} value={title} onChange={handleChangeTitle} />
                        </td>
                    </tr>
                    <tr>
                        <td>작성자</td>
                        <td>
                            <input type="text" className={styles['form-input']} value={loginedUser.userNickname} onChange={handleChangeuserNickname} />
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

            <div className='but-box'>
                <Link to="/Home/boards" className={`but ${styles.but}`}>목록</Link>
                <button className={`but ${styles.but} ${styles.insert}`} onClick={onSubmit}>등록</button>
            </div>
        </div>
    )
}

export default BoardInsertForm
