import React from "react";
import { Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DonationCard = ({ currentAccount, message, amount, wave, setMessage, setAmount, connectWallet}) => {

    return (
        currentAccount ? (
                <Card className='mt-4'>
                    <Card.Header>Leave a message on blockchain</Card.Header>
                    <Card.Body>
                        <Card.Title>
                        Do you want to help?
                        </Card.Title>
                        <Card.Text>
                            <div>
                                <p>Leave a nice message for your loved ones who have passed away from cancer  and helps to <strong>fight against cancer </strong>.</p>
                                <p>Your message will live forever and unchanged on the <strong>{process.env.REACT_APP_BLOCKCHAIN_NAME} blockchain</strong> maintained today by thousands of people around the world.</p>
                            </div>
                            <Form>
                                <Form.Group className="mb-3" controlId="formMessage">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control value={message} type="text" placeholder="Enter your special message" onInput={e => setMessage(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formAmount">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control value={amount} type="number" placeholder="Enter amount to be donated" onInput={e => setAmount(e.target.value)}/>
                                    <Form.Text className="text-muted">
                                        Minimum amount {process.env.REACT_APP_MIN_AMOUNT_TO_DONATE} {process.env.REACT_APP_COIN}.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" onClick={wave}>Leave a message</Button>
                            </Form>
                        </Card.Text>
                       
                    </Card.Body>
                </Card>
        ) : (
                <Card className='mt-4'>
                    <Card.Header>Donation</Card.Header>
                    <Card.Body>
                        <Card.Title>
                           Connect a wallet
                        </Card.Title>
                        <Card.Text>
                           <p><strong>Metamask</strong> and a <strong>wallet</strong> are required in order to manage transactions with this smartcontract.</p>
                        </Card.Text>
                        <Button variant="primary" onClick={connectWallet}>Connect Wallet</Button>
                    </Card.Body>
                </Card>
        )
              
    )

}

export default DonationCard;