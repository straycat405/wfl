import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/Main.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BootTest from './pages/BootTest.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import TestPage from './pages/TestPage.jsx';

const router = createBrowserRouter([
  { path: '/main' , element: <MainPage/> } ,
  { path: '/boottest', element: <BootTest/>} ,
  { path: '/signup', element: <SignUpPage/> } ,
  { path: '/login', element: <LoginPage/> },
  { path: '/test', element: <TestPage/> },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}
export default App
