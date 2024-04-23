import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/Main.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import TestPage from './pages/TestPage.jsx';
import TestPage2 from './pages/TestPage2.jsx';
import TestPage3 from './pages/TestPage3.jsx';
import SignUpSuccess from './pages/SignUpSuccess.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import LoginSuccess from './pages/LoginSuccess.jsx';
import FindIdPage from './pages/FindIdPage.jsx';
import FindPwPage from './pages/FindPwPage.jsx';
import ResetPwPage from './pages/ResetPwPage.jsx';
import "preline/preline.js";
import AccountSettingPage from './pages/AccountSettingPage.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import AdminMain from './components/AdminMain.jsx';
import UserManagementPage from './pages/UserManagementPage.jsx';
import UserLedgerListPage from './pages/UserLedgerListPage.jsx';
import SpendingDailyPage from './pages/SpendingDailyPage.jsx';
import IncomingPage from './pages/IncomingPage.jsx';
import LedgerMainPage from './pages/LedgerMainPage.jsx';
import BarChart from './components/Chart/BarChart.jsx';
import IncomeMainPage from './pages/IncomeMainPage.jsx';
import IncomingDailyPage from './pages/IncomingDailyPage.jsx';
import Home from './board/board.jsx';
import BoardListPage from './pages/BoardListPage.jsx';
import BoardReadPage from './pages/BoardReadPage.jsx';
import BoardInsertPage from './pages/BoardInsertPage.jsx';
import BoardUpdatePage from './pages/BoardUpdatePage.jsx';

const router = createBrowserRouter([

  { errorElement: <ErrorPage /> } , //에러페이지 설정
  { path: '/' , element: <MainPage/> } ,
  { path: '/signup', element: <SignUpPage/> } ,
  { path: '/login', element: <LoginPage/> },
  { path: '/loginSuccess', element: <LoginSuccess/> },
  { path: '/findId', element: <FindIdPage/> },
  { path: '/findPw', element: <FindPwPage/> },
  { path: '/resetPw', element: <ResetPwPage/> },
  { path: '/test', element: <TestPage/> },
  { path: '/test2', element: <TestPage2/> },
  { path: '/test3', element: <TestPage3/> },
  { path: '/signupSuccess', element: <SignUpSuccess/> },
  { path: '/accountSetting', element: <AccountSettingPage/> },
  { path: '/error', element: <ErrorPage /> },
  { path: '/logout', element: <LogoutPage />},
  { path: '/admin/main', element: <AdminMain />},
  { path: '/userManagement', element: <UserManagementPage />},
  { path: '/mypage', element: <UserLedgerListPage/>},
  { path: '/ledger/main/:userEmail', element: <LedgerMainPage />},
  { path: '/ledger/income/:userEmail', element: <IncomeMainPage />},
  { path: '/ledger/spending/:userEmail/:yearMonthDays', element: <SpendingDailyPage />},
  { path: '/ledger/incoming/:userEmail/:yearMonthDays', element: <IncomingDailyPage />},
  { path: '/ledger/barchart', element: <BarChart />},
  // 게시판
  { path: "/Home", element: <Home />},
  { path: "/Home/boards", element: <BoardListPage /> },
  { path: "/Home/boards/:no", element: <BoardReadPage /> },
  { path: "/Home/boards/insert", element: <BoardInsertPage />},
  { path: "/Home/boards/update/:no", element: <BoardUpdatePage />}
  //

]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}
export default App