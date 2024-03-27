import SignUp from "../components/Signup";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

export default function SignUpPage() {
    return(
        <>
        <Navbar2 />
        <div class="px-5 row-fluid">
            <div class="offset-md-3 px-5 py-5 w-50">
        <SignUp />
        </div>
        </div>
        <Footer />
    </>
    );
}