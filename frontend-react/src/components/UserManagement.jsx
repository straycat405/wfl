import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";


export default function UserManagement() {

    let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

    const baseUrl = "http://localhost:8080";

    const navigate = useNavigate();


  useEffect(() => { //useEffect : 컴포넌트가 처음 렌더링 될 때 실행
    if (sessionStorage.length == 0) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/");
    }
  }, []);


  

return (
    <>

    </>
  );
};