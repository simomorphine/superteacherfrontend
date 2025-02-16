import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Settings = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        notifications: false
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheck = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the settings update via an API call.
        console.log('Updated Settings:', formData);
        setShowAlert(true);
    };

    return (
        <Container className="mt-4">
            <h1>Settings</h1>
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Settings Saved Successfully!
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNotifications" className="mt-3">
                    <Form.Check
                        type="checkbox"
                        label="Enable Notifications"
                        name="notifications"
                        checked={formData.notifications}
                        onChange={handleCheck}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Save Settings
                </Button>
            </Form>
        </Container>
    );
};

export default Settings;