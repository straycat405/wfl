import React, { useEffect, useState }  from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as boards from '../../apis/boards';
import BoardUpdateForm from "./BoardUpdateForm";
//게시글 수정
const BoardUpdateContainer = () => {
    const { no } = useParams();

    const [board, setBoard] = useState({})

    const navigate = useNavigate();

    const onUpdate = async (no, title, userNickname, content) => {
        try {
            const response = await boards.update(no, title, userNickname, content)
            console.log(response.data);
            alert('수정 완료')

            // -> 게시글 목록 이동
            navigate('/Home/boards')
        }
        catch(e) {
            console.log(e);
        }
    }

    const getBoard = async () => {
        try {
            const response = await boards.select(no);
            const data = response.data;
            console.log(data);
            setBoard(data);
        }
        catch(e) {
            console.log(e);
        }
    }

    const onDelete = async (no) => {
        const response = await boards.remove(no);
        console.log(response.data);
        alert('삭제 되었습니다')

        // -> 게시글 목록 이동
        navigate('/Home/boards')
    }

    useEffect( () => {
        getBoard(no)
    }, [no])

    return (<BoardUpdateForm no = {no} 
                             board = {board} 
                             onUpdate={onUpdate}
                             onDelete={onDelete} 
                             />
    )
}

export default BoardUpdateContainer