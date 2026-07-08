import { useState } from "react";
import { Button, Container, Form, Alert, Card } from "react-bootstrap";
import { loginUser } from "../api/authapi";
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.email || !credentials.password) {
            setMessage({ variant: "danger", text: "Meherbani karke saare fields fill karein!" });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);
            
            const data = await loginUser(credentials);
            
            // Login token ko browser mein safe rakhne ke liye
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setMessage({ variant: "success", text: data.message });
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            const errMsg = err.response?.data?.message || "Login nahi ho saka.";
            setMessage({ variant: "danger", text: errMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="auth-container d-flex align-items-center justify-content-center">
            <Card className="auth-card p-4 shadow">
                <h2 className="text-center mb-4 auth-title">User Login</h2>
                
                {message && <Alert variant={message.variant}>{message.text}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control 
                            value={credentials.email} 
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
                            value={credentials.password} 
                            onChange={handleChange} 
                            type="password" 
                            name="password" 
                            placeholder="Password enter karein" 
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="w-100 auth-btn" disabled={loading}>
                        {loading ? "Chaking..." : "Login Karein"}
                    </Button>

                    <div className="text-center mt-3">
                        <span>Account nahi hai? </span>
                        <Link to="/register" className="auth-link">Naya Banayein</Link>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default LoginPage;
