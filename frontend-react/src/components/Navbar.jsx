import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Fragment, useContext, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import defaultImg from "../assets/images/defaultprofile.jpg";

//HeadlessUi 사용을 위한 함수
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  let loginedUser = JSON.parse(sessionStorage.getItem('loginedUser'));

  const navigate = useNavigate();

  // function toLoginPage() {
  //   if (confirm("로그인 페이지로 이동합니다.") == true){    //확인
  //       navigate("/login");
  //   }else{   //취소
  //       return false;
  //   }
  // }
  
  //접속중일시 프로필사진 표시
  const [profileSet, setProfileSet] = useState("size-10 rounded-full overflow-hidden hidden");
  const [profile, setProfile] = useState(defaultImg);

  useEffect(() => {
    if (loginedUser) {
      setProfileSet("size-10 rounded-full overflow-hidden");
      setProfile(loginedUser.userProfile ? `${loginedUser.userProfile}` : defaultImg);
    }
  }, []);

  useEffect(() => {
    if (!loginedUser) {
      setProfileSet("hidden");
      setProfile("");
    }
  }, []);

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
        sessionStorage.clear();
        setProfile("");
        navigate("/logout");
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
        {/* 테스트 */}
        {/*  */}
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
        <img src={profile} alt="profile" className={profileSet}/>
        {/* <img src="src/assets/profileimages/72eb5d54-e38b-4404-bc8a-45bcb3cae85f_BOOK001.jpg"></img> */}
        <span
            className="font-medium text-gray-600 "
          >
            {loginedUser ? "접속중인 사용자명 : " + loginedUser.userNickname : null}
          </span>
          <button
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-gray-600"
            onClick={toLogout}
          >
            {loginedUser !== null ? 'Logout' : 'Login'}
          </button>
          <button
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-gray-600"
            onClick={toSignupPage}
          >
            {loginedUser !== null ? 'Mypage' : 'Signup'}
          </button>
          {/* /// */}
          <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-gray-600">
          Options
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/accountSetting"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </Link>
              )}
            </Menu.Item>


          </div>
        </Menu.Items>
      </Transition>
    </Menu>

          {/* /// */}
        </div>
      </nav>
    </header>
  );
}
