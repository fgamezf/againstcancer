import React from "react";
import { Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExecuteDonationCard = ({ currentAccount, donate, donationAddress, setDonationAddress}) => {

    return (
        currentAccount && (
                <Card className='mt-4'>
                    <Card.Header>Donation</Card.Header>
                    <Card.Body>
                        <Card.Title>
                        Donate coins to Cancer Research Organization
                        </Card.Title>
                        <Card.Text>
                            <p>90% of the smartcontract balance will be transfered to the specified wallet address.</p>
                            <Form>
                                <Form.Group className="mb-3" controlId="formMessage">
                                    <Form.Label>Wallet address</Form.Label>
                                    <Form.Control value={donationAddress} type="text" placeholder="Wallet address" onInput={e => setDonationAddress(e.target.value)}/>
                                    <Form.Text className="text-muted">
                                        Everybody can vote his preferred cancer research organization.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" onClick={donate}>Donate</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
        )
    )

}

export default ExecuteDonationCard;