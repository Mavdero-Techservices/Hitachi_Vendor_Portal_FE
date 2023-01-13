import React, { useState } from 'react';
import Navbar1 from "../common/navbar.js";
import "../css/ContactTeam.css";
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import Swal from "sweetalert2";
import apiService from "../services/api.service";
import { useNavigate } from 'react-router-dom';
const ContactTeam = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    contactName1: '',
    emailId1: '',
    contactNumber1: '',
    contactName2: '',
    emailId2: '',
    contactNumber2: '',
    contactName3: '',
    emailId3: '',
    contactNumber3: '',
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const saveContactTeam = (e) => {
    const user = {
      userId: values.userId || undefined,
      contactName1: values.contactName1 || undefined,
      emailId1: values.emailId1 || undefined,
      contactNumber1: values.contactNumber1 || undefined,
      contactName2: values.contactName2 || undefined,
      emailId2: values.emailId2 || undefined,
      contactNumber2: values.contactNumber2 || undefined,
      contactName3: values.contactName3 || undefined,
      emailId3: values.emailId3 || undefined,
      contactNumber3: values.contactNumber3 || undefined,
    }
    apiService.saveContactTeam(user)
      .then(response => {

      })
  }
  return (
    <div className="Contact-details" >
      <Navbar1 />
      <div className="container-fluid  py-5" >
        <form >
          <div className="container" >
            <span className="Contact_title">Contact Team</span>
            <div className="row p-5" style={{ backgroundColor: '#fff' }}>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor=" contactName1">Name</label>
                <input type="text" className="mb-4 Contactinputbox" name="contactName1" value={values.contactName1} onChange={handleChange('contactName1')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="emailId1">Email*</label>
                <input type="text" className="mb-4 Contactinputbox" name="emailId1" value={values.emailId1} onChange={handleChange('emailId1')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="contactNumber1">Contact Number*</label>
                <input type="text" className="mb-4 Contactinputbox" name="contactNumber1" value={values.contactNumber1} onChange={handleChange('contactNumber1')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor=" contactName2">Name</label>
                <input type="text" className="mb-4 Contactinputbox" name="contactName2" value={values.contactName2} onChange={handleChange('contactName2')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="emailId2">Email*</label>
                <input type="text" className="mb-4 Contactinputbox" name="emailId2" value={values.emailId2} onChange={handleChange('emailId2')} />  </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="contactNumber2">Contact Number*</label>
                <input type="text" className="mb-4 Contactinputbox" name="contactNumber2" value={values.contactNumber2} onChange={handleChange('contactNumber2')} />

              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor=" contactName3">Name</label>
                <input type="text" className="mb-4 Contactinputbox" name="contactName3" value={values.contactName3} onChange={handleChange('contactName3')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="emailId3">Email*</label>
                <input type="text" className="mb-4 Contactinputbox" name="emailId3" value={values.emailId3} onChange={handleChange('emailId3')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="contactNumber3">Contact Number*</label>
                <input type="text" className="mb-4 Contactinputbox" name="contactNumber3" value={values.contactNumber3} onChange={handleChange('contactNumber3')} />
              </div>

            </div>
          </div>
          <div className="float-end">
            <button type="button" onClick={saveContactTeam} className="btn Contactbtn btn-primary btn-md m-3">Submit</button>
          </div>
        </form>
      </div>
      <div>
      </div>
    </div>
  );
};

export default ContactTeam;
