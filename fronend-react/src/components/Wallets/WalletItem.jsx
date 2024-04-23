import React from "react"

function WalletItem(props) {
    return(
        <div className="wallet-item">
            {props.item}
        </div>
    )
}

export default WalletItem;