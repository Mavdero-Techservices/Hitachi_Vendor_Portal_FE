import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import auth from '../auth/auth-helper';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { signin } from '../auth/api-auth';
import { Link } from 'react-router-dom';
import { loginAction } from '../reducers/login-slice';
import Swal from "sweetalert2";
import apiService from "../services/api.service";
import Logo from "../img/logo.png";
import hand from "../img/haand.png";
import hisys from "../img/HISYSVendorPortal.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../css/Login.css"
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCheckbox, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea, MDBTypography } from 'mdb-react-ui-kit';

const mailValReg = RegExp(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
)

const useStyles = makeStyles(theme => ({
  error: {
    verticalAlign: 'middle'
  },
}))

export default function Signin(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [verifiedUser, setRole] = useState();
  const [Validation, setValidation] = useState();
  const [submit, setSubmit] = useState(null);
  const [Field, setField] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const textFieldForUsernameRef = useRef(null);
  const textFieldForPasswordRef = useRef(null);
  const buttonForLoginRef = useRef(null);
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    mailConfirmationCode: '',
    showContent: false,
    redirectToReferrer: false
  });
  const [resetCode, setresetCode] = useState({
    resetCode: '',
    redirectToReferrer: false
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
    setSubmit(true)
  }
  const handleDropdownChange = name => event => {
    setresetCode({ ...resetCode, [name]: event.target.value })
    setSubmit(true)
  }
  const [showLoginTab, setshowLoginTab] = useState(true);
  const [showforgetPassowrd, setShowforgetPassowrd] = useState(false);
  const [showResetTab, setshowResetTab] = useState(false);
  const [showPasswordTab, setshowPasswordTab] = useState(false);

  const login = (e) => {
    e.preventDefault()
    const user = {
      emailId: values.email || undefined,
      password: values.password || undefined
    }
    signin(user).then((data) => {
      if (data) {

      }
      else {
        Swal.fire({
          title: "Error While Fetching",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      const details = data?.result
      setValidation(data)
      setRole(data?.result?.verifiedUser);
      if (data === "invalid user") {
        setSubmit(false)
        textFieldForPasswordRef.current.blur();
        setValues({ ...values, error: data.error })
      } else {
        if (data?.result?.verifiedUser === 'approved') {
          auth.authenticate(data, () => {
            setSubmit(true)
            dispatch(loginAction.login())
            setValues({ ...values, error: '', redirectToReferrer: true })
          })
        } else {
          setValues({ ...values, error: 'Please verify your email' })
        }
      }
    })
  }

  const clickSubmit = (e) => {
    e.preventDefault()
  }
  const onResetCode = (e) => {
    e.preventDefault()
    const user = {
      emailId: values.email || undefined,
    }
    apiService.resetPasswordByCode(user).then((data) => {
      if (data) {
        Swal.fire({
          title: " check your email,to reset your password",
          icon: "success",
          confirmButtonText: "OK",
        });
        setshowLoginTab(true);
        setShowforgetPassowrd(false);
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
  const oncheckresetcode = (e) => {
    e.preventDefault()
    const user = {
      emailId: values.email || undefined,
      mailConfirmationCode: values.mailConfirmationCode || undefined,
    }
    setshowResetTab(false);
    setshowPasswordTab(true);
    setShowforgetPassowrd(false);
  }
  const onresetPassword = (e) => {
    e.preventDefault()
    const user = {
      emailId: values.email || undefined,
      mailConfirmationCode: values.mailConfirmationCode || undefined,
      password: values.password || undefined,
      confirmPassword: values.confirmPassword || undefined,
    }
    apiService.resetPassword(user).then((data) => {
      if (data) {
        setshowResetTab(false);
        setshowPasswordTab(true);
        setShowforgetPassowrd(false);
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
  const backToLogin = (e) => {
    setShowforgetPassowrd(false);
    setshowPasswordTab(false);
    setshowLoginTab(true);
    setshowResetTab(false);
  }
  const forgetPassword = (e) => {
    setShowforgetPassowrd(true);
    setshowPasswordTab(false);
    setshowLoginTab(false);
    setshowResetTab(false);
  }
  const location = useLocation()
  const data = location.state

  const onFocusing = () => {
    setField(true)
  }

  const offFocusing = () => {
    setField(false)
  }

  const onFocusPassword = () => {
    setPasswordError(true)
  }

  const offFocusPassword = () => {
    setPasswordError(false)
  }

  const { redirectToReferrer } = values

  if (redirectToReferrer) {
    if (verifiedUser && verifiedUser === 'approved') {
      return (<Navigate to={'/basic'} />)
    } else if (verifiedUser && verifiedUser === 'pending') {
      return (<Navigate to={'/'} />)
    }
  }

  const userNameHandle = (e, i) => {
    if (e === 0 && Field === false) {
      return "User name cannot be empty"
    }
    else if (e > 0 && !submit && Validation === "invalid user" && !Field) {
      return "User name is incorrect"
    }
    if (e === 0 && !submit && Validation === "invalid user" && !Field) {
      return "User name is required"
    }
    if (e === 0 && Field === null) {
      return ""
    }
    if (e > 0 && !mailValReg.test(i) && !Field) {
      return "Enter a valid user name"
    }
    if (!Field) {
      return ""
    }
  }

  const userPasswordHandle = (e, i) => {
    if (e === 0 && passwordError === false) {
      return "Password cannot be empty"
    }
    if (e === 0 && !submit && Validation === "invalid user" && !passwordError) {
      return "Password cannot be empty"
    }
    else if (!submit && Validation === "invalid user" && !passwordError) {
      return "Password is incorrect"
    }
    if (e === 0 && passwordError === null) {
      return ""
    }
    else if (e <= 6 && passwordError === false) {
      return "Password should atleast contain 6 characters"
    }
    else if (e <= 6 && passwordError === false && !submit && Validation === "invalid user") {
      return "Password should atleast contain 6 characters"
    }
    if (!passwordError) {
      return ""
    }
  }
  return (
    <div className='login'>
      <Container>
        <Row md={2}>
          <Col xs={4}>
            <Col>   <img className="hisys-img" alt="" src={hisys} /> </Col>
            <Col> <img className="person-img" alt="" src={hand} /></Col>
          </Col>
          <Col xs={12}>
            <img className="hit-logo" alt="" src={Logo} />
            <form>
              {showLoginTab ?
                <div>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <div>
                        <label htmlFor="userName">user name*</label>
                      </div>
                      <div>
                        <input type="text" className="mb-4 loginInput" value={values.email} onChange={handleChange('email')} />
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <label >password*</label>
                      <input className="mb-4 loginInput" type="password" label="Password" variant="outlined" value={values.password} onChange={handleChange('password')} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      {!showPasswordTab && showLoginTab && !showforgetPassowrd ? <div className="form-group form-remember">
                        <button className='ForgetBtn' onClick={forgetPassword}> forget password?</button>
                      </div>
                        : null}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <button onClick={login} className='signupButton'>sign In</button>
                    </MDBCol>
                  </MDBRow>
                </div>
                : null}
              {showforgetPassowrd ? <div>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <div>
                      <label htmlFor="userName">user name*</label>
                    </div>
                    <div>
                      <input type="text" className="mb-4 loginInput" value={values.email} onChange={handleChange('email')} />
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <button className='resetButton' onClick={onResetCode}>Click To continue</button>
                  </MDBCol>
                  <MDBCol>
                    <button className='resetButton' onClick={backToLogin}>
                      Back To Login
                    </button>
                  </MDBCol>
                </MDBRow>
              </div> : null}
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

