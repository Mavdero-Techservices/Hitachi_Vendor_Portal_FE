import React, { useState, useEffect, useRef, useCallback }  from 'react'
import "../css/signUp.css"
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import simg from "../img/signup.png";
import Logo from "../img/logo.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCheckbox, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea, MDBTypography } from 'mdb-react-ui-kit';
import { useHistory,useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function Password(props) {
  const {emailId, mailConfirmationCode} = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
      password: '',
      confirmPassword: '',
      userName: '',
      accountError:'',
      emailId:emailId,
      mailConfirmationCode: mailConfirmationCode
    })
    const formValChange  = name => event => {
      setValues({ ...values, [name]: event.target.value })
      setErrors(event)
if (!!errors[name])
setErrors({
    ...errors,
    [name]: null
})
  };
  const validateForm = () => {
    const { userName, password,confirmPassword} = values;

    const newErrors = {}

    if (!userName ||  userName === "")
    {
      newErrors.userName = "Please enter user name"
    }
        
  if (!password || password === "")
  {
    newErrors.password = "Please enter password"
  }
  if (!confirmPassword || confirmPassword === "")
  {
    newErrors.confirmPassword = "Please enter confirmPassword"
  }
  if (password !== confirmPassword)
            newErrors.confirmPassword = "Password and confirm password should be same"
    return newErrors
}
  const handleSubmit = e => {
    const user = {
      userName: values.userName || undefined,
      password: values.password || undefined,
      confirmPassword: values.confirmPassword || undefined,
      emailId:values.emailId|| undefined,
      mailConfirmationCode: values.mailConfirmationCode|| undefined
    }
    const formErrors = validateForm()
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors) 
  } 
  else{
    apiService.resetPassword(user).then((data) => {
      if (data) {
        Swal.fire({
          title: "Password generated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate('/login');
      }
    })
  }
     
    
   
  }
  useEffect(() => {
    console.log("test", mailConfirmationCode);
  })
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
              <input type="text" className="mb-4 loginInput" value={values.userName || ''} onChange={formValChange('userName')} />
              {errors.userName ? <p className="text text-danger small">{errors.userName}</p> : ""}
 </div>
            </MDBCol>
            <MDBRow className="mb-4">
              <MDBCol>
                <div>
                  <label htmlFor="password">Password*</label>
                </div>
                <div>
                  <input type="password" className="mb-4 signupInput" name="password" id="password" onChange={formValChange('password')} value={values.password} />
               
                  {errors.password ? <p className="text text-danger small">{errors.password}</p> : ""} </div>
              </MDBCol>
              <MDBCol>
                <label >confirm Password*</label>
                <input type="password" className="mb-4 signupInput" name="confirmPassword" id="confirmPassword" onChange={formValChange('confirmPassword')} value={values.confirmPassword} />
                {errors.confirmPassword ? <p className="text text-danger small">{errors.confirmPassword}</p> : ""}
              </MDBCol>
            </MDBRow>
            <button className='signupButton' onClick={handleSubmit}>Create password</button>
          </Col>
        </Row>
      </Container>
    )
  
}

