import Chart from "../components/Chart/Chart";
import LedgerMenu from "../components/LedgerMenu";
import Navbar from "../components/Navbar";

export default function ChartPage() {
    return(
        <>
        <Navbar />
        <LedgerMenu />
        <Chart />
        </>
    );
}