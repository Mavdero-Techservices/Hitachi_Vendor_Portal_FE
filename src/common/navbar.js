import Logo1 from "../img/logo1.png";
import "../css/navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
function App() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand> <img className="img1" src={Logo1} alt="" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/basic">Vendor Details</Nav.Link>
              <Nav.Link href="/statutory">Statutory Details</Nav.Link>
              <Nav.Link href="/ComplianceDetails">Compliance Details</Nav.Link>
              <Nav.Link href="/bank">Bank Details</Nav.Link>
              <Nav.Link href="/bank">contact Details</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default App;  
