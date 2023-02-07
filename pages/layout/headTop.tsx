import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

export default function HeaderTop() {
    return <div className="header">
        <Container>
            <Row>
                <Col className="headerTxt" md={12}>
                    <a href="https://web3camp.us" target="_blank" rel="noreferrer">
                        <img src="./web3camp.png" alt=""/>
                    </a>

                </Col>
            </Row>
        </Container>
    </div>
}
