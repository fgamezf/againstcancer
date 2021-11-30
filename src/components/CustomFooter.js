import React from "react";
import { Card, ListGroup } from 'react-bootstrap';

class CustomFooter extends React.Component {

    render() {
        return (
            <Card className="mt-4">
                <Card.Header>Important notes</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item><strong>Metamask</strong> and a <strong>wallet</strong> are required in order to manage transactions with this smartcontract.</ListGroup.Item>
                    <ListGroup.Item>Each time <strong>contract balance</strong> reach <strong>{process.env.REACT_APP_MIN_AMOUNT_REACH_TO_DONATE} {process.env.REACT_APP_COIN}</strong>, donation will be executed by the owner.  Destination wallet will be published in the website and you can also check directly on <strong>{process.env.REACT_APP_BLOCKCHAIN_NAME} blockchain</strong>.</ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Minimum amount</strong> to leave a message is {process.env.REACT_APP_MIN_AMOUNT_TO_DONATE} {process.env.REACT_APP_COIN} plus <strong>gas fee</strong> required by <strong>{process.env.REACT_APP_BLOCKCHAIN_NAME} blockchain</strong>.
                        <ul>
                            <li>
                            90% of the money raised will be donated to an organization for breast cancer research.</li>
                            <li>5% will be used to cover the expenses derived from the development and maintenance of the website.</li>
                            <li>5% remains on smartcontract balance to execute donations within the <strong>{process.env.REACT_APP_BLOCKCHAIN_NAME}</strong> network.</li>
                        </ul>
                    </ListGroup.Item>
                </ListGroup>
               <Card.Footer className="text-muted">
                    Created by <strong><a href="https://twitter.com/FranGamezDev" alt="@FranGamezDev">@FranGamezDev</a></strong>
               </Card.Footer>
            </Card>
        )
    };
}

export default CustomFooter;