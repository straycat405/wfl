import Navbar from "../components/Navbar";
import CustomCalendar from "../components/Calendar/CustomCalendar";
import LedgerMenu from "../components/LedgerMenu";

export default function CalendarPage() {
    return(
        <>
            <Navbar />
            <LedgerMenu />
            <CustomCalendar />
        </>
    );
}