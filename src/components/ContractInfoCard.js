import React from "react";
import { Card, Table, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const ContractInfoCard = ({ currentAccount, contractAddress, totalWaves, totalBalance}) => {

    return (
        currentAccount && (
                <Card className='mt-4'>
                    <Card.Header>SmartContract information</Card.Header>
                    <Card.Body>
                        <Card.Title>Have you got doubts?</Card.Title>
                        <Card.Text>
                            <p>Any transaction on the <strong>{process.env.REACT_APP_BLOCKCHAIN_NAME} blockchain</strong> is public and immutable.</p>
                            <Table striped bordered hover responsive="sm">
                                <thead>
                                <tr>
                                    <th>Total messages</th>
                                    <th>Total balance ({process.env.REACT_APP_COIN})</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{totalWaves}</td>
                                        <td>{totalBalance}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <ListGroup variant="flush">
                                <ListGroup.Item><strong>Contract address:</strong>  {contractAddress}</ListGroup.Item>
                                <ListGroup.Item>Check transactions on <a href={`${process.env.REACT_APP_BLOCKCHAIN_URL}${contractAddress}`}>blockchain {process.env.REACT_APP_BLOCKCHAIN_NAME}</a></ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
        )
    )
}

export default ContractInfoCard;