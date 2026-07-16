import { useState } from "react";
import { Button, Container, Form, Alert, Card } from "react-bootstrap";
import { loginUser } from "../api/authapi";
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);


    // Dynamic input handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    // Auto-fill feature for quick testing
    const handleAutoFillDemo = () => {
        setCredentials({
            email: DEMO_EMAIL,
            password: DEMO_PASSWORD
        });
    };

    // Form submission logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.email || !credentials.password) {
            setMessage({ variant: "danger", text: "Please fill in all fields!" });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);
            
            const payload = {
                email: credentials.email.trim().toLowerCase(),
                password: credentials.password
            };
            
            const data = await loginUser(payload);
            
            // Save authentic sessions generated via API
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setMessage({ variant: "success", text: data.message || "Logged in successfully!" });
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            const errMsg = err.response?.data?.message || "Failed to log in. Please try again.";
            setMessage({ variant: "danger", text: errMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container 
            className="d-flex flex-column align-items-center justify-content-center min-vh-screen p-3"
            style={{ backgroundColor: "#f8fafc" }}
        >
            <Card 
                className="p-4 md-p-5 border-0 shadow-lg w-100" 
                style={{ maxWidth: "420px", borderRadius: "16px" }}
            >
                <Card.Body className="p-0">
                    {/* Header Section */}
                    <div className="text-center mb-4">
                        <h2 className="fw-bold tracking-tight text-dark mb-1">Welcome Back</h2>
                        <p className="text-muted small">Please sign in to your account</p>
                    </div>
                    
                    {/* Status Feedback Alert */}
                    {message && <Alert className="py-2 text-center small rounded-3" variant={message.variant}>{message.text}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">Email Address</Form.Label>
                            <Form.Control 
                                value={credentials.email} 
                                onChange={handleChange} 
                                type="email" 
                                name="email" 
                                placeholder="name@example.com" 
                                className="py-2 rounded-3 border-light-subtle"
                                required
                            />
                        </Form.Group>

                        {/* Password Field */}
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-semibold text-secondary">Password</Form.Label>
                            <Form.Control 
                                value={credentials.password} 
                                onChange={handleChange} 
                                type="password" 
                                name="password" 
                                placeholder="Enter your password" 
                                className="py-2 rounded-3 border-light-subtle"
                                required
                            />
                        </Form.Group>

                        {/* Submission Action Button */}
                        <Button 
                            type="submit" 
                            variant="primary" 
                            className="w-100 py-2.5 fw-semibold rounded-3 border-0 shadow-sm mb-3" 
                            style={{ backgroundColor: "#4f46e5" }}
                            disabled={loading}
                        >
                            {loading ? "Checking details..." : "Sign In"}
                        </Button>

                        {/* Link to Register */}
                        <div className="text-center small text-muted">
                            <span>Don't have an account? </span>
                            <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: "#4f46e5" }}>Create one</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;
