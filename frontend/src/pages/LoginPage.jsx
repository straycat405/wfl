import Navbar2 from "../components/Navbar2.jsx";
import Login from "../components/Login.jsx";
import Footer from "../components/Footer.jsx";

export default function LoginPage() {
    return(
    <>
        <Navbar2 />
        <div>
            <div>
        <Login />
        </div>
        </div>
        <Footer />
    </>
    );
}