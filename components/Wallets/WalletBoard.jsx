import React from "react"
import WalletItem from "./components/WalletItem"

function WalletBoard(props) {
    return(
        <div>
            <h1>Wallet List</h1>
            {props.walletList.map((item)=><WalletItem item={item}/>)}
        </div>
    )
}
export default WalletBoard;