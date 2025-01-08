import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';  
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/propiedades">Inmobiliaria Lois - Area Administrativa</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/propiedades">Propiedades</Nav.Link>
            <Nav.Link href="/emprendimientos">Emprendimientos</Nav.Link>
            
           
            {token && (
              <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <FaSignOutAlt /> Cerrar sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
