import Navbar from "../components/Navbar";
import LedgerMain from "../components/LedgerMain";
import LedgerMenu from "../components/LedgerMenu";

export default function LedgerMainPage() {
  return (
    <>
      <Navbar />
      <LedgerMenu />
      <LedgerMain />
    </>
  );
}
