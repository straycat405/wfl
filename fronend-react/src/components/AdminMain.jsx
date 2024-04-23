import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function AdminMain() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="container max-w-sm mx-auto flex-1 flex flex-col min-h-screen items-center justify-center">
                  <button
                    onClick={()=> { navigate('/userManagement') }}
                    className="w-32 m-4 p-3 rounded text-sm bg-green-500 hover:bg-green-600 text-white">
                    사용자 관리
                  </button>

                  <button
                    className="w-32 m-4 p-3 rounded text-sm bg-green-500 hover:bg-green-600 text-white"
                    >
                    1:1 문의
                  </button>
            </div>
        </>
    );
}