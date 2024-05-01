import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectURI () {

    const navigate = useNavigate();

    const { naver } = window; 

    const [user, setUser] = useState('');

    useEffect(() => {
        naverLogin.init();
        console.log(user);
        getUser();
    },[]);

    const naverLogin = new naver.LoginWithNaverId({
        clientId: "aV5SfXnMg2lxjVEoD3Hj",
        callbackUrl: "http://localhost:5173/naver/callback",
        isPopup: false,
        loginButton: {
          color: "green",
          type: 3,
          height: 50,
        },
      });

      const getUser = async () => {
        await naverLogin.getLoginStatus((status) => {
          console.log(`로그인?: ${status}`);
          if (status) {
            setUser({ ...naverLogin.user });
            navigate('/naver/callback');
          }
        });
      };

      return (
        <>
            <div id="naverIdLogin" hidden></div>
        <div className="text-center">
            {user ? (
              <div className="m-auto">
                <h2 className="text-2xl m-12">네이버 회원정보 조회 성공!</h2>
                <h3>{user.name}님, {user.email} 주소로 연결했습니다.</h3>
        </div>
            ) : (
              // 네이버 로그인 버튼
              <div>
                <div id="naverIdLogin"></div>
              </div>
            )}
            </div>
            <div className="flex place-content-center">
                  <button
                  className="w-64 m-4 p-3 my-12 rounded text-xl bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => navigate('/signup', 
                  { state: {
                        name : user.name,
                        email : user.email,
                        nickname : user.nickname
                  } })}
                  >
                    회원가입 마저 작성하기
                  </button>
                  </div>
          </>
      )

}