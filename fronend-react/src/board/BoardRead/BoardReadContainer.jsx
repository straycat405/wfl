import React, { useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import * as boards from '../../apis/boards'
import BoardRead from "./BoardRead";

//게시글 조회
const BoardReadContainer = () => {
    const { no } = useParams()

    const [board, setBoard] = useState([]);

    const getBoard = async (no) => {
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

    useEffect( () => {
        console.log('no: ' + no);
        getBoard(no)
    }, [no])


    return (<BoardRead no = {no}
                      board = {board}
    />)
 
}

export default BoardReadContainer 