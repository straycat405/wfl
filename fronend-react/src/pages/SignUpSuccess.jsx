import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function SignUpSuccess() {
  return (
    <>
      <Navbar />
        <div className="text-center">
          <h2 className="text-2xl m-12">회원가입 완료!</h2>
          <h1 className="m-12 text-3xl text-green-500">WFL과 함께 자산 늘리기</h1>
          <Link className="rounded text-3xl text-green-500 hover:text-green-700" to="/login">시작!
          </Link>
        </div>
        <div className="flex m-12">
          </div>
      <Footer />
    </>
  );
}
