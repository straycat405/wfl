import SocialKakao from "../Kakao/Kakao";
import Naver from "./Naver";
import { Link } from "react-router-dom";

export default function ExternalLogin() {
    return (
      <>
      <div className="container w-16 mx-auto my-4 flex-1 flex flex-col items-center justify-center px-2">
        <Naver />
        </div>
        <p className="text-center"> 네이버 회원가입</p>
        <div className="container w-16 mx-auto my-4 flex-1 flex flex-col items-center justify-center px-2">
        <SocialKakao />
        </div>
        <p className="text-center"> 카카오 회원가입</p>
       

          

      </>
    );
  }