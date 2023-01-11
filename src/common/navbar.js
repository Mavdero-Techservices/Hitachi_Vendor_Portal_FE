import Logo1 from "../img/logo1.png";
import "../css/navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Swal from "sweetalert2";
import auth from "../auth/auth-helper";
function App() {
  const handleClickOpen = () => {
    document.getElementById('b3')
      .onclick = function () {
        Swal.fire({
          title: "are You sure?",
          text: "You Want to Logout!",
          icon: "warning",
          confirmButtonText: "OK",
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            Swal.fire({
              title: "Thank you for login In!",
            })
              .then(() => {
                // auth.clearJWT(() => history.push('/'))
              });
          }
          else {

          }
        });
      }
  };
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
              <Nav.Link href="/ComplianceDetail">Compliance Details</Nav.Link>
              <Nav.Link href="/bank">Bank Details</Nav.Link>
              <Nav.Link href="/FinancialDetail">Financial Details</Nav.Link>
              <Nav.Link href="/">Contact Details</Nav.Link>
              {/* <Nav.Link  onClick={handleClickOpen} id="b3">logOut</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default App;  
