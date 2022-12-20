import React from "react";
import "../css/SignUp.css";
import Swal from "sweetalert2";
import apiService from "../services/api.service";
import simg from "../img/signup.png";
import Logo from "../img/logo.png";
// import { useState } from "react";
// import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'

export class signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      contactPerson: "",
      emailId: "",
      phoneNumber: "",
    };
  }

  formValChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    apiService.signup(this.state).then((response) => {
      if (response) {
        Swal.fire({
          title: "data submitted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error While Fetching",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };
  //  const [value, setValue] = useState()
  componentDidMount() {}
  render() {
    const { companyName, phoneNumber, contactPerson, emailId } = this.state;
    return (
      <div className="sign-up-page">
        <form>
          <label className="company-name-label">Company name*</label>
          <input
            className="companyname-input"
            type="text"
            name="companyName"
            id="companyName"
            onChange={this.formValChange}
            value={companyName}
            required
          />
          <label className="phone-number-label">Phone number*</label>
          <input
            className="phone-input1"
            type="tel"
            name="PhoneNumber"
            id="phoneNumber"
            onChange={this.formValChange}
            value={phoneNumber}
            required
          />
          {/* <PhoneInput className="phone-input1"
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}/>  */}
          <button
            className="signup-button"
            type="submit"
            onClick={this.handleSubmit}
          />
          <label className="contact-person-label">Contact person*</label>
          <input
            className="contact-input2"
            type="text"
            name="contactPerson"
            id="contactPerson"
            onChange={this.formValChange}
            value={contactPerson}
            required
          />
          <label className="email-id-label">Email id*</label>
          <input
            className="email-input3"
            type="email"
            name="emailId"
            id="emailId"
            onChange={this.formValChange}
            value={emailId}
            required
          />
          <img className="hitachi-logo" alt="" src={Logo} />
          <div className="request-for-provisional-login">
            Request for Provisional login
          </div>
          <img className="signup-img" alt="" src={simg} />
          <label className="new-registration-label">New registration</label>
        </form>
      </div>
    );
  }
}
export default signup;
