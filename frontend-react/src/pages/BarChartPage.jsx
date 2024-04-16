import BarChart from "../components/Chart/BarChart";
import LedgerMenu from "../components/LedgerMenu";
import Navbar from "../components/Navbar";

export default function BarChartPage() {
    return(
        <>
        <Navbar />
        <LedgerMenu />
        <BarChart />
        </>
    );
}