import Navbar2 from "../components/Navbar2.jsx";
import Login from "../components/Login.jsx";
import Footer from "../components/Footer.jsx";

export default function LoginPage() {
    return(
    <>
        <Navbar2 />
        <div class="px-5 row-fluid">
            <div class="offset-md-3 px-5 py-5 w-50">
        <Login />
        </div>
        </div>
        <Footer />
    </>
    );
}