import React, { useState, useEffect } from 'react';
import Navbar1 from "../common/navbar.js";
import "../css/ContactTeam.css";
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import Swal from "sweetalert2";
import apiService from "../services/api.service";
import { useNavigate } from 'react-router-dom';
const mailValReg = RegExp(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
)
const ContactTeam = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const [basicInfo, setbasicInfo] = useState({})
  const [communicationDetail, setcommunicationDetail] = useState({})
  const [statutory, setstatutory] = useState({})
  const [compaliance, setcompaliance] = useState({})
  const [financialDetail, setfinancialDetail] = useState({})
  const [bankDetail, setbankDetail] = useState({})
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
    let e = { ...errors }
    setErrors(e)
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null
      })
  }
  const validateForm = () => {
    const { contactName1, emailId1, contactNumber1 } = values;

    const newErrors = {}
    if (!contactName1 || contactName1 === "") {
      newErrors.contactName1 = "contactName"
    }
    if (!emailId1 || emailId1 === "") {
      newErrors.emailId1 = "EmailId"
    } else if (!mailValReg.test(emailId1))
      newErrors.emailId1 = "Please enter a valid email"

    if (!contactNumber1 || contactNumber1 === "") {
      newErrors.contactNumber1 = "contactNumber"
    }

    return newErrors
  }
  const saveContactTeam = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    var arr = [];
    var communicationDetailArray = [];
    var statutoryDetailArray = [];
    var compalianceDetailArray = [];
    var bankDetailArray = [];
    var basicVendor = [];
    var communicationVendor = [];
    var statutoryValidation = [];
    var compalianceDetailValidation = [];
    var contactDetailValidation = [];
    var bankDetailValidation = [];
    if (basicInfo) {
      Object.entries(basicInfo).map(([key, value]) => {
        if (value === 'All details filled') {
          arr.length = 0;
        }
        else {
          Object.entries(value).map(([key2, value2]) => {

            if (Object.keys(value2).length <= 0) {

              arr.push(key2);
            }
          })
        }


      })
    }
    if (communicationDetail) {
      Object.entries(communicationDetail).map(([key, value]) => {
        if (value === 'All details filled') {
          communicationDetailArray.length = 0;
        }
        else {
          Object.entries(value).map(([key2, value2]) => {
            if (Object.keys(value2).length <= 0) {
              communicationDetailArray.push(key2);
            }
          })
        }


      })
    }
    if (statutory) {
      Object.entries(statutory).map(([key, value]) => {
        if (value === 'All details filled') {
          statutoryDetailArray.length = 0;
        }
        else {
          Object.entries(value).map(([key2, value2]) => {
            if (Object.keys(value2).length <= 0) {
              statutoryDetailArray.push(key2);
            }
          })
        }


      })
    }
    if (compaliance) {

      Object.entries(compaliance).map(([key, value]) => {
        if (value === 'All details filled') {
          compalianceDetailArray.length = 0;
        }
        else {
          Object.entries(value).map(([key2, value2]) => {
            if (Object.keys(value2).length <= 0) {
              compalianceDetailArray.push(key2);
            }
          })
        }


      })
    }
    if (bankDetail) {
      Object.entries(bankDetail).map(([key, value]) => {
        if (value === 'All details filled') {
          bankDetailArray.length = 0;
        }
        else {
          Object.entries(value).map(([key2, value2]) => {

            if (Object.keys(value2).length <= 0) {
              bankDetailArray.push(key2);
            }
          })
        }
      })
    }
    Object.entries(arr).map(([key, value]) => {
      if (value === 'address1') {
        basicVendor.push('Address Line-1');
      }
      if (value === 'address2') {
        basicVendor.push('Address Line-2');
      }
      if (value === 'city') {
        basicVendor.push('city');
      }
      if (value === 'companyName') {
        basicVendor.push('companyName');
      }
      if (value === 'country') {
        basicVendor.push('country');
      }
      if (value === 'pinCode') {
        basicVendor.push('pinCode');
      }
      if (value === 'state') {
        basicVendor.push('state');
      }
    })
    Object.entries(communicationDetailArray).map(([key, value]) => {
      if (value === 'financeSpoccontactName') {
        communicationVendor.push('financeSpoc-contactName');
      }
      if (value === 'financeSpocdesignation') {
        communicationVendor.push('financeSpoc-designation');
      }
      if (value === 'financeSpocphoneNo') {
        communicationVendor.push('financeSpoc-phoneNo');
      }
      if (value === 'financeSpocemail') {
        communicationVendor.push('financeSpoc-Email');
      }

      if (value === 'managementSpoccontactName') {
        communicationVendor.push('managementSpoc-contactName');
      }
      if (value === 'managementSpocdesignation') {
        communicationVendor.push('managementSpoc-designation');
      }
      if (value === 'managementSpocphoneNo') {
        communicationVendor.push('managementSpoc-phoneNo');
      }
      if (value === 'managementSpocemail') {
        communicationVendor.push('managementSpoc-Email');
      }
      if (value === 'mastervendor_email') {
        communicationVendor.push('mastervendor EmailId');
      }

    })
    Object.entries(statutoryDetailArray).map(([key, value]) => {
      if (value === 'GST_No') {
        statutoryValidation.push('GST No');
      }
      if (value === 'PAN_No') {
        statutoryValidation.push('PAN No');
      }
      if (value === 'CIN_No') {
        statutoryValidation.push('CIN No');
      }
      if (value === 'MSME No') {
        statutoryValidation.push('MSME No');
      }
      if (value === 'TAN_No') {
        statutoryValidation.push('TAN No');
      }
    })
    Object.entries(compalianceDetailArray).map(([key, value]) => {
      if (value === 'RPD_Doc') {
        compalianceDetailValidation.push('Related Party Disclosure');
      }
      if (value === 'COC_Doc') {
        compalianceDetailValidation.push('COC for services support/installation');
      }
      if (value === 'NDA_Doc') {
        compalianceDetailValidation.push('Non-disclosure agreement');
      }
    })
    Object.entries(bankDetailArray).map(([key, value]) => {
      if (value === 'bankAccountName') {
        bankDetailValidation.push('Bank Account Name');
      }
      if (value === 'bankName') {
        bankDetailValidation.push('Bank Name');
      }
      if (value === 'bankAccountNumber') {
        bankDetailValidation.push('Bank AccountNumber');
      }
      if (value === 'ifscCode') {
        bankDetailValidation.push('IFSC Code');
      }
      if (value === 'MICRcode') {
        bankDetailValidation.push('MICR Code');
      }
      if (value === 'bankdetailDoc') {
        bankDetailValidation.push('Bank Detail Document');
      }
    })
    Object.entries(formErrors).map(([key, value]) => {
      contactDetailValidation.push(value);
    })
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
    Swal.fire({
      title: 'please complete this field.',
      html: `VENDOR DETAIL-BASIC INFO:<br> ${basicVendor}<br>VENDOR DETAIL-COMMUNICATION DETAIL:<br> ${communicationVendor}, <br> SATUTORY DETAIL:<br>${statutoryValidation},<br> COMPLIANCE DETAIL:<br> ${compalianceDetailValidation}<br> BANK DETAIL: <br> ${bankDetailValidation} <br> CONTACT DETAIL: <br> ${contactDetailValidation}`,
      padding: '3px',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ok'
    }).then((result) => {
      if (result.isConfirmed) {
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors)
        }
        else {
          apiService.saveContactTeam(user)
            .then(response => {
              if (response.data.status === 'success') {
                Swal.fire(
                  'Your data has been successfully submitted to Hitachi Team and you will receive an email about the status update.',
                )
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
    })
  }
  useEffect(() => {
    apiService.getAllCollection(values.userId)
      .then(getAllCollection => {
        setbasicInfo(getAllCollection.data.basicInfo);
        setcommunicationDetail(getAllCollection.data.CommunicationDetails);
        setstatutory(getAllCollection.data.Statutory);
        setcompaliance(getAllCollection.data.ComplianceDetail);
        setfinancialDetail(getAllCollection.data.FinancialDetail);
        setbankDetail(getAllCollection.data.Bankdetail);
      })
  }, [])
  return (
    <div className="Contact-details" >
      <Navbar1 />
      <div className="container-fluid  py-5" >
        <form >
          <div className="container" >
            <span className="Contact_title">Contact Team</span>
            <div className="row p-5" style={{ backgroundColor: '#fff' }}>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor=" contactName1">Name*</label>
                <input type="text" className="mb-4 Contactinputbox" name="contactName1" value={values.contactName1} onChange={handleChange('contactName1')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="emailId1">Email*</label>
                <input type="text" className="mb-4 Contactinputbox" name="emailId1" value={values.emailId1} onChange={handleChange('emailId1')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="contactNumber1">Contact Number*</label>
                <input type="number" className="mb-4 Contactinputbox" name="contactNumber1" value={values.contactNumber1} onChange={handleChange('contactNumber1')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor=" contactName2">Name</label>
                <input type="text" className="mb-4 Contactinputbox" name="contactName2" value={values.contactName2} onChange={handleChange('contactName2')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="emailId2">Email</label>
                <input type="text" className="mb-4 Contactinputbox" name="emailId2" value={values.emailId2} onChange={handleChange('emailId2')} />  </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="contactNumber2">Contact Number</label>
                <input type="number" className="mb-4 Contactinputbox" name="contactNumber2" value={values.contactNumber2} onChange={handleChange('contactNumber2')} />

              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor=" contactName3">Name</label>
                <input type="text" className="mb-4 Contactinputbox" name="contactName3" value={values.contactName3} onChange={handleChange('contactName3')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="emailId3">Email</label>
                <input type="text" className="mb-4 Contactinputbox" name="emailId3" value={values.emailId3} onChange={handleChange('emailId3')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="contactNumber3">Contact Number</label>
                <input type="number" className="mb-4 Contactinputbox" name="contactNumber3" value={values.contactNumber3} onChange={handleChange('contactNumber3')} />
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
