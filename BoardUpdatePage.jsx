import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BoardUpdateContainer from "../board/BoardUpdate/BoardUpdateContainer.jsx";

export default function BoardUpdatePage() {
    
    return(
    <>
        <Navbar />
        <BoardUpdateContainer />
        <Footer />
    </>    
    )
}