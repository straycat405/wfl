import { useNavigate } from "react-router-dom";

export default function LedgerMenu() {

  let loginedUser = JSON.parse(sessionStorage.getItem('loginedUser'));

  const navigate = useNavigate();

  return (
    <header className="flex flex-wrap sm:justify-center sm:flex-nowrap z-50 w-full bg-white text-sm py-12 dark:bg-gray-800">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-center sm:mt-0 sm:ps-5 mx-auto">
          <button
            onClick={()=>{navigate("/ledger/main/" + loginedUser.userEmail)}}
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-gray-600"
          >
            지출내역
          </button>
          <button
            onClick={()=>{navigate("/ledger/income/" + loginedUser.userEmail)}}
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-gray-600"
          >
            수입내역
          </button>
          <button
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-gray-600"
          >
            캘린더
          </button>
          <button
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-gray-600"
          >
            차트조회
          </button>
        </div>
      </nav>
    </header>
  );
}
