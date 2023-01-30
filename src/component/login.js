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
  const textFieldForPasswordRef = useRef(null);
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    userName: '',
    password: '',
    error: '',
    mailConfirmationCode: '',
    showContent: false,
    redirectToReferrer: false,
    rememberMe: false
  });
  const [validationMessages, setValidationMessages] = useState([]);
  const [resetCode, setresetCode] = useState({
    resetCode: '',
    redirectToReferrer: false
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
    let e = {...errors}
setErrors(e)
if (!!errors[name])
setErrors({
    ...errors,
    [name]: null
})
    setSubmit(true)
  }
  const validateForm = () => {
    const { userName, password} = values;

    const newErrors = {}

    if (!userName ||  userName === "")
    {
      newErrors.userName = "Please enter user name"
    }
        
  if (!password || password === "")
  {
    newErrors.password = "Please enter password"
  }
 
    return newErrors
}
const validateForm2 = () => {
  const { userName} = values;
  const newErrors = {}
  if (!userName ||  userName === "")
      newErrors.userName = "Please enter user name"
  return newErrors
}
  const [showLoginTab, setshowLoginTab] = useState(true);
  const [showforgetPassowrd, setShowforgetPassowrd] = useState(false);
  const [showResetTab, setshowResetTab] = useState(false);
  const [showPasswordTab, setshowPasswordTab] = useState(false);

  const login = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    const user = {
      userName: values.userName || undefined,
      password: values.password || undefined
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors) 
  } 
    else {
    signin(user).then((data) => {
      setErrors(formErrors) 
      if (data.status==='success') {
localStorage.setItem("userName", JSON.stringify(values.userName));
localStorage.setItem("password", JSON.stringify(values.password)); 

}
      else {      
        Swal.fire({
          title: data.data.message,
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
  }

  const onResetCode = (e) => {
    e.preventDefault()
    const formErrors = validateForm2()
    const user = {
      userName: values.userName || undefined,
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors) 
  } 
  else
  {
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
  const { redirectToReferrer } = values

  if (redirectToReferrer) {
    if (verifiedUser && verifiedUser === 'approved') {
      return (<Navigate to={'/basic'} />)
    } else if (verifiedUser && verifiedUser === 'pending') {
      return (<Navigate to={'/'} />)
    }
  }
  return (
    <div className='login'>
      <Container>
        <Row md={2}>
          <Col xs={4}>
            <Col> <img className="hisys-img" alt="" src={hisys} /> </Col>
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
                        <input type="text" className="mb-4 loginInput" value={values.userName || ''} onChange={handleChange('userName')} />
                      </div>
                      {errors.userName ? <p className="text text-danger small">{errors.userName}</p> : ""}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <label >password*</label>
                      <input className="mb-4 loginInput" type="password" label="Password" variant="outlined" value={values.password} onChange={handleChange('password')} />
                      {errors.password ? <p className="text text-danger small">{errors.password}</p> : ""}
                   </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      {!showPasswordTab && showLoginTab && !showforgetPassowrd ? <div className="form-group form-remember">
                        <button className='ForgetBtn' onClick={forgetPassword}> forget password?</button>
                        <label className='rememberMe'>
        <input name="rememberMe"  type="checkbox"/> Remember me
      </label>
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
                      <input type="text" className="mb-4 loginInput" value={values.userName} onChange={handleChange('userName')} />
                      {errors.userName ? <p className="text text-danger small">{errors.userName}</p> : ""}
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

