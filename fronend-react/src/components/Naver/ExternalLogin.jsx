import Naver from "./Naver";
import { Link } from "react-router-dom";

export default function ExternalLogin() {
    return (
      <>
      <div className="container w-16 mx-auto my-4 flex-1 flex flex-col items-center justify-center px-2">
        <Naver />
        </div>
        <p className="text-center"> 네이버 회원가입</p>
        {/* 카카오 로그인 */}
        <div className="container w-16 mx-auto my-4 flex-1 flex flex-col items-center justify-center px-2">
        <button
            onClick={() => window.location.href = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5bc0e2fc238ea18d83294878dc1489a5&redirect_uri=http://localhost:8080/kakao/callback"}>
            <img src={"src/assets/images/kakaologo.png"} alt="카카오 버튼"/>
          </button>
          </div>
          <p className="text-center"> 카카오 회원가입</p>

      </>
    );
  }