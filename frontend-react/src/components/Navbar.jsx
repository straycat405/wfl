import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function Navbar() {

  let loginedUser = JSON.parse(localStorage.getItem('loginedUser'));

  const navigate = useNavigate();

  // function toLoginPage() {
  //   if (confirm("로그인 페이지로 이동합니다.") == true){    //확인
  //       navigate("/login");
  //   }else{   //취소
  //       return false;
  //   }
  // }

  function toSignupPage() {
    if (loginedUser == null) {
      confirm("회원가입 페이지로 이동합니다.") && navigate("/signup");
    } else {
      navigate("/mypage");
    }

  }

  function toLogout() {
    if (loginedUser == null) {
      if (confirm("로그인 페이지로 이동합니다.") == true) {
        navigate("/login");
      } else {
        return false;
      }
    } else {
      if (confirm("로그아웃 하시겠습니까?") == true ) {
        localStorage.clear();
        navigate("/");
      } else {
        return false;
      }
    }
  }

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <Link
          className="flex-none text-2xl font-semibold text-green-500"
          to="/"
        >
          WFL
        </Link>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
        <span
            className="font-medium text-gray-600 "
          >
            {loginedUser ? "접속중인 사용자명 : " + loginedUser.userName : null}
          </span>
          <button
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={toLogout}
          >
            {loginedUser !== null ? 'Logout' : 'Login'}
          </button>
          <button
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={toSignupPage}
          >
            {loginedUser !== null ? 'Mypage' : 'Signup'}
          </button>
        </div>
      </nav>
    </header>
  );
}
