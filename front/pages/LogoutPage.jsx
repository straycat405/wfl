import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Feature from "../components/Feature.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function LogoutPage() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [])

    

    return(
    <>
        <Navbar />
        <Header />
        <Feature />
        <Footer />
    </>    
    )
}