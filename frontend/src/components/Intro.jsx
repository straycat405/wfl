import { Link } from "react-router-dom";

export default function Intro() {
    return(
            <div class="container d-flex align-items-center flex-column">
                <img class="masthead-avatar mb-5" src="assets/img/avataaars.svg" alt="..." />
                <h1 class="masthead-heading text-uppercase mb-0">Start Bootstrap</h1>
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <p class="masthead-subheading font-weight-light mb-0">Graphic Artist - Web Designer - Illustrator</p>
            </div>
    );
}