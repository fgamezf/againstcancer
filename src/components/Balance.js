import React from "react";

const Balance = ({totalBalance}) => {
    return (
        <div className="balance">
            <h1>Million Thanks</h1>
            <h2>{totalBalance} {process.env.REACT_APP_COIN}</h2>
        </div>
    )
}

export default Balance;