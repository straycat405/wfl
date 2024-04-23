import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import SpendingDaily from "../components/SpendingDaily"
import LedgerMenu from "../components/LedgerMenu"
import IncomingDaily from "../components/IncomingDaily"

export default function SpendingDailyPage() {

    return(
        <>
        <Navbar />
        <LedgerMenu />
        <IncomingDaily />
        </>
    )
}