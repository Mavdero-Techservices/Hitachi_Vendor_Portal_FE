import React, { useState , useEffect} from 'react';
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
    let e = {...errors}
    setErrors(e)
    if (!!errors[name])
    setErrors({
        ...errors,
        [name]: null
    })
  }
  const validateForm = () => {
    const {contactName1,emailId1,contactNumber1} = values;

    const newErrors = {}
    if (!contactName1 || contactName1 === "")
    {
      newErrors.contactName1 = "Please enter contactName"
    }
    if (!emailId1 ||  emailId1 === "")
    {
      newErrors.emailId1 = "Please enter emailId"
    } else if (!mailValReg.test(emailId1))
    newErrors.emailId1 = "Please enter a valid email"
        
  if (!contactNumber1 || contactNumber1 === "")
  {
    newErrors.contactNumber1 = "Please entercontactNumber1"
  }
 
    return newErrors
}
  const saveContactTeam =(e) => {
    e.preventDefault()
    const formErrors = validateForm()
    var arr = [];
    var communicationDetailArray = [];
    var statutoryDetailArray = [];
    var compalianceDetailArray = [];
    var bankDetailArray = [];
    var financeDetailArray = [];
    
if(basicInfo)
{
  Object.entries(basicInfo).map(([key, value]) => {
  
    Object.entries(value).map(([key2, value2]) => {

      if(value2==='')
      {
        arr.push([key2]);
        
      }
      else
      {
        console.log("noterror");
      }

    
    })
 
})
}
if(communicationDetail)
{
  Object.entries(communicationDetail).map(([key, value]) => {

  if(value.collectionSpoccontactName==='')
  {
    
    console.log("valuee")
  }
    Object.entries(value).map(([key2, value2]) => {

      if(value2==='')
      {
        communicationDetailArray.push([key2]);
        
      }
      else
      {
        console.log("noterror");
      }

    
    })
  
}) 
}
if(statutory)
{
  Object.entries(statutory).map(([key, value]) => {
  
    Object.entries(value).map(([key2, value2]) => {
  
      if(value2==='')
      {
        statutoryDetailArray.push([key2]);
        
      }
      else
      {
        console.log("noterror");
      }
  
    
    })
  
  }) 
}  
 if(compaliance)
 {
  Object.entries(compaliance).map(([key, value]) => {
  
    Object.entries(value).map(([key2, value2]) => {
  
      if(value2==='')
      {
        compalianceDetailArray.push([key2]);
        
      }
      else
      {
        console.log("noterror");
      }
  
    
    })
  
  }) 
 }
 if(bankDetail)
 {
  Object.entries(bankDetail).map(([key, value]) => {
  
    Object.entries(value).map(([key2, value2]) => {
  
      if(value2==='')
      {
        bankDetailArray.push([key2]);
        
      }
      else
      {
        console.log("noterror");
      }
  
    
    })
  
  }) 
 }
 console.log(arr.address1)
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
          html: `VENDOR DETAIL-BASIC INFO:<br> ${arr}<br>VENDOR DETAIL-COMMUNICATION DETAIL:<br> ${communicationDetailArray}, <br> SATUTORY DETAIL:<br>${statutoryDetailArray},<br> COMPLIANCE DETAIL:<br> ${compalianceDetailArray},<br> FINANCIAL DETAIL: <br> ${financeDetailArray},<br> BANK DETAIL: <br> ${bankDetailArray}`,
          padding: '3px',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ok'
        }).then((result) => {
          if (result.isConfirmed) {
            if (Object.keys(formErrors).length > 0) {
              setErrors(formErrors) 
          } 
          else{
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
                <label htmlFor=" contactName1">Name</label>
                <input type="text" className="mb-4 Contactinputbox" name="contactName1" value={values.contactName1} onChange={handleChange('contactName1')} />
                {errors.contactName1 ? <p className="text text-danger small">{errors.contactName1}</p> : ""}
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="emailId1">Email*</label>
                <input type="text" className="mb-4 Contactinputbox" name="emailId1" value={values.emailId1} onChange={handleChange('emailId1')} />
                {errors.emailId1? <p className="text text-danger small">{errors.emailId1}</p> : ""}
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="contactNumber1">Contact Number*</label>
                <input type="number" className="mb-4 Contactinputbox" name="contactNumber1" value={values.contactNumber1} onChange={handleChange('contactNumber1')} />
                {errors.contactNumber1? <p className="text text-danger small">{errors.contactNumber1}</p> : ""}
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
                <input type="number" className="mb-4 Contactinputbox" name="contactNumber2" value={values.contactNumber2} onChange={handleChange('contactNumber2')} />

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
