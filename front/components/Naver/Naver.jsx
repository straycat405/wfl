import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const { naver } = window; 

const Naver = () => {

  useEffect(() => {
    naverLogin.init();
    console.log("init!");
  }, []);
  

    const naverLogin = new naver.LoginWithNaverId({
      clientId: "aV5SfXnMg2lxjVEoD3Hj",
      callbackUrl: "http://localhost:5173/naver/callback",
      isPopup: false,
      loginButton: {
        color: "green",
        type: 1,
        height: 50,
      },
    });

    return (
      <>
        <div id="naverIdLogin" />
      </>
    );
  };

  export default Naver;