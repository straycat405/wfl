import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

export default function SignUpSuccess() {
    return(
        <>
        <Navbar2 />
        <div>
            <h1>회원가입 완료</h1>
            <button>로그인하기</button>
        </div>
        <Footer />
    </>
    );
}