import SignUp from "../components/Signup";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

export default function SignUpPage() {
    return(
        <>
        <Navbar2 />
        <div>
            <div>
        <SignUp />
        </div>
        </div>
        <Footer />
    </>
    );
}