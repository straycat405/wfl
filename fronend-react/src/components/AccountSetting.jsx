import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import defaultImg from "../assets/images/defaultprofile.jpg";

export default function AccountSetting() {

    // 로그인 정보가 sessionStorage에 없는 url 접근 차단

    useEffect(() => { //useEffect : 컴포넌트가 처음 렌더링 될 때 실행
      if (sessionStorage.length == 0) {
        alert("로그인이 필요한 페이지입니다.");
        navigate("/");
      }
      if (loginedUser.userProfile) {
        setImage(loginedUser.userProfile);
      } else {
        setImage(defaultImg);
      }
    }, [sessionStorage]);

  //로그인중인 유저정보
  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

  //스프링부트와 API통신을 위한 기본 URL 변수설정
  const baseUrl = "http://localhost:8080";
  //Navigate 이용을 위한 함수 호출
  const navigate = useNavigate();

  //useState 변수설정
  const [editedEmail, setEditedEmail] = useState(
    !loginedUser ? "" : loginedUser.userEmail
  );
  const [editedName, setEditedName] = useState(
    !loginedUser ? "" : loginedUser.userName
  );
  const [editedNickname, setEditedNickname] = useState(
    !loginedUser ? "" : loginedUser.userNickname
  );
  const [editedPhone, setEditedPhone] = useState(
    !loginedUser ? "" : loginedUser.userPhone
  );
  const [image, setImage] = useState(!loginedUser ? defaultImg : loginedUser.userProfile);

  const fileInput = useRef(null);

  // 유저 정보 수정 공간 label <-> input 스왑을 위한 useState 설정
  const [classLabelSet, setClassLabelSet] = useState(
    "block border border-gray-400 w-full p-3 rounded mb-4 "
  );
  const [classInputSet, setClassInputSet] = useState(
    "block border border-grey-light w-full p-3 rounded mb-4 hidden"
  );
  const [classLabelSet2, setClassLabelSet2] = useState(
    "block border border-gray-400 w-full p-3 rounded mb-4 "
  );
  const [classInputSet2, setClassInputSet2] = useState(
    "block border border-grey-light w-full p-3 rounded mb-4 hidden"
  );
  const [classLabelSet3, setClassLabelSet3] = useState(
    "block border border-gray-400 w-full p-3 rounded mb-4 "
  );
  const [classInputSet3, setClassInputSet3] = useState(
    "block border border-grey-light w-full p-3 rounded mb-4 hidden"
  );
  const [classLabelSet4, setClassLabelSet4] = useState(
    "block border border-gray-400 w-full p-3 rounded mb-4 "
  );
  const [classInputSet4, setClassInputSet4] = useState(
    "block border border-grey-light w-full p-3 rounded mb-4 hidden"
  );


  // 프로필 이미지 업로드시 db에 저장 및 변경
  const onChangeImg = (e) => {
    e.preventDefault();

    // 업로드 했으면 formData에 저장 후 axios api 전송
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const uploadFile = e.target.files[0];

      // 전송을 위한 이미지 formData 처리
      const formData = new FormData();
      formData.append("files", uploadFile);
      // DB 추가를 위한 사용자 정보 formData에 append
      formData.append("userId", loginedUser.userId);

      alert("프로필 이미지 변경 성공");

      axios({
        method: "POST",
        url: baseUrl + "/api/files/images",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data); // response에는 백에서 업데이트된 유저정보 받아옴
          // 세션 비우고 업데이트된 유저객체로 리셋
          sessionStorage.clear();
          sessionStorage.setItem("loginedUser", JSON.stringify(res.data));
          console.log("프로필 이미지 변경 완료");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // 화면에 프로필 사진 표시

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    setImage(loginedUser.userProfile);
    
  };

  // 수정버튼 누르면 label <-> input 교체
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

  //이름 수정 저장
  function toInputSwap2() {
    if (classLabelSet2 !== "hidden") {
      setClassLabelSet2("hidden");
      setClassInputSet2(
        "block border border-grey-light w-full p-3 rounded mb-4 "
      );
    } else {
      setClassLabelSet2(
        "block border border-gray-400 w-full p-3 rounded mb-4 "
      );
      setClassInputSet2("hidden");
    }
  }

  //닉네임 수정 저장
  function toInputSwap3() {
    if (classLabelSet3 !== "hidden") {
      setClassLabelSet3("hidden");
      setClassInputSet3(
        "block border border-grey-light w-full p-3 rounded mb-4 "
      );
    } else {
      setClassLabelSet3(
        "block border border-gray-400 w-full p-3 rounded mb-4 "
      );
      setClassInputSet3("hidden");
    }
  }

  //연락처 수정 저장
  function toInputSwap4() {

    if (classLabelSet4 !== "hidden") {
      setClassLabelSet4("hidden");
      setClassInputSet4(
        "block border border-grey-light w-full p-3 rounded mb-4 "
      );
    } else {
      setClassLabelSet4(
        "block border border-gray-400 w-full p-3 rounded mb-4 "
      );
      setClassInputSet4("hidden");
    }
  }

  //회원정보 수정 완료 제출
  function modifyPosting() {
    if (
      loginedUser &&
      editedEmail &&
      editedName &&
      editedNickname &&
      editedPhone &&
      confirm("입력된 내용으로 사용자 정보를 수정하시겠습니까?")
    ) {
      // axios를 이용한 POST 방식 데이터 전달
      axios({
        method: "POST",
        url: baseUrl + "/modifyConfirm",
        data: {
          userId: loginedUser.userId,
          userEmail: editedEmail,
          userName: editedName,
          userNickname: editedNickname,
          userPhone: editedPhone,
        },
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          alert("회원정보 수정 완료!");
          // session 로그인 유저 정보 수정된 것으로 교체
          sessionStorage.clear();
          sessionStorage.setItem("loginedUser", JSON.stringify(res.data));
          navigate("/");
        })
        .catch((error) => {
          console.log("회원정보 수정 중 오류 발생\n 오류 내용 : " + error);
          console.log(error);
        });
    } else {
      if (!loginedUser) {
        alert("로그인 세션 만료, 재로그인해주세요");
      } else if (!editedEmail) {
        alert("이메일을 올바르게 입력해주세요.");
      } else if (!editedName) {
        alert("이름을 올바르게 입력해주세요.");
      } else if (!editedNickname) {
        alert("닉네임을 올바르게 입력해주세요.");
      } else if (!editedPhone) {
        alert("연락처를 올바르게 입력해주세요.");
      }
    }
  }

  //회원 탈퇴
  function resignUser(userId) {
    if(confirm("정말 탈퇴하시겠습니까?")) {
          axios({
      method: "GET",
      url: baseUrl + "/resignUser?userId=" + userId,
    })
      .then((res) => {
        alert(res.data);
        sessionStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.log("탈퇴 처리중 오류 발생 : " + error);
        console.log(error);
      });
    }

  }

  function test() {
    console.log(sessionStorage.getItem("loginedUser").userId);
    console.log(JSON.parse(sessionStorage.getItem("loginedUser")).userId);
  }

  return (
  
    <>
      <button onClick={test}>test</button>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">회원 정보 수정</h1>

            <div className="mb-5 ml-24">
              <div className="flex font-semibold text-base">
                <label className="-translate-x-24 my-auto mx-auto tracking-widest">
                  프로필 (사진을 클릭해 업로드)
                </label>
                <img
                  src={image}
                  className="size-16 rounded-full overflow-hidden mr-3 translate-x-1"
                  onClick={() => {
                    fileInput.current.click();
                  }}
                />
              </div>

              <input
                type="file"
                accept="image/jpg,image/png,image/jpeg"
                className="hidden"
                name="profile_img"
                onChange={onChangeImg}
                ref={fileInput}
              />
            </div>

            <div className="flex font-semibold text-base">
              {/* 이메일 수정 */}
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
            {/* 이름 수정 */}
            <div className="flex font-semibold text-base">
              <label className="align-middle my-3 m-auto w-40 text-center">
                이름
              </label>
              <label className={classLabelSet2}>{editedName}</label>
              <input
                type="text"
                className={classInputSet2}
                name="Name"
                placeholder="이름"
                value={editedName}
                onChange={(event) => setEditedName(event.target.value)}
                required
              />
              <button
                type="submit"
                className="flex w-20 h-8 m-3 p-3 items-center rounded bg-green-500 text-white hover:bg-green-600"
                onClick={toInputSwap2}
              >
                {classLabelSet2 == "hidden" ? "저장" : "수정"}
              </button>
            </div>
            {/* 닉네임 수정 */}
            <div className="flex font-semibold text-base">
              <label className="align-middle my-3 m-auto w-40 text-center">
                닉네임
              </label>
              <label className={classLabelSet3}>{editedNickname}</label>
              <input
                type="text"
                className={classInputSet3}
                name="Nickname"
                placeholder="닉네임"
                value={editedNickname}
                onChange={(event) => setEditedNickname(event.target.value)}
                required
              />
              <button
                type="submit"
                className="flex w-20 h-8 m-3 p-3 items-center rounded bg-green-500 text-white hover:bg-green-600"
                onClick={toInputSwap3}
              >
                {classLabelSet3 == "hidden" ? "저장" : "수정"}
              </button>
            </div>

            {/* 연락처 수정 */}
            <div className="flex font-semibold text-base">
              <label className="align-middle my-3 m-auto w-40 text-center">
                연락처
              </label>
              <label className={classLabelSet4}>{editedPhone}</label>
              <input
                type="text"
                className={classInputSet4}
                name="Phone"
                placeholder="휴대폰 번호"
                value={editedPhone}
                onChange={(event) => setEditedPhone(event.target.value)}
                required
              />
              <button
                type="submit"
                className="flex w-20 h-8 m-3 p-3 items-center rounded bg-green-500 text-white hover:bg-green-600"
                onClick={toInputSwap4}
              >
                {classLabelSet4 == "hidden" ? "저장" : "수정"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
              onClick={modifyPosting}
            >
              회원 정보 수정
            </button>
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none my-1"
              onClick={()=>resignUser(loginedUser.userId)}
            >
              회원 탈퇴
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
}
