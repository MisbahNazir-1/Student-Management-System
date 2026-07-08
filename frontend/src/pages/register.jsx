import { useState } from "react";
import { Button, Container, Form, Alert, Card } from "react-bootstrap";
import { registerUser } from "../api/authapi";
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    
    // State management matching Mongoose Schema fields
    const [userData, setUserData] = useState({ 
        name: '', 
        email: '', 
        password: '',
        role: 'user' // Default enum value from schema
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // Dynamic input handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    // Form submission logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Enforce frontend validation rules mirroring backend schema
        if (userData.name.trim().length < 2) {
            setMessage({ variant: "danger", text: "Name must be at least 2 characters long." });
            return;
        }
        if (userData.password.length < 6) {
            setMessage({ variant: "danger", text: "Password must be at least 6 characters long." });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            // Sanitize payload data
            const payload = {
                ...userData,
                name: userData.name.trim(),
                email: userData.email.trim().toLowerCase() // Forces unique lowercase lookup
            };

            const data = await registerUser(payload);
            setMessage({ variant: "success", text: data.message || "Account created successfully!" });
            
            // Redirect user to the login screen after 2 seconds
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errMsg = err.response?.data?.message || "Something went wrong while creating your account.";
            setMessage({ variant: "danger", text: errMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container 
            className="d-flex align-items-center justify-content-center min-vh-screen p-3"
            style={{ backgroundColor: "#f8fafc" }}
        >
            <Card 
                className="p-4 md-p-5 border-0 shadow-lg w-100" 
                style={{ maxWidth: "420px", borderRadius: "16px" }}
            >
                <Card.Body class="p-0">
                    {/* Header Section */}
                    <div className="text-center mb-4">
                        <h2 className="fw-bold tracking-tight text-dark mb-1">Create Account</h2>
                        <p class="text-muted small">Join us today by filling out your details</p>
                    </div>
                    
                    {/* Status Feedback Alert */}
                    {message && <Alert className="py-2 text-center small rounded-3" variant={message.variant}>{message.text}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        {/* Name Field (Schema: minlength 2) */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">Full Name</Form.Label>
                            <Form.Control 
                                value={userData.name} 
                                onChange={handleChange} 
                                type="text" 
                                name="name" 
                                placeholder="Enter full name" 
                                minLength={2}
                                className="py-2 rounded-3 border-light-subtle"
                                required
                            />
                        </Form.Group>

                        {/* Email Field (Schema: unique, lowercase) */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">Email Address</Form.Label>
                            <Form.Control 
                                value={userData.email} 
                                onChange={handleChange} 
                                type="email" 
                                name="email" 
                                placeholder="name@example.com" 
                                className="py-2 rounded-3 border-light-subtle"
                                required
                            />
                        </Form.Group>

                        {/* Password Field (Schema: minlength 6) */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">Password</Form.Label>
                            <Form.Control 
                                value={userData.password} 
                                onChange={handleChange} 
                                type="password" 
                                name="password" 
                                placeholder="Minimum 6 characters" 
                                minLength={6}
                                className="py-2 rounded-3 border-light-subtle"
                                required
                            />
                        </Form.Group>

                        {/* Role Selection Dropdown (Schema: enum ['user', 'admin']) */}
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-semibold text-secondary">Account Type</Form.Label>
                            <Form.Select 
                                value={userData.role} 
                                onChange={handleChange} 
                                name="role"
                                className="py-2 rounded-3 border-light-subtle cursor-pointer text-dark"
                            >
                                <option value="user">Standard User</option>
                                <option value="admin">Administrator</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Submission Action Button */}
                        <Button 
                            type="submit" 
                            variant="primary" 
                            className="w-100 py-2.5 fw-semibold rounded-3 border-0 shadow-sm" 
                            style={{ backgroundColor: "#4f46e5" }}
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Register Account"}
                        </Button>

                        {/* Footer Redirect Route Link */}
                        <div className="text-center mt-4 small text-muted">
                            <span>Already have an account? </span>
                            <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: "#4f46e5" }}>Sign in</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RegisterPage;
