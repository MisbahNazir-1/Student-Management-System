import { useState } from "react";
import { Button, Container, Form, Badge, Alert } from "react-bootstrap";
import { addStudent } from "../../api/studentapi";
import { useNavigate } from 'react-router-dom';

// array of courses
const COURSES = ['MERN', 'React', 'Android', 'AI', 'Graphic'];

const AddStudentPage = () => {
    const navigate = useNavigate();
    
    // Updated: replaced marks with age
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: '',
        age: '', 
        city: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simple call to validate before submitting
        validateForm(); 
        
        try {
            setLoading(true);
            const data = await addStudent({ ...formData });
            setMessage({ variant: "success", text: "Student added successfully!" });
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setMessage({ variant: "danger", text: "Failed to add student." });
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Please enter your Full name!';
        if (!formData.email) newErrors.email = 'Please enter your Email!';
        if (!formData.course) newErrors.course = 'Please select your course!';
        if (formData.age === '') newErrors.age = 'Age field is required!';
        if (!formData.city) newErrors.city = 'Please enter your City!';
        setError(newErrors);
    };

    return (
        <div>
            <Container>
                <h1 className="my-4">Add Student Data</h1>
                
                {message && <Alert variant={message.variant}>{message.text}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control 
                            value={formData.name} 
                            onChange={handleChange} 
                            type="text" 
                            name="name" 
                            placeholder="Enter name" 
                        />
                        {error.name && <small className="text-danger">{error.name}</small>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            value={formData.email} 
                            onChange={handleChange} 
                            type="email" 
                            name="email" 
                            placeholder="Enter email" 
                        />
                        {error.email && <small className="text-danger">{error.email}</small>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Course:</Form.Label>
                        <Form.Select value={formData.course} onChange={handleChange} name="course">
                            <option value="">--- Select any Course ---</option>
                            {COURSES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </Form.Select>
                        {error.course && <small className="text-danger">{error.course}</small>}
                    </Form.Group>

                    {/* Age field with Badge logic */}
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center gap-2">
                            Age:
                            {formData.age && (
                                <Badge bg={Number(formData.age) <= 21 ? "danger" : "success"}>
                                    {Number(formData.age) <= 21 ? "Junior" : "Senior"}
                                </Badge>
                            )}
                        </Form.Label>
                        <Form.Control 
                            value={formData.age} 
                            onChange={handleChange} 
                            type="number" 
                            name="age" 
                            placeholder="Enter age" 
                        />
                        {error.age && <small className="text-danger">{error.age}</small>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>City:</Form.Label>
                        <Form.Control 
                            value={formData.city} 
                            onChange={handleChange} 
                            type="text" 
                            name="city" 
                            placeholder="Enter your city" 
                        />
                        {error.city && <small className="text-danger">{error.city}</small>}
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? "Saving..." : "Save Student"}
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default AddStudentPage;
