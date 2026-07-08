import { useState } from "react";
import { Button, Container, Form, Alert, Card } from "react-bootstrap";
import { registerUser } from "../api/authapi";
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.name || !userData.email || !userData.password) {
            setMessage({ variant: "danger", text: "Saare fields bharna zaroori hain!" });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            const data = await registerUser(userData);
            setMessage({ variant: "success", text: data.message });
            
            // Account bante hi login page par redirect karne ke liye
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errMsg = err.response?.data?.message || "Account banane mein masla aaya.";
            setMessage({ variant: "danger", text: errMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="auth-container d-flex align-items-center justify-content-center">
            <Card className="auth-card p-4 shadow">
                <h2 className="text-center mb-4 auth-title">Register Account</h2>
                
                {message && <Alert variant={message.variant}>{message.text}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control 
                            value={userData.name} 
                            onChange={handleChange} 
                            type="text" 
                            name="name" 
                            placeholder="Apna poora naam likhein" 
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control 
                            value={userData.email} 
                            onChange={handleChange} 
                            type="email" 
                            name="email" 
                            placeholder="Email enter karein" 
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            value={userData.password} 
                            onChange={handleChange} 
                            type="password" 
                            name="password" 
                            placeholder="Sarkari password rakhein" 
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="success" className="w-100 auth-btn" disabled={loading}>
                        {loading ? "Account ban raha hai..." : "Register Karein"}
                    </Button>

                    <div className="text-center mt-3">
                        <span>Pehle se account hai? </span>
                        <Link to="/login" className="auth-link">Login karein</Link>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default RegisterPage;
