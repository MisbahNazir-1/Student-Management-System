import { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentsById, updateStudent } from "../api/studentapi";

// array of courses
const COURSES = ["MERN", "React", "Android", "AI", "Graphic"];

const EditStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    age: "", 
    city: "",
  });

  const [message, setMessage] = useState(null);
  const [fetchingStudent, setFetchingStudent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setFetchingStudent(true);
        // Corrected function name to match import
        const response = await getStudentsById(id);
        const data = response.data;

        setFormData({
          name: data.name || "",
          email: data.email || "",
          course: data.course || "",
          age: data.age || "", 
          city: data.city || "",
        });
      } catch (err) {
        setFetchError("Could not fetch the student");
      } finally {
        setFetchingStudent(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = await updateStudent(id, { ...formData });
      setMessage({ variant: "success", text: data.message });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage({ variant: "danger", text: "Could not edit the student" });
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (fetchingStudent) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" /> <p>Loading student data...</p>
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <h1 className="my-4">Edit Student Record</h1>
        {fetchError && <Alert variant="danger">{fetchError}</Alert>}
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
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course:</Form.Label>
            <Form.Select
              value={formData.course}
              onChange={handleChange}
              name="course"
            >
              <option value="">--- Select any Course ---</option>
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age:</Form.Label>
            <Form.Control
              value={formData.age}
              onChange={handleChange}
              type="number"
              name="age"
              placeholder="Enter age"
            />
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
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Saving..." : "Save Student"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default EditStudentPage;
