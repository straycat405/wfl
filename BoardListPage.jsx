import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BoardListContainer from "../board/BoardList/BoardListContainer.jsx";

export default function BoardListPage() {
    
    return(
    <>
        <Navbar />
        <BoardListContainer />
        <Footer />
    </>    
    )
}