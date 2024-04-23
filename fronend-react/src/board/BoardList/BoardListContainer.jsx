import React, { useEffect, useState }  from "react";
import * as boards from '../../apis/boards'
import BoardList from "./BoardList";
//게시글 목록
const BoardListContainer = () => {

    const [boardList, setBoardList] = useState([]);

    const getBoardList = async () => {
        try {
        const response = await boards.list();
        const data = await response.data;
        setBoardList(data);
    }
    catch(error) {
        console.error("Error fetching board list:", error);
    }
};

    useEffect( () => {
        getBoardList();
    }, [])

    return <BoardList boardList={boardList} />

}

export default BoardListContainer