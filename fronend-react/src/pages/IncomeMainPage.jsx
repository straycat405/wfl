import IncomeMain from "../components/IncomeMain";
import LedgerMenu from "../components/LedgerMenu";
import Navbar from "../components/Navbar";

export default function IncomeMainPage() {
    return(
        <>
        <Navbar />
        <LedgerMenu />
        <IncomeMain />
        </>
    );
}