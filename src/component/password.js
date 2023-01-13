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

import withRouter from '../component/withRouter';
export class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      userName: '',
      emailId: this.props.params.emailId,
      mailConfirmationCode: this.props.params.mailConfirmationCode
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
  onresetPassword = (e) => {
    e.preventDefault()
    apiService.resetPassword(this.state).then((data) => {
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    apiService.resetPassword(this.state).then((data) => {
      if (data) {
        Swal.fire({
          title: "Password generated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        this.props.navigate("/login")
      }
    })
  }
  componentDidMount() {

  }
  render() {
    const { password, confirmPassword, userName } = this.state;
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
                <h2 className='textReg'>UserName and Password Generation</h2>
              </Col>
            </Row>
            <MDBCol>
              <div>
                <label htmlFor="userName">userName*</label>
              </div>
              <div>
                <input type="text" className="mb-4 signupInput" name="userName" id="userName" onChange={this.formValChange} value={userName} />
              </div>
            </MDBCol>
            <MDBRow className="mb-4">
              <MDBCol>
                <div>
                  <label htmlFor="password">Password*</label>
                </div>
                <div>
                  <input type="text" className="mb-4 signupInput" name="password" id="password" onChange={this.formValChange} value={password} />
                </div>
              </MDBCol>
              <MDBCol>
                <label >confirm Password*</label>
                <input type="text" className="mb-4 signupInput" name="confirmPassword" id="confirmPassword" onChange={this.formValChange} value={confirmPassword} />
              </MDBCol>
            </MDBRow>
            <button className='signupButton' onClick={this.handleSubmit}>Create password</button>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default withRouter(Password);
