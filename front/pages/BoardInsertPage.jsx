import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BoardInsertContainer from "../board/BoardInsert/BoardInsertContainer.jsx";

export default function BoardInsertPage() {
    
    return(
    <>
        <Navbar />
        <BoardInsertContainer />
        <Footer />
    </>    
    )
}