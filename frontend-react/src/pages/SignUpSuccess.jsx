import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SignUpSuccess() {
  return (
    <>
      <Navbar />
        <div>
          <h2>회원가입 완료!</h2>
          <p>WFL과 함께 자산 늘리기</p>
          <a href="/main">
            <button>시작!</button>
          </a>
        </div>
        <div>
          <h1>회원가입 완료</h1>
          <button>로그인하기</button>
        </div>

      <Footer />
    </>
  );
}
