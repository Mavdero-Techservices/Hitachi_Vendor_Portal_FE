import { useCallback } from "react";
import "../css/LoginPage.css";
import Logo from "../img/logo.png";
import hand from "../img/haand.png";

const LoginPage = () => {
  const onSignUpButton = useCallback(() => {
    
  }, []);

  const forgotpassword = useCallback(() => {
    alert("Please check your email to change to new password")
  }, []);

  return (
    <div className="login-page-div">
      <div className="image-div"/>
      <form className="group-form">
        <label className="username-label">Username*</label>
        <input className="username-input" type="text" required />
        <label className="password-label">Password*</label>
        <a href className="forgot-password" onClick={forgotpassword}>Forgot password ?</a>
        <div className="remember-me-div">Remember me</div>
        <input className="password-input1" type="password" required />
        <button className="signin-button"  onClick={onSignUpButton} />
        <label className="sign-in-label">Sign in</label> 
        <input className="checkbox-input"  type="checkbox"  />
      </form>
      <img className="hit-logo" alt="" src={Logo} />
      <img className="person-img" alt="" src={hand} />
      <div className="line-div" />
      <div className="hisys-vendor-portal">
        <p className="hisys-p">
          <span>HISYS</span>
        </p>
        <p className="vendor-portal">
          <span>Vendor Portal</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
