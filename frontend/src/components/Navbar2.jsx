import { Link } from "react-router-dom";

export default function Navbar2() {
    return(
        // <!-- Responsive navbar-->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container px-5">
                <Link class="navbar-brand" to='/main'>WFL</Link>
                {/* <a class="navbar-brand" href="#!">WFL</a> */}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"><Link class="nav-link axtive" aria-currenc="page" to='/main'>Home</Link></li>
                        <li class="nav-item"><Link class="nav-link axtive" aria-currenc="page" to='/main'>Login</Link></li>
                        <li class="nav-item"><Link class="nav-link axtive" aria-currenc="page" to='/signup'>Sign-Up</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}