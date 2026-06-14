import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Reusable card component displaying detailed student information.
 */
const StudentCard = ({ student, onDelete }) => {
  const navigate = useNavigate();

  if (!student) return null;

  // Prompts confirmation before execution
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      onDelete(student._id); 
    }
  };

  // Navigates user to the editing portal
  const handleEdit = () => {
    navigate(`/edit/${student._id}`);
  };

  return (
    <Card className="shadow-sm mb-3" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {student.email}
        </Card.Subtitle>

        <Card.Text as="div">
          <div>
            <strong>Course:</strong> {student.course}
          </div>
          <div>
            <strong>City:</strong> {student.city}
          </div>
          <div>
            <strong>Age: </strong>
            <Badge bg="info">{student.age}</Badge>
          </div>
        </Card.Text>
      </Card.Body>
      
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="success" size="sm" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default StudentCard;
