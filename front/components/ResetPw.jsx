import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { SHA256 } from "crypto-js";

export default function ResetPw() {

    const baseUrl = "http://localhost:8080";

    const navigate = useNavigate();

    const  { state } = useLocation();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwChecked, setPwChecked] = useState(false);

    // 새로운 비밀번호 암호화
    const newHash = SHA256(password).toString();

    // 새로운 비밀번호로 수정

    function resetPwPosting() {
            if(password && confirmPassword && pwChecked) {
        axios({
            method: "POST",
            url: baseUrl + "/resetPwConfirm",
            data: {
              userEmail: state.userEmail,
              userPw: newHash,
            userName: state.userName,
            userPhone: state.userPhone,
            },
            headers: { "Content-type": "application/json" },
          })
            .then((res) => {
              alert("비밀번호 변경 성공 : 새로 로그인 해주세요.");
              setPassword("");
              setConfirmPassword("");
              navigate("/login");
            })
            .catch((error) => {
              console.log("비밀번호 수정 중 오류 발생\n 오류 내용 : " + error);
              console.log(error);
            });
    }
    }


    // 새로운 비밀번호 중복 검사

    let confirmStyle = "pb-3.5 text-gray-700";

    if (password !== confirmPassword) {
      confirmStyle = "pb-3.5 text-red-500";
    }
  
    const validatePassword = (confirmPassword) => {
      const messageElement = document.getElementById('password-validation-message');
      
    
      if (confirmPassword === '') {
        messageElement.textContent = '';
        return;
      }
    
      if (password !== confirmPassword) {
        messageElement.textContent = '비밀번호가 일치하지 않습니다.';
        messageElement.classList.add('error');
        setPwChecked(false);
      } else if (password == confirmPassword) {
        messageElement.textContent = '비밀번호가 일치합니다.';
        messageElement.classList.remove('error');
        setPwChecked(true);
      } 
    };
  

    return (
        <>
<div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">새 비밀번호 설정</h1>

                   <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          validatePassword(event.target.value);
                        }}
                        required 
                        />

                  <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password2"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(event) => {
                          setConfirmPassword(event.target.value);
                          validatePassword(event.target.value);
                        }}
                        required 
                        />
                  <p id="password-validation-message"
                    className={confirmStyle}></p>

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
                        onClick={resetPwPosting}
                    >비밀번호 수정</button>

                </div>
            </div>
        </div>
        </>
    );
}