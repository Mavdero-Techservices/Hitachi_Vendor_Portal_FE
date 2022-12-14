import React from 'react'
import "../css/signUp.css"
import { Link } from 'react-router-dom';
import apiService from "../services/api.service";
import Swal from "sweetalert2";
export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      contactPerson: '',
      emailId: '',
      phoneNumber: '',
      password:'',
      confirmPassword:'',
      verifiedUser:'',
      role:'',
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
    apiService.signup(this.state)
                .then(response => {
                })
              
  }
  componentDidMount() {
  }
  render() {
    const { companyName, contactPerson,emailId,phoneNumber,password,confirmPassword ,verifiedUser,role} = this.state;
    return (
      <div>
        <div className="signup-page scroll">
          <div className="signup-header">
            <div className="signup-details col-lg-12 col-md-12 no-pad">
              <h1>Signup</h1>
              <form>
                <div className="signup-group">
                  <div className="group-1 col-lg-6 col-md-6">
                    <div className="form-group form-field">
                      <label htmlFor="companyName">companyName</label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyName" placeholder="companyName" id="companyName" onChange={this.formValChange}
                        value={companyName} />
                    </div>
                    <div className="form-group form-field">
                      <label htmlFor="contactPerson">contactPerson</label>
                      <input
                        type="text"
                        className="form-control"
                        name="contactPerson" placeholder="contactPerson" id="contactPerson" onChange={this.formValChange}
                        value={contactPerson} />
                    </div>
                    <div className="form-group form-field">
                      <label htmlFor="emailId">emailId</label>
                      <input
                        type="text"
                        className="form-control"
                        name="emailId" placeholder="emailId" id="emailId" onChange={this.formValChange}
                        value={emailId} />
                    </div>
                    <div className="form-group form-field">
                      <label htmlFor="phoneNumberr">phoneNumber</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber" placeholder="phoneNumber" id="phoneNumber" onChange={this.formValChange}
                        value={phoneNumber} />
                    </div>
                    <div className="form-group form-field">
                      <label htmlFor="password">password</label>
                      <input
                        type="text"
                        className="form-control"
                        name="password" placeholder="password" id="password" onChange={this.formValChange}
                        value={password} />
                    </div>
                    <div className="form-group form-field">
                      <label htmlFor="confirmPassword">confirmPassword</label>
                      <input
                        type="text"
                        className="form-control"
                        name="confirmPassword" placeholder="confirmPassword" id="confirmPassword" onChange={this.formValChange}
                        value={confirmPassword} />
                    </div>
                    <div className="form-group form-field">
                      <label htmlFor="verifiedUser">verifiedUser</label>
                      <input
                        type="text"
                        className="form-control"
                        name="verifiedUser" placeholder="verifiedUser" id="verifiedUser" onChange={this.formValChange}
                        value={verifiedUser} />
                    </div>
                    <div className="form-group form-field">
                      <label htmlFor="role">role</label>
                      <input
                        type="text"
                        className="form-control"
                        name="role" placeholder="role" id="role" onChange={this.formValChange}
                        value={role} />
                    </div>
                  </div>
                </div>
              </form>

              <div className="signup-btn">
                <div className="form-signup-btn">
                  <div className="signup-button-wrapper">
                    <button className="form-signup-button" onClick={this.handleSubmit}>SIGN UP</button>
                  </div>
                  <div className="signup-button-wrapper">
                  <Link to="/login" className="btn login-button">
                  LOGIN
            </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;