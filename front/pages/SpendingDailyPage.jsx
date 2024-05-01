import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import SpendingDaily from "../components/SpendingDaily"
import LedgerMenu from "../components/LedgerMenu"

export default function SpendingDailyPage() {

    return(
        <>
        <Navbar />
        <LedgerMenu />
        <SpendingDaily />
        </>
    )
}