import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function KakaoAuth() {

    const navigate = useNavigate();

    const code = new URL(window.location.href).searchParams.get("code");
    const GRANTTYPE = 'authorization_code';
    const CLIENT_ID = '25a2d1de67ba83ce7b3a5e549d1b8a38';
    const REDIRECT_URI = 'http://localhost:5173/kakao/auth';
    
    const [data, setData] = useState([]);
    const [token ,setToken] = useState();


    useEffect(() => {
        getToken(code);
    },[])


    
    const getToken = async code => {

        await axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${GRANTTYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              },
            }
          ).then((res) => {
            console.log(res.data.access_token);
            setToken(res.data.access_token);
            console.log(token);
            getKaKaoUserData(res.data.access_token);
        })
    }
    
    const getKaKaoUserData = async token => {
        await axios.get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            console.log(res);
            setData(res.data);
        })
    }

    return (
        <>
        <div className="text-center">
            
              <div className="m-auto">
                <h2 className="text-2xl m-12">카카오 회원정보 조회 성공!</h2>
                <h3>{data?.properties?.nickname}님, {data?.kakao_account?.email} 주소로 연결했습니다.</h3>
        </div>
            </div>
            <div className="flex place-content-center">
                  <button
                  className="w-64 m-4 p-3 my-12 rounded text-xl bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => navigate('/signup', 
                  { state: {
                        name : data?.properties?.nickname,
                        email : data?.kakao_account?.email,
                        nickname : ''
                  } })}
                  >
                    회원가입 마저 작성하기
                  </button>
                  </div>
        </>
    );
}