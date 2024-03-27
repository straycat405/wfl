import Navbar2 from "../components/Navbar2.jsx";
import Header from "../components/Header.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import PricingSection from "../components/PricingSection.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import Footer from "../components/Footer.jsx";
import FAQ from "../components/FAQ.jsx";

export default function MainPage() {
    return(
    <>
        <Navbar2 />
        <Header />
        <div class="container m-4">
        <h2>자주 묻는 질문</h2>
        </div>
        <div class="row m-5">
            <div class="span4 mx-1">
        <FAQ />
        </div>
        </div>
        <Footer />

    </>    
    )
}