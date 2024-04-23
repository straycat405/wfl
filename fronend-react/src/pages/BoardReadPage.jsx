import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BoardReadContainer from "../board/BoardRead/BoardReadContainer.jsx";

export default function BoardReadPage() {
    
    return(
    <>
        <Navbar />
        <BoardReadContainer />
        <Footer />
    </>    
    )
}