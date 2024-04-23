import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <h3>게시판</h3>
            <Link to ="/Home/boards">목록</Link>
        </div>
    )
}

export default Home;