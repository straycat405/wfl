import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FindId() {

    const baseUrl = "http://localhost:8080";

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [data, setData] = useState(null);

    const msg =  <div className="text-grey-dark mt-6">
                 <p>조회 결과</p>
                 <p>이메일주소 : {data}</p>
                 <button 
                 className="w-full text-center py-2 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                 onClick={() => navigate("/findPw")}>
                    비밀번호 찾기
                 </button>
                </div>

    function findIdPosting() {
        if ( name && phone ) {
            axios({
                method: "POST",
                url: baseUrl + "/findUserEmail",
                data: {
                    userName: name,
                    userPhone: phone,
                },
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    if (res.data == '해당하는 이메일이 없습니다.') {
                        alert(res.data);
                        setData(null);
                    } else {
                        alert("이메일 조회 성공");
                        setData(res.data);
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
            <h1 className="mb-8 text-3xl text-center">이메일 찾기</h1>
            <p className="text-sm text-gray-400">회원가입시 입력하신 이름을 적어주세요.</p>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
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
              onClick={findIdPosting}
            >
              이메일 찾기
            </button>
          </div>
          {data ? msg : ''}
      </div>
      </div>
    </>
  );
}
