import React from "react";

class Sponsor extends React.Component {

    render() {
        return (
            <div className="sponsor">
                <img width="120px" src={`${process.env.REACT_APP_BLOCKCHAIN_IMAGE_URL}`}/>
            </div>
        )
    };
}

export default Sponsor;