import Navbar from "../components/Navbar.jsx";
import Login from "../components/Login.jsx";
import Footer from "../components/Footer.jsx";
import ExternalLogin from "../components/Naver/ExternalLogin.jsx";

export default function LoginPage() {
    return(
    <>
        <Navbar />
        <Login />
        <ExternalLogin />
        <Footer />
    </>
    );
}