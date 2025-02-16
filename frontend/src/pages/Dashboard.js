import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
    return (
        <Container fluid className="mt-4">
            <Row>
                <Col>
                    <h1 className="text-center">Welcome to SuperTeacher Dashboard</h1>
                    <p className="text-center">AI-powered tools to make teachers' lives easier</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Feature 1</Card.Title>
                            <Card.Text>
                                Description of the first feature.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Feature 2</Card.Title>
                            <Card.Text>
                                Description of the second feature.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Feature 3</Card.Title>
                            <Card.Text>
                                Description of the third feature.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Upcoming Events</Card.Title>
                            <Card.Text>
                                Placeholder for upcoming events.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Recent Activities</Card.Title>
                            <Card.Text>
                                Placeholder for recent activities.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;