import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  //스프링부트와 API통신을 위한 기본 URL 변수설정
  const baseUrl = "http://localhost:8080";
  //Navigate 이용을 위한 함수 호출
  const navigate = useNavigate();
  //useState 변수설정
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [pwChecked, setPwChecked] = useState(false);

  // 회원가입 버튼 클릭시 실행
  function posting() {

  if(email && emailChecked && password && pwChecked && name && phoneNumber) {
        // axios를 이용한 POST 방식 데이터 전달
        axios({
          method: "POST",
          url: baseUrl + "/signupConfirm",
          data: {
            userEmail: email,
            userPw: password,
            userName: name,
            userPhone: phoneNumber,
          },
          headers: { "Content-type": "application/json" },
        })
          .then((res) => {
            alert("성공");
            // API로 부터 받은 데이터 출력
            console.log(res.data);
            navigate("/signupSuccess");
          })
          .catch((error) => {
            console.log("회원가입 오류 발생\n 오류 내용 : " + error);
            console.log(error);
          });
      } else {
        if ( !email ) {
          alert ("올바른 이메일 주소를 입력해주세요");
        } else if ( !emailChecked ) {
          alert ("이메일 중복확인을 완료하십시오");
        } else if ( !password ) {
          alert ("비밀번호를 입력하세요");
        } else if ( !name ) {
          alert ("이름을 입력하세요");
        } else if ( !phoneNumber ) {
          alert ("연락처를 입력하세요");
        } else if ( !pwChecked ) {
          alert ("비밀번호가 일치하지 않습니다.");
        }
      }
  }

  //이메일 중복 확인 로직

  function handleEmailCheck() {
    if (!email) {
      alert("이메일을 입력해주세요");
    } else {
      console.log("이메일 중복 확인");

    axios({
      method: "POST",
      url: baseUrl + "/signupEmailCheck",
      data: {
        userEmail: email,
      },
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.data === 0) {
          alert("중복 이메일이 없습니다.");
          setEmailChecked(true);
        } else {
          alert("중복된 이메일이 존재합니다.");
        }
        console.log(res.data);
      })
      .catch((error) => {
        alert("이메일 중복 체크중 오류 발생");
        console.log(error);
      });
    }
    
  }

  

  // 비밀번호 유효성 검사

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
<div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">회원가입</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="Email"
                        placeholder="이메일"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required />
                    <button type="button"
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={handleEmailCheck}>
                       이메일 중복 체크
                   </button>

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
                        required />

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
                        required />
                  <p id="password-validation-message"
                    className={confirmStyle}></p>

                  <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="name"
                        placeholder="이름"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required />

                  <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="phone"
                        placeholder="휴대폰 번호"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        required />

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                        onClick={posting}
                    >회원 등록</button>

                </div>

                <div className="text-grey-dark mt-6">
                    이미 회원이신가요?
                    <Link className="pl-1 no-underline border-b border-blue text-blue" to="/login">
                        로그인
                    </Link>
                </div>
            </div>
        </div>
  );
}
export default SignUp;