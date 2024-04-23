import './Sidebar.css'

export default function Sbar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h2 className="sidebarTitle">welcome to WFL</h2>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                        📉 지출내역
                        </li>
                        <li className="sidebarListItem">
                           📈 수입내역
                        </li>
                        <li className="sidebarListItem"> 
                        📊 차트
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}