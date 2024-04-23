import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FindPw() {

    const baseUrl = "http://localhost:8080";

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    function findPwPosting() {
        if ( email && name && phone ) {
            axios({
                method: "POST",
                url: baseUrl + "/findUserPw",
                data: {
                    userEmail: email,
                    userName: name,
                    userPhone: phone,
                },
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    if (res.data == "해당하는 사용자 정보가 없습니다.") {
                        alert(res.data);
                    } else {
                        alert("사용자 조회 성공");
                        navigate("/resetPw",
                        { state: { 
                            userEmail: email,
                            userName: name,
                            userPhone: phone,
                        }});
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else if ( !name ) {
            alert("이름을 입력하세요.");
        } else if ( !phone ) {
            alert("휴대폰 번호를 입력하세요.");
        }
    }


  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">비밀번호 찾기</h1>
            <p className="text-sm text-gray-400">회원가입시 입력하신 이메일을 적어주세요.</p>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              placeholder="이메일"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
                        <p className="text-sm text-gray-400">회원가입시 입력하신 이름을 적어주세요.</p>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="text"
              placeholder="이름"
              required
              onChange={(event) => setName(event.target.value)}
            />
            <p className="text-sm text-gray-400">회원가입시 입력하신 연락처를 적어주세요.</p>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="text"
              placeholder="휴대폰 번호"
              required
              onChange={(event) => setPhone(event.target.value)}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
              onClick={findPwPosting}
            >
              비밀번호 재설정
            </button>
          </div>
      </div>
      </div>
    </>
  );
}
