import React from "react";
import axios from "axios";

// 해당 컴포넌트는 그냥 테이블 객체라고 생각할것 (물론 함수의 형태)
// 부모 컴포넌트 (이 테이블을 소환할 컴포넌트)에서 props를 전달해주는 식으로 설정)
// 여기선 가장 기본적인 두 값, 컬럼 (항목명) + 데이타 (속성)을 전달

function UserTable({ data }) {
  function deleteUser(userId) {
    if (confirm(`정말 ${userId} 유저를 삭제하시겠습니까?`)) {
      console.log("삭제할 유저 아이디 : " + userId);
      axios
        .delete("http://localhost:8080/deleteUser?userId=" + userId)
        .then((res) => {
          alert("삭제 완료");
          console.log(res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function unResignUser(userId) {
    if (confirm(` ${userId} 유저를 복구합니다.`)) {
      console.log("복구할 유저 아이디 : " + userId);
      axios
        .get("http://localhost:8080/unResignUser?userId=" + userId)
        .then((res) => {
          alert("복구 완료");
          console.log(res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    {/* {columns.map((column) => (
            <th key={column}>{column}</th>
          ))} */}
                    <th scope="col" className="px-6 py-4">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      이메일
                    </th>
                    <th scope="col" className="px-6 py-4">
                      이름
                    </th>
                    <th scope="col" className="px-6 py-4">
                      닉네임
                    </th>
                    <th scope="col" className="px-6 py-4">
                      가입일자
                    </th>
                    <th scope="col" className="px-6 py-4">
                      관리자
                    </th>
                    <th scope="col" className="px-6 py-4">
                      구독
                    </th>
                    <th scope="col" className="px-6 py-4">
                      탈퇴여부
                    </th>
                    <th scope="col" className="px-6 py-4 ">
                      복구하기
                    </th>
                    <th scope="col" className="px-6 py-4 ">
                      삭제하기
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {data.map((i) => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={i.userId}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i.userId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.userEmail}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.userName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.userNickname}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.userRegDate}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.adminAuth == 0 ? "일반사용자" : "관리자"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.userPremium == 0 ? "미사용" : "구독중"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.userResign == 1 ? "탈퇴" : " X "}
                      </td>


                      <td>
                        <button
                          className="whitespace-nowrap px-6 py-4"
                          onClick={() => unResignUser(i.userId)}
                        >
                          {i.userResign == 1 ? '복구' : null}                          
                        </button>
                      </td>
                      <td>
                        <button
                          className="whitespace-nowrap px-6 py-4"
                          onClick={() => deleteUser(i.userId)}
                        >
                          {" "}
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserTable;
