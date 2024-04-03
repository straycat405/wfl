import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AccountSetting() {
  //로그인중인 유저정보
  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));
  //스프링부트와 API통신을 위한 기본 URL 변수설정
  const baseUrl = "http://localhost:8080";
  //Navigate 이용을 위한 함수 호출
  const navigate = useNavigate();
  //useState 변수설정
  const [editedEmail, setEditedEmail] = useState(loginedUser.userEmail);
  const [classLabelSet, setClassLabelSet] = useState(
    "block border border-gray-400 w-full p-3 rounded mb-4 "
  );
  const [classInputSet, setClassInputSet] = useState(
    "block border border-grey-light w-full p-3 rounded mb-4 hidden"
  );

  // 로그인 정보가 sessionStorage에 없는 url 접근 차단
  if (!loginedUser) {
    alert("로그인이 필요한 페이지입니다.");
    localStorage.clear();
    navigate("/");
  }

  // 수정버튼 누르면 label <-> input 교체 (이메일의 경우 동시에 이메일 중복 검사)
  function toInputSwap() {
    if (classLabelSet !== "hidden") {
      setClassLabelSet("hidden");
      setClassInputSet(
        "block border border-grey-light w-full p-3 rounded mb-4 "
      );
    } else {
      setClassLabelSet("block border border-gray-400 w-full p-3 rounded mb-4 ");
      setClassInputSet("hidden");
    }
  }

  //회원정보 수정 완료 제출
  function modifyPosting() {
    if (loginedUser && editedEmail && confirm("입력된 내용으로 사용자 정보를 수정하시겠습니까?") ) {
      // axios를 이용한 POST 방식 데이터 전달
      axios({
        method: "POST",
        url: baseUrl + "/modifyConfirm",
        data: {
            userId: loginedUser.userId,
          userEmail: editedEmail,
        },
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          alert("회원정보 수정 완료!");
          // session 로그인 유저 정보 수정된 것으로 교체
          sessionStorage.clear();
          sessionStorage.setItem('loginedUser', JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log("회원정보 수정 중 오류 발생\n 오류 내용 : " + error);
          console.log(error);
        });
    } else {
      if (!loginedUser) {
        alert("로그인 세션 만료, 재로그인해주세요");
      } else if (!email) {
        alert("이메일을 올바르게 입력해주세요.");
      }
    }
  }

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">회원 정보 수정</h1>
            <div className="flex font-semibold text-base">
              <label className="align-middle my-3 m-auto w-40 text-center">
                이메일
              </label>
              <label className={classLabelSet}>{editedEmail}</label>
              <input
                type="text"
                className={classInputSet}
                name="Email"
                placeholder="이메일"
                value={editedEmail}
                onChange={(event) => setEditedEmail(event.target.value)}
                required
              />
              <button
                type="submit"
                className="flex w-20 h-8 m-3 p-3 items-center rounded bg-green-500 text-white hover:bg-green-600"
                onClick={toInputSwap}
              >
                {classLabelSet == "hidden" ? "저장" : "수정"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
              onClick={modifyPosting}
            >
              회원 정보 수정
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
