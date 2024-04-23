import AdminNavbar from "../components/AdminNavbar.jsx";
import Footer from "../components/Footer.jsx";
import NewUserList from "../components/NewUserList.jsx";
import UserManagement from "../components/UserManagement.jsx";

export default function UserManagementPage() {
    return(
    <>
        <AdminNavbar />
        <NewUserList />
        {/* <UserManagement /> */}
        <Footer />
    </>
    );
}