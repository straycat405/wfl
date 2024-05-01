import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SHA256 } from "crypto-js";

export default function Login() {
    //react <-> springBoot axios api 요청용 base Url
    const baseUrl = "http://localhost:8080";

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 회원가입 페이지 이동
    function toSignupPage() {
        if (confirm("회원가입 페이지로 이동합니다.") == true){    //확인
            navigate("/signup");
        }else{   //취소
            return false;
        }
      }

    // 입력 패스워드 암호화
    //비밀번호 암호화
   const hash = SHA256(password).toString();

    // 로그인 제출
    function loginPosting() {
        if(email && password) {
            // axios를 이용한 POST 방식 데이터 전달
            axios({
              method: "POST",
              url: baseUrl + "/loginConfirm",
              data: {
                userEmail: email,
                userPw: hash,
              },
              headers: { "Content-type": "application/json" },
            })
              .then((res) => {

                if (res.data !== "") {

                alert("로그인 성공");
                sessionStorage.clear();
                sessionStorage.setItem('loginedUser', JSON.stringify(res.data));

                let loginedUser = JSON.parse(sessionStorage.getItem('loginedUser'));

                if (loginedUser.adminAuth == 1) {
                  navigate("/admin/main");
                } else {
                  navigate("/ledger/main/" + loginedUser.userEmail , { state: loginedUser.userId });
                }

                
            } else {
                alert("로그인 실패 : 이미 탈퇴한 계정입니다.");
            }
              })
              .catch((error) => {
                alert("로그인 실패 : 이메일과 비밀번호를 확인해주세요.");
                setEmail("");
                setPassword("");
                console.log("회원가입 오류 발생\n 오류 내용 : " + error);
                console.log(error);
              });
          } else {
            if ( !email ) {
              alert ("올바른 이메일 주소를 입력해주세요");
            } else if ( !password ) {
              alert ("비밀번호를 입력하세요");
            }
          }
    }
  
    return(
      <>



<div className="bg-grey-lighter m-20">
            <div className="container max-w-sm mx-auto items-center justify-center px-2">
                <div className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">로그인</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="Email"
                        placeholder="이메일"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required />

                   <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required />

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                        onClick={loginPosting}
                    >로그인</button>

                </div>

                <div className="text-grey-dark mt-6 translate-x-12">
                    <button className="inline-block px-5 hover:text-green-500"
                            onClick={()=>navigate("/findId")}>
                        아이디 찾기
                    </button>
                    <button className="inline-block hover:text-green-500"
                            onClick={()=>navigate("/findPw")}>
                        비밀번호 찾기
                    </button>
                    <button className="block pl-14 pt-5 hover:text-green-500"
                            onClick={toSignupPage}>
                        회원가입 바로가기
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}