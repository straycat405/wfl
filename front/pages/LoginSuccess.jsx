import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginSuccess() {

    let loginedUser = JSON.parse(sessionStorage.getItem('loginedUser'));

  return (
    <>
      <Navbar />
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <h2>로그인 완료</h2>
          <p>현재 로그인 사용자 : {loginedUser.userEmail}</p>
        </div>

      <Footer />
    </>
  );
}
