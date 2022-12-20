import { useCallback } from "react";
import "../css/SignUpPage.css";
import simg from "../img/signup.png";
import Logo from "../img/logo.png";
// import { useState } from "react";
// import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'


const SignUpPage = () => {
  const rfplButton = useCallback(() => {
    
    
   }, []);
  //  const [value, setValue] = useState()

  return (
    <div className="sign-up-page">
      <form>
      <label className="company-name-label">Company name*</label>
      <input className="companyname-input" type="text" required />
      <label className="phone-number-label">Phone number*</label>
      <input className="phone-input1" type="tel" required /> 
       {/* <PhoneInput className="phone-input1"
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}/>  */}
      <button className="signup-button" type="submit" onClick={rfplButton} />
      <label className="contact-person-label">Contact person*</label>
      <input className="contact-input2" type="text" required />
      <label className="email-id-label">Email id*</label>
      <input className="email-input3" type="email" required />
      <img className="hitachi-logo" alt="" src={Logo} />
      <div className="request-for-provisional-login">
        Request for Provisional login
      </div>
      <img className="signup-img" alt="" src={simg} />
      <label className="new-registration-label">New registration</label>
      </form>
    </div>
  );
};

export default SignUpPage;
