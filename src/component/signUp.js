import React, { Component } from 'react'
import "../css/signUp.css"
export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      lastName: '',
      address: '',
      ContactNumber: ''
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
  }
  componentDidMount() {
    console.log(this.state);
  }
  render() {
    const { FirstName, lastName, address, ContactNumber } = this.state;
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
                      <label htmlFor="FirstName">FirstName</label>
                      <input
                        type="text"
                        className="form-control"
                        name="FirstName" placeholder="FirstName" id="FirstName" onChange={this.formValChange}
                        value={FirstName} />
                    </div>
                    <div className="form-group form-field">
                      <label htmlFor="lastName">lastName</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName" placeholder="lastName" id="lastName" onChange={this.formValChange}
                        value={lastName} />
                    </div>
                    <div className="form-group form-field">
                      <label htmlFor="address">address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address" placeholder="address" id="address" onChange={this.formValChange}
                        value={address} />
                    </div>
                    <div className="form-group form-field">
                      <label htmlFor="ContactNumber">ContactNumber</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ContactNumber" placeholder="ContactNumber" id="ContactNumber" onChange={this.formValChange}
                        value={ContactNumber} />
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
                    <button className="form-signup-button" >CANCEL</button>
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