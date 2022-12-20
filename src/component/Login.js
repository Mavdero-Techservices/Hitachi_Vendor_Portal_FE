import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import auth from "../auth/auth-helper";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { signin } from "../auth/api-auth";
import { loginAction } from "../reducers/login-slice";
import "../css/Login.css";
import Logo from "../img/logo.png";
import hand from "../img/haand.png";

const mailValReg = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

export default function Signin(props) {
  const dispatch = useDispatch();
  const [role, setRole] = useState();
  const [Validation, setValidation] = useState();
  const [submit, setSubmit] = useState(null);
  const [Field, setField] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const textFieldForUsernameRef = useRef(null);
  const textFieldForPasswordRef = useRef(null);
  const buttonForLoginRef = useRef(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setSubmit(true);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      const details = data?.user;
      setValidation(data);
      setRole(data?.user?.role);
      if (data === "invalid user") {
        setSubmit(false);
        textFieldForPasswordRef.current.blur();
        setValues({ ...values, error: data.error });
      } else {
        if (data?.user?.status === "Active") {
          auth.authenticate(data, () => {
            setSubmit(true);
            dispatch(loginAction.login());
            setValues({ ...values, error: "", redirectToReferrer: true });
          });
        } else {
          setValues({ ...values, error: "Please verify your email" });
        }
      }
    });
  };

  const location = useLocation();
  const data = location.state;

  const onFocusing = () => {
    setField(true);
  };

  const offFocusing = () => {
    setField(false);
  };

  const onFocusPassword = () => {
    setPasswordError(true);
  };

  const offFocusPassword = () => {
    setPasswordError(false);
  };

  const { redirectToReferrer } = values;

  if (redirectToReferrer) {
    if (role && role === "Admin") {
      return <Navigate to={"/Test"} />;
    } else if (role && role === "User") {
      return <Navigate to={"/"} />;
    }
  }

  const userNameHandle = (e, i) => {
    if (e === 0 && Field === false) {
      return "User name cannot be empty";
    } else if (e > 0 && !submit && Validation === "invalid user" && !Field) {
      return "User name is incorrect";
    }
    if (e === 0 && !submit && Validation === "invalid user" && !Field) {
      return "User name is required";
    }
    if (e === 0 && Field === null) {
      return "";
    }
    if (e > 0 && !mailValReg.test(i) && !Field) {
      return "Enter a valid user name";
    }
    if (!Field) {
      return "";
    }
  };

  const userPasswordHandle = (e, i) => {
    if (e === 0 && passwordError === false) {
      return "Password cannot be empty";
    }
    if (e === 0 && !submit && Validation === "invalid user" && !passwordError) {
      return "Password cannot be empty";
    } else if (!submit && Validation === "invalid user" && !passwordError) {
      return "Password is incorrect";
    }
    if (e === 0 && passwordError === null) {
      return "";
    } else if (e <= 6 && passwordError === false) {
      return "Password should atleast contain 6 characters";
    } else if (
      e <= 6 &&
      passwordError === false &&
      !submit &&
      Validation === "invalid user"
    ) {
      return "Password should atleast contain 6 characters";
    }
    if (!passwordError) {
      return "";
    }
  };

  return (
    <div className="login-page-div">
      <div className="image-div" />
      <form className="group-form" onSubmit={clickSubmit} noValidate>
        <label className="username-label">Username*</label>
        <input
          className="username-input"
          placeholder="Username"
          id="outlined-error-helper-text email"
          label="Username"
          type="email"
          variant="outlined"
          value={values.email}
          onChange={handleChange("email")}
          onFocus={onFocusing}
          onBlur={offFocusing}
          inputRef={textFieldForUsernameRef}
          inputProps={{
            onKeyPress: (event) => {
              const { key } = event;
              if (key === "Enter") {
                textFieldForPasswordRef.current.focus();
                offFocusing();
              } else {
                onFocusing();
              }
            },
          }}
          error={userNameHandle(values.email.length, values.email)}
          helperText={userNameHandle(values.email.length, values.email)}
        />
        <label className="password-label">Password*</label>
        <a href className="forgot-password">
          Forgot password ?{" "}
        </a>
        <div className="remember-me-div">Remember me</div>
        <input
          className="password-input1"
          id="outlined-basic password email-textfield"
          placeholder="password"
          type="password"
          label="Password"
          variant="outlined"
          value={values.password}
          onChange={handleChange("password")}
          onFocus={onFocusPassword}
          onBlur={offFocusPassword}
          inputRef={textFieldForPasswordRef}
          inputProps={{
            onKeyPress: (event) => {
              const { key } = event;
              if (key === "Enter") {
                offFocusPassword();
                buttonForLoginRef.current.click();
              } else {
                onFocusPassword();
              }
            },
          }}
          error={userPasswordHandle(values.password.length, values.password)}
          helperText={userPasswordHandle(
            values.password.length,
            values.password
          )}
        />
        <button
          className="signin-button"
          ref={buttonForLoginRef}
          type="submit"
        />
        <label className="sign-in-label">Sign in</label>
        <input className="checkbox-input" type="checkbox" />
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
}
