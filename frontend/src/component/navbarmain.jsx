import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavbarMain() {
  const navigate = useNavigate();

  // Check if user is authenticated by looking for token in localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  // Handle standard user logout sequence
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');  
    navigate('/login'); 
  };

  // Fast-track feature for recruiters to bypass registration forms
  const handleDemoAccess = () => {
    const demoUser = { name: "Guest Recruiter", email: "demo@example.com", role: "admin" };
    
    // Inject mock active session values directly into browser context
    localStorage.setItem('token', 'mock-jwt-token-for-demo-access');
    localStorage.setItem('user', JSON.stringify(demoUser));
    
    // Smooth redirect directly to dashboard view
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-white border-b border-slate-100 shadow-sm py-2.5">
      <Container>
        {/* Main Branding Logo */}
        <Navbar.Brand 
          onClick={() => navigate('/')} 
          className="fw-bold tracking-tight cursor-pointer text-dark"
          style={{ fontSize: "1.25rem" }}
        >
          Student Management System
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto ms-lg-3">
            <Nav.Link onClick={() => navigate('/')} className="fw-medium text-secondary">Home</Nav.Link>
          </Nav>
          
          {/* Dynamic Action Buttons Group */}
          <div className="d-flex align-items-center gap-2.5 mt-3 mt-lg-0">
            {isAuthenticated ? (
              <>
                {/* Protected routes visible only to logged-in sessions */}
                <Button
                  variant="primary"
                  onClick={() => navigate("/add")}
                  className="px-4 py-2 fw-semibold rounded-3 border-0 shadow-sm"
                  style={{ backgroundColor: "#4f46e5" }}
                >
                  Add Student
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={handleLogout}
                  className="px-4 py-2 fw-semibold rounded-3"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Guest access routes visible only when logged out */}
                <Button 
                  variant="outline-primary"
                  onClick={handleDemoAccess}
                  className="px-4 py-2 fw-semibold rounded-3 border-secondary-subtle text-dark-emphasis"
                  style={{ borderColor: "#d1d5db" }}
                >
                  Demo Access
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 fw-semibold rounded-3 border-0"
                  style={{ backgroundColor: "#4f46e5" }}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;
