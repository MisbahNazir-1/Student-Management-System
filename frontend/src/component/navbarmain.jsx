import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavbarMain() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');  
    navigate('/login'); 
  };

  return (
    <Navbar expand="lg" className="bg-white border-b border-slate-100 shadow-sm py-2.5">
      <Container>
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
          
          <div className="d-flex align-items-center gap-2.5 mt-3 mt-lg-0">
            {isAuthenticated ? (
              <>
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
                <div 
                  className="px-3 py-2 rounded-3 border border-dashed text-secondary d-none d-sm-block"
                  style={{ borderColor: "#cbd5e1", backgroundColor: "#f8fafc", fontSize: "0.85rem" }}
                >
                  <span className="fw-bold text-dark me-1">Demo Access —</span>
                  <span>Email: <strong className="text-dark">test@user.com</strong></span>
                  <span className="mx-2 text-muted">|</span>
                  <span>Pass: <strong className="text-dark">123456</strong></span>
                </div>
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
