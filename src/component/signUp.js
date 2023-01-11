import React from 'react'
import "../css/signUp.css"
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import simg from "../img/signup.png";
import Logo from "../img/logo.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCheckbox, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea, MDBTypography } from 'mdb-react-ui-kit';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      contactPerson: '',
      emailId: '',
      phoneNumber: '',
    }
  };
  formValChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
    this.setState({ [e.target.id]: e.target.value })
  };
  handleSubmit = e => {
    e.preventDefault();
    apiService.saveUser(this.state)
      .then(response => {
        if (response) {
          Swal.fire({
            title: "Please check your email to proceed",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
        else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

      })

  }
  componentDidMount() {
  }

  render() {
    const { companyName, contactPerson, emailId, phoneNumber, password, confirmPassword, verifiedUser, role } = this.state;
    return (
      <Container>
        <Row>
          <Col sm={4}>
            <img className="signup-img" alt="" src={simg} />
          </Col>
          <Col sm={8}>
            <Row>
              <Col sm={12}>
                <img className="hitachi-logo" alt="" src={Logo} />
                <h2 className='textReg'>New Registration</h2>
              </Col>
            </Row>
            <MDBRow className="mb-4">
              <MDBCol>
                <div>
                  <label htmlFor="companyName">Company Name*</label>
                </div>
                <div>
                  <input type="text" className="mb-4 signupInput" name="companyName" id="companyName" onChange={this.formValChange} value={companyName} />
                </div>
              </MDBCol>
              <MDBCol>
                <label >Contact Person*</label>
                <input type="text" className="mb-4 signupInput" name="contactPerson" id="contactPerson" onChange={this.formValChange} value={contactPerson} />
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-4">
              <MDBCol>
                <div>
                  <label htmlFor="phoneNumber">Phone number*</label>
                </div>
                <div>
                  <input type="text" className="mb-4 signupInput" name="phoneNumber" id="phoneNumber" onChange={this.formValChange} value={phoneNumber} />
                </div>
              </MDBCol>
              <MDBCol>
                <label htmlFor="emailId">email id*</label>
                <input type="text" className="mb-4 signupInput" name="emailId" id="emailId" onChange={this.formValChange} value={emailId} />
              </MDBCol>
            </MDBRow>
            <button className='signupButton' onClick={this.handleSubmit}>Request for provisional login</button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Signup;