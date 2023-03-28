import React, { useState, useEffect } from "react";
import Navbar1 from "../common/navbar.js";
import "../css/ContactTeam.css";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import Swal from "sweetalert2";
import apiService from "../services/api.service";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const mailValReg = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const numberValidation = /^-?(0|[1-9]\d*)?$/;
const emailValidation = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const GSTValidation = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
const PANValidation = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const ContactTeam = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [basicInfo, setbasicInfo] = useState({});
  const [basicInfoNotEmpty, setbasicInfoNotEmpty] = useState({});
  const [communicationDetail, setcommunicationDetail] = useState({});
  const [statutory, setstatutory] = useState({});
  const [compaliance, setcompaliance] = useState({});
  const [financialDetail, setfinancialDetail] = useState({});
  const [bankDetail, setbankDetail] = useState({});
  const [style, setStyle] = useState("editable");
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    contactName1: "",
    emailId1: "",
    contactNumber1: "",
    contactName2: "",
    emailId2: "",
    contactNumber2: "",
    contactName3: "",
    emailId3: "",
    contactNumber3: "",
  });

  function cancel(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCloseButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setValues({
          contactName1: "",
          emailId1: "",
          contactNumber1: "",
          contactName2: "",
          emailId2: "",
          contactNumber2: "",
          contactName3: "",
          emailId3: "",
          contactNumber3: "",
        });
      }
    });
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    let e = { ...errors };
    setErrors(e);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  const validateForm = () => {
    const { contactName1, emailId1, contactNumber1 } = values;

    const newErrors = {};
    if (!contactName1 || contactName1 === "") {
      newErrors.contactName1 = "contactName";
    }

    if (!emailId1 || emailId1 === "") {
      newErrors.emailId1 = "EmailId";
    }

    if (!emailValidation.test(emailId1)) {
      newErrors.emailId1 = "Please enter a valid Email";
    }

    if (!contactNumber1 || contactNumber1 === "") {
      newErrors.contactNumber1 = "contactNumber";
    }

    if (
      !numberValidation.test(contactNumber1) ||
      contactNumber1.length !== 10
    ) {
      newErrors.contactNumber1 = "Please enter a valid Phone Number";
    }

    return newErrors;
  };
  const saveContactTeam = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    var basicInfoArray = [];
    var basicInfoMandtatory = "";
    var communicationArray = [];
    var complianceArray = [];
    var statutoryArray = [];
    var bankDetailArray = [];
    var contactDetailArray = [];
    if (basicInfo.length <= 0) {
      basicInfoArray.push("Address Line-1");
      basicInfoArray.push("city");
      basicInfoArray.push("companyName");
      basicInfoArray.push("country");
      basicInfoArray.push("pinCode");
      basicInfoArray.push("state");
    } else {
      Object.entries(basicInfo[0]).map(([key, value]) => {
        if (value === "" || value === null) {
          if (key === "address1") {
            basicInfoArray.push("Address Line-1");
          }
          if (key === "city") {
            basicInfoArray.push("city");
          }
          if (key === "companyName") {
            basicInfoArray.push("companyName");
          }
          if (key === "country") {
            basicInfoArray.push("country");
          }
          if (key === "pinCode") {
            basicInfoArray.push("pinCode");
          }
          if (key === "state") {
            basicInfoArray.push("state");
          }
        }
        if (value && key === "pinCode") {
          if (!numberValidation.test(value) || value.length !== 6)
            basicInfoArray.push("Pincode is invalid");
        }
      });
    }

    if (communicationDetail.length <= 0) {
      communicationArray.push("financeSpoc-contactName");
      communicationArray.push("financeSpoc-designation");
      communicationArray.push("financeSpoc-phoneNo");
      communicationArray.push("financeSpoc-Email");
      communicationArray.push("managementSpoc-contactName");
      communicationArray.push("managementSpoc-designation");
      communicationArray.push("managementSpoc-phoneNo");
      communicationArray.push("managementSpoc-Email");
      communicationArray.push("mastervendor EmailId");
    } else {
      Object.entries(communicationDetail[0]).map(([key, value]) => {
        if (value === "" || null) {
          if (key === "financeSpoccontactName") {
            communicationArray.push("financeSpoc-contactName");
          }
          if (key === "financeSpocdesignation") {
            communicationArray.push("financeSpoc-designation");
          }
          if (key === "financeSpocphoneNo") {
            communicationArray.push("financeSpoc-phoneNo");
          }
          if (key === "financeSpocemail") {
            communicationArray.push("financeSpoc-Email");
          }

          if (key === "managementSpoccontactName") {
            communicationArray.push("managementSpoc-contactName");
          }
          if (key === "managementSpocdesignation") {
            communicationArray.push("managementSpoc-designation");
          }
          if (key === "managementSpocphoneNo") {
            communicationArray.push("managementSpoc-phoneNo");
          }
          if (key === "managementSpocemail") {
            communicationArray.push("managementSpoc-Email");
          }
          if (key === "mastervendor_email") {
            communicationArray.push("mastervendor EmailId");
          }
        }

        if (value && key === "financeSpocphoneNo") {
          if (!numberValidation.test(value) || value.length !== 10)
            communicationArray.push("financeSpocphoneNo is invalid");
        }
        if (value && key === "managementSpocphoneNo") {
          if (!numberValidation.test(value) || value.length !== 10)
            communicationArray.push("managementSpocphoneNo is invalid");
        }

        if (value && key === "financeSpocemail") {
          if (!emailValidation.test(value))
            communicationArray.push("financeSpocemail Email is invalid");
        }
        if (value && key === "managementSpocemail") {
          if (!emailValidation.test(value))
            communicationArray.push("managementSpocemail Email is invalid");
        }
        if (value && key === "mastervendor_email") {
          if (!emailValidation.test(value))
            communicationArray.push("mastervendor_email Email is invalid");
        }
      });
    }
    if (statutory.length <= 0) {
      statutoryArray.push("GST No");
      statutoryArray.push("PAN No");
      statutoryArray.push("CIN No");
      statutoryArray.push("MSME No");
      statutoryArray.push("TAN No");
      statutoryArray.push("GST Doc");
      statutoryArray.push("PAN Doc");
      statutoryArray.push("TAN Doc");
      statutoryArray.push("MSME No");
    } else {
      Object.entries(statutory[0]).map(([key, value]) => {
        if (value === "" || null) {
          if (key === "GST_No") {
            statutoryArray.push("GST No");
          }
          if (key === "PAN_No") {
            statutoryArray.push("PAN No");
          }
          if (key === "CIN_No") {
            statutoryArray.push("CIN No");
          }
          if (key === "MSME No") {
            statutoryArray.push("MSME No");
          }
          if (key === "TAN_No") {
            statutoryArray.push("TAN No");
          }
          if (key === "GST_Doc") {
            statutoryArray.push("GST Doc");
          }
          if (key === "PAN_Doc") {
            statutoryArray.push("PAN Doc");
          }
          if (key === "TAN_Doc") {
            statutoryArray.push("TAN Doc");
          }
          if (key === "MSME_Doc") {
            statutoryArray.push("MSME Doc");
          }
        }

        // if (value === "UnRegistered" && key === "MSME_status") {
        //   if (key === "MSME_Doc") {
        //     if (!value) {
        //       statutoryArray.push("MSME DOC");
        //     }
        //   }
        // }

        if (value && key === "GST_No") {
          if (!GSTValidation.test(value))
            statutoryArray.push("GST No is invalid");
        }

        if (value && key === "GST_No") {
          if (!GSTValidation.test(value))
            statutoryArray.push("GST No is invalid");
        }
        if (value && key === "PAN_No") {
          if (!PANValidation.test(value))
            statutoryArray.push("PAN NO is invalid");
        }
      });
    }
    if (compaliance.length <= 0) {
      complianceArray.push("Related Party Disclosure");
      complianceArray.push("COC for services support/installation");
      complianceArray.push("Non-disclosure agreement");
    } else {
      Object.entries(compaliance[0]).map(([key, value]) => {
        if (value === "" || null) {
          if (key === "RPD_Doc") {
            complianceArray.push("Related Party Disclosure");
          }
          if (key === "COC_Doc") {
            complianceArray.push("COC support/installation");
          }
          if (key === "NDA_Doc") {
            complianceArray.push("Non-disclosure agreement");
          }
        }
      });
    }
    if (bankDetail.length <= 0) {
      bankDetailArray.push("Bank Account Name");
      bankDetailArray.push("Bank Name");
      bankDetailArray.push("Bank AccountNumber");
      bankDetailArray.push("IFSC Code");
      bankDetailArray.push("MICR Code");
      bankDetailArray.push("Bank Detail Document");
    } else {
      Object.entries(bankDetail[0]).map(([key, value]) => {
        if (value === "" || null) {
          if (key === "bankAccountName") {
            bankDetailArray.push("Bank Account Name");
          }
          if (key === "bankName") {
            bankDetailArray.push("Bank Name");
          }
          if (key === "bankAccountNumber") {
            bankDetailArray.push("Bank AccountNumber");
          }
          if (key === "ifscCode") {
            bankDetailArray.push("IFSC Code");
          }
          if (key === "MICRcode") {
            bankDetailArray.push("MICR Code");
          }
          if (key === "bankdetailDoc") {
            bankDetailArray.push("Bank Detail Document");
          }
        }
      });
    }
    if (formErrors.length <= 0) {
      contactDetailArray.push("Name");
      contactDetailArray.push("Email");
      contactDetailArray.push("phoneNumber");
    } else {
      Object.entries(formErrors).map(([key, value]) => {
        contactDetailArray.push(value);
      });
    }

    if (basicInfoArray.length <= 0) {
      basicInfoArray.push("There are no blank or incomplete required fields");
    }
    if (communicationArray.length <= 0) {
      communicationArray.push(
        "There are no blank or incomplete required fields"
      );
    }
    if (statutoryArray.length <= 0) {
      statutoryArray.push("There are no blank or incomplete required fields");
    }
    if (complianceArray.length <= 0) {
      complianceArray.push("There are no blank or incomplete required fields");
    }
    if (bankDetailArray.length <= 0) {
      bankDetailArray.push("There are no blank or incomplete required fields");
    }
    if (contactDetailArray.length <= 0) {
      contactDetailArray.push(
        "There are no blank or incomplete required fields"
      );
    }

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
    };
    if (params.userId) {
      apiService.updateContactTeam(params.userId, user).then((response) => {
        if (response.data.status === "success") {
          navigate(`/ContactTeam/${params.userId}`);
          let userkey = params.userId;
          if (
            basicInfoArray[0] ===
            "There are no blank or incomplete required fields" &&
            communicationArray[0] ===
            "There are no blank or incomplete required fields" &&
            statutoryArray[0] ===
            "There are no blank or incomplete required fields" &&
            complianceArray[0] ===
            "There are no blank or incomplete required fields" &&
            bankDetailArray[0] ===
            "There are no blank or incomplete required fields" &&
            contactDetailArray[0] ===
            "There are no blank or incomplete required fields"
          ) {
            basicInfo[0].submitStatus = "Submitted";
            basicInfo[0].submitDate = Date.now();
            apiService
              .updateVendordetail(userkey, basicInfo[0])
              .then((response) => {
                Swal.fire(
                  "Your data has been successfully submitted to Hitachi Team and you will receive an email about the status update."
                );
              });
          } else {
            Swal.fire({
              title: "please complete this field.",
              html: `<b> VENDOR DETAIL-BASIC INFORMATION:</b> <br> ${basicInfoArray}${basicInfoMandtatory}<br>
                 <b>VENDOR DETAIL-COMMUNICATION DETAIL: </b> <br> ${communicationArray}, <br>
                 <b> SATUTORY DETAIL: </b> <br>${statutoryArray},<br>
                 <b> COMPLIANCE DETAIL: </b> <br> ${complianceArray}<br> 
                 <b>BANK DETAIL:  </b> <br> ${bankDetailArray} <br>
                 <b> CONTACT DETAIL: </b> <br> ${contactDetailArray}`,
              padding: "3px",
              icon: "warning",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "ok",
            });
          }
        }
      });
    } else {
      let newuser = JSON.parse(window.sessionStorage.getItem("newregUser"))?.newregUser
      console.log("new user----------------->>>>>", newuser)
      if (newuser) {
        user.userId = newuser
        apiService.saveContactTeam(user).then((response) => {
          if (response.data.status === "success") {
            // let userkey = JSON.parse(window.sessionStorage.getItem("jwt")).result
            //   .userId;
            if (
              basicInfoArray[0] ===
              "There are no blank or incomplete required fields" &&
              communicationArray[0] ===
              "There are no blank or incomplete required fields" &&
              statutoryArray[0] ===
              "There are no blank or incomplete required fields" &&
              complianceArray[0] ===
              "There are no blank or incomplete required fields" &&
              bankDetailArray[0] ===
              "There are no blank or incomplete required fields" &&
              contactDetailArray[0] ===
              "There are no blank or incomplete required fields"
            ) {
              basicInfo[0].submitStatus = "Submitted";
              basicInfo[0].submitDate = Date.now();
              apiService
                .updateVendordetail(newuser, basicInfo[0])
                .then((response) => {
                  Swal.fire(
                    "Your data has been successfully submitted to Hitachi Team and you will receive an email about the status update."
                  );
                });
            } else {
              Swal.fire({
                title: "please complete this field.",
                html: `<b> VENDOR DETAIL-BASIC INFORMATION:</b> <br> ${basicInfoArray}${basicInfoMandtatory}<br>
                 <b>VENDOR DETAIL-COMMUNICATION DETAIL: </b> <br> ${communicationArray}, <br>
                 <b> SATUTORY DETAIL: </b> <br>${statutoryArray},<br>
                 <b> COMPLIANCE DETAIL: </b> <br> ${complianceArray}<br> 
                 <b>BANK DETAIL:  </b> <br> ${bankDetailArray} <br>
                 <b> CONTACT DETAIL: </b> <br> ${contactDetailArray}`,
                padding: "3px",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "ok",
              });
            }
          }
        });
      } else {
        apiService.saveContactTeam(user).then((response) => {
          if (response.data.status === "success") {
            let userkey = JSON.parse(window.sessionStorage.getItem("jwt")).result
              .userId;
            if (
              basicInfoArray[0] ===
              "There are no blank or incomplete required fields" &&
              communicationArray[0] ===
              "There are no blank or incomplete required fields" &&
              statutoryArray[0] ===
              "There are no blank or incomplete required fields" &&
              complianceArray[0] ===
              "There are no blank or incomplete required fields" &&
              bankDetailArray[0] ===
              "There are no blank or incomplete required fields" &&
              contactDetailArray[0] ===
              "There are no blank or incomplete required fields"
            ) {
              basicInfo[0].submitStatus = "Submitted";
              basicInfo[0].submitDate = Date.now();
              apiService
                .updateVendordetail(userkey, basicInfo[0])
                .then((response) => {
                  Swal.fire(
                    "Your data has been successfully submitted to Hitachi Team and you will receive an email about the status update."
                  );
                });
            } else {
              Swal.fire({
                title: "please complete this field.",
                html: `<b> VENDOR DETAIL-BASIC INFORMATION:</b> <br> ${basicInfoArray}${basicInfoMandtatory}<br>
                 <b>VENDOR DETAIL-COMMUNICATION DETAIL: </b> <br> ${communicationArray}, <br>
                 <b> SATUTORY DETAIL: </b> <br>${statutoryArray},<br>
                 <b> COMPLIANCE DETAIL: </b> <br> ${complianceArray}<br> 
                 <b>BANK DETAIL:  </b> <br> ${bankDetailArray} <br>
                 <b> CONTACT DETAIL: </b> <br> ${contactDetailArray}`,
                padding: "3px",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "ok",
              });
            }
          }
        });
      }
    };
  }
  const updateContactTeam = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    var basicInfoArray = [];
    var basicInfoMandtatory = "";
    var communicationArray = [];
    var complianceArray = [];
    var statutoryArray = [];
    var bankDetailArray = [];
    var contactDetailArray = [];
    if (basicInfo.length <= 0) {
      console.log("basicInfo", basicInfo);
      basicInfoArray.push("Address Line-1");
      basicInfoArray.push("city");
      basicInfoArray.push("companyName");
      basicInfoArray.push("country");
      basicInfoArray.push("pinCode");
      basicInfoArray.push("state");
    } else {
      Object.entries(basicInfo[0]).map(([key, value]) => {
        if (value === "" || null) {
          if (key === "address1") {
            basicInfoArray.push("Address Line-1");
          }
          if (key === "city") {
            basicInfoArray.push("city");
          }
          if (key === "companyName") {
            basicInfoArray.push("companyName");
          }
          if (key === "country") {
            basicInfoArray.push("country");
          }
          if (key === "pinCode") {
            basicInfoArray.push("pinCode");
          }
          if (key === "state") {
            basicInfoArray.push("state");
          }
        }
      });
    }

    if (communicationDetail.length <= 0) {
      communicationArray.push("financeSpoc-contactName");
      communicationArray.push("financeSpoc-designation");
      communicationArray.push("financeSpoc-phoneNo");
      communicationArray.push("financeSpoc-Email");
      communicationArray.push("managementSpoc-contactName");
      communicationArray.push("managementSpoc-designation");
      communicationArray.push("managementSpoc-phoneNo");
      communicationArray.push("managementSpoc-Email");
    } else {
      Object.entries(communicationDetail[0]).map(([key, value]) => {
        if (value === "" || null) {
          if (key === "financeSpoccontactName") {
            communicationArray.push("financeSpoc-contactName");
          }
          if (key === "financeSpocdesignation") {
            communicationArray.push("financeSpoc-designation");
          }
          if (key === "financeSpocphoneNo") {
            communicationArray.push("financeSpoc-phoneNo");
          }
          if (key === "financeSpocemail") {
            communicationArray.push("financeSpoc-Email");
          }

          if (key === "managementSpoccontactName") {
            communicationArray.push("managementSpoc-contactName");
          }
          if (key === "managementSpocdesignation") {
            communicationArray.push("managementSpoc-designation");
          }
          if (key === "managementSpocphoneNo") {
            communicationArray.push("managementSpoc-phoneNo");
          }
          if (key === "managementSpocemail") {
            communicationArray.push("managementSpoc-Email");
          }
        }
      });
    }
    if (statutory.length <= 0) {
      statutoryArray.push("GST No");
      statutoryArray.push("PAN No");
      statutoryArray.push("CIN No");
      statutoryArray.push("MSME No");
      statutoryArray.push("TAN No");
    } else {
      Object.entries(statutory[0]).map(([key, value]) => {
        if (value === "" || null) {
          if (key === "GST_No") {
            statutoryArray.push("GST No");
          }
          if (key === "PAN_No") {
            statutoryArray.push("PAN No");
          }
          if (key === "CIN_No") {
            statutoryArray.push("CIN No");
          }
          if (key === "MSME No") {
            statutoryArray.push("MSME No");
          }
          if (key === "TAN_No") {
            statutoryArray.push("TAN No");
          }
        }
      });
    }
    if (compaliance.length <= 0) {
      complianceArray.push("Related Party Disclosure");
      complianceArray.push("COC for services support/installation");
      complianceArray.push("Non-disclosure agreement");
    } else {
      Object.entries(compaliance[0]).map(([key, value]) => {
        if (value === "" || null) {
          if (key === "RPD_Doc") {
            complianceArray.push("Related Party Disclosure");
          }
          if (key === "COC_Doc") {
            complianceArray.push("COC support/installation");
          }
          if (key === "NDA_Doc") {
            complianceArray.push("Non-disclosure agreement");
          }
        }
      });
    }
    if (bankDetail.length <= 0) {
      bankDetailArray.push("Bank Account Name");
      bankDetailArray.push("Bank Name");
      bankDetailArray.push("Bank AccountNumber");
      bankDetailArray.push("IFSC Code");
      bankDetailArray.push("MICR Code");
      bankDetailArray.push("Bank Detail Document");
    } else {
      Object.entries(bankDetail[0]).map(([key, value]) => {
        if (value === "" || null) {
          if (key === "bankAccountName") {
            bankDetailArray.push("Bank Account Name");
          }
          if (key === "bankName") {
            bankDetailArray.push("Bank Name");
          }
          if (key === "bankAccountNumber") {
            bankDetailArray.push("Bank AccountNumber");
          }
          if (key === "ifscCode") {
            bankDetailArray.push("IFSC Code");
          }
          if (key === "MICRcode") {
            bankDetailArray.push("MICR Code");
          }
          if (key === "bankdetailDoc") {
            bankDetailArray.push("Bank Detail Document");
          }
        }
      });
    }
    if (formErrors.length <= 0) {
      contactDetailArray.push("Name");
      contactDetailArray.push("Email");
      contactDetailArray.push("phoneNumber");
    } else {
      Object.entries(formErrors).map(([key, value]) => {
        contactDetailArray.push(value);
      });
    }

    if (basicInfoArray.length <= 0) {
      basicInfoArray.push("There are no blank or incomplete required fields");
    }
    if (communicationArray.length <= 0) {
      communicationArray.push(
        "There are no blank or incomplete required fields"
      );
    }
    if (statutoryArray.length <= 0) {
      statutoryArray.push("There are no blank or incomplete required fields");
    }
    if (complianceArray.length <= 0) {
      complianceArray.push("There are no blank or incomplete required fields");
    }
    if (bankDetailArray.length <= 0) {
      bankDetailArray.push("There are no blank or incomplete required fields");
    }
    if (contactDetailArray.length <= 0) {
      contactDetailArray.push(
        "There are no blank or incomplete required fields"
      );
    }

    const user = {
      userId: params.userId || undefined,
      contactName1: values.contactName1 || undefined,
      emailId1: values.emailId1 || undefined,
      contactNumber1: values.contactNumber1 || undefined,
      contactName2: values.contactName2 || undefined,
      emailId2: values.emailId2 || undefined,
      contactNumber2: values.contactNumber2 || undefined,
      contactName3: values.contactName3 || undefined,
      emailId3: values.emailId3 || undefined,
      contactNumber3: values.contactNumber3 || undefined,
    };
    if (params.userId) {
      apiService.updateContactTeam(params.userId, user).then((response) => {
        if (response.data.status === "success") {
          navigate(`/ContactTeam/${params.userId}`);
          let userkey = params.userId;
          if (
            basicInfoArray[0] ===
            "There are no blank or incomplete required fields" &&
            communicationArray[0] ===
            "There are no blank or incomplete required fields" &&
            statutoryArray[0] ===
            "There are no blank or incomplete required fields" &&
            complianceArray[0] ===
            "There are no blank or incomplete required fields" &&
            bankDetailArray[0] ===
            "There are no blank or incomplete required fields" &&
            contactDetailArray[0] ===
            "There are no blank or incomplete required fields"
          ) {
            let basic;
            apiService.getAllCollection(params.userId).then((res) => {
              basic = res.data.basicInfo[0];

              if (basic) {
                basic.submitStatus = "Submitted";
                basic.userId = userkey;
                basic.submitDate = Date.now();

                apiService
                  .updateVendordetail(userkey, basic)
                  .then((response) => {
                    Swal.fire(
                      "Your data has been successfully submitted to Hitachi Team and you will receive an email about the status update."
                    );
                  });
              }
            });

            // let userid = JSON.parse(window.sessionStorage.getItem("jwt")).result
            //   .userId;
            // apiService.signupFindByUserId(userid).then((res) => {
            //   this.setState({ approval: res.data.result.role });
            //   console.log("approval", res.data.result.role);
            // });
            // {
            //   approval === Admin
            //     ? navigate("/userCreation")
            //     : navigate("/login");
            // }
          } else {
            Swal.fire({
              title: "please complete this field.",
              html: `<b> VENDOR DETAIL-BASIC INFORMATION:</b> <br> ${basicInfoArray}${basicInfoMandtatory}<br>
                 <b>VENDOR DETAIL-COMMUNICATION DETAIL: </b> <br> ${communicationArray}, <br>
                 <b> SATUTORY DETAIL: </b> <br>${statutoryArray},<br>
                 <b> COMPLIANCE DETAIL: </b> <br> ${complianceArray}<br> 
                 <b>BANK DETAIL:  </b> <br> ${bankDetailArray} <br>
                 <b> CONTACT DETAIL: </b> <br> ${contactDetailArray}`,
              padding: "3px",
              icon: "warning",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "ok",
            });
          }
        }
      });
    }
  };
  useEffect(() => {
    let newuser = JSON.parse(window.sessionStorage.getItem("newregUser"))?.newregUser
    if (params.userId) {
      let finalstatus = "";
      apiService.signupFindByUserId(params.userId).then((res) => {
        finalstatus = res.data.result.finalStatus;
      });
      apiService.getAllCollection(params.userId).then((res) => {
        if (
          res.data.basicInfo[0].submitStatus === "Submitted" &&
          finalstatus !== "Approved"
        ) {
          setStyle("notEditable");
        }
        Object.entries(res.data.contactDetail).map(([key, value]) => {
          setValues({
            contactName1: value.contactName1,
            emailId1: value.emailId1,
            contactNumber1: value.contactNumber1,
            contactName2: value.contactName2,
            emailId2: value.emailId2,
            contactNumber2: value.contactNumber2,
            contactName3: value.contactName3,
            emailId3: value.emailId3,
            contactNumber3: value.contactNumber3,
          });
        });
      });
    } else if (newuser) {
      let finalstatus = "";
      apiService.signupFindByUserId(newuser).then((res) => {
        finalstatus = res.data.result.finalStatus;
      });
      apiService.getAllCollection(newuser).then((res) => {
        if (
          res.data.basicInfo[0].submitStatus === "Submitted" &&
          finalstatus !== "Approved"
        ) {
          setStyle("notEditable");
        }
        Object.entries(res.data.contactDetail).map(([key, value]) => {
          setValues({
            contactName1: value.contactName1,
            emailId1: value.emailId1,
            contactNumber1: value.contactNumber1,
            contactName2: value.contactName2,
            emailId2: value.emailId2,
            contactNumber2: value.contactNumber2,
            contactName3: value.contactName3,
            emailId3: value.emailId3,
            contactNumber3: value.contactNumber3,
          });
        });
      });
    }
    if (newuser) {
      apiService.getAllCollection(newuser).then((getAllCollection) => {
        setbasicInfo(getAllCollection.data.basicInfo);
        setcommunicationDetail(getAllCollection.data.CommunicationDetails);
        setstatutory(getAllCollection.data.Statutory);
        setcompaliance(getAllCollection.data.ComplianceDetail);
        setfinancialDetail(getAllCollection.data.FinancialDetail);
        setbankDetail(getAllCollection.data.Bankdetail);
      });
    } else {
      if (
        JSON.parse(window.sessionStorage.getItem("jwt")).result.role === "Admin"
      ) {
        apiService.getAllCollection(params.userId).then((getAllCollection) => {
          setbasicInfo(getAllCollection.data.basicInfo);
          setcommunicationDetail(getAllCollection.data.CommunicationDetails);
          setstatutory(getAllCollection.data.Statutory);
          setcompaliance(getAllCollection.data.ComplianceDetail);
          setfinancialDetail(getAllCollection.data.FinancialDetail);
          setbankDetail(getAllCollection.data.Bankdetail);
        });
      } else {
        apiService.getAllCollection(values.userId).then((getAllCollection) => {
          setbasicInfo(getAllCollection.data.basicInfo);
          setcommunicationDetail(getAllCollection.data.CommunicationDetails);
          setstatutory(getAllCollection.data.Statutory);
          setcompaliance(getAllCollection.data.ComplianceDetail);
          setfinancialDetail(getAllCollection.data.FinancialDetail);
          setbankDetail(getAllCollection.data.Bankdetail);
        });
      }
    }
  }, []);
  return (
    <div className="Contact-details">
      <Navbar1 />
      <div className="container-fluid  py-5">
        <form className={style}>
          <div className="container">
            <span className="Contact_title">Contact Team</span>
            <div className="row p-5" style={{ backgroundColor: "#fff" }}>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor=" contactName1">Name*</label>
                <input
                  type="text"
                  className="mb-4 Contactinputbox"
                  name="contactName1"
                  value={values.contactName1}
                  onChange={handleChange("contactName1")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="emailId1">Email*</label>
                <input
                  type="text"
                  className="mb-4 Contactinputbox"
                  name="emailId1"
                  value={values.emailId1}
                  onChange={handleChange("emailId1")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="contactNumber1">Contact Number*</label>
                <input
                  type="number"
                  className="mb-4 Contactinputbox"
                  name="contactNumber1"
                  value={values.contactNumber1}
                  onChange={handleChange("contactNumber1")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor=" contactName2">Name</label>
                <input
                  type="text"
                  className="mb-4 Contactinputbox"
                  name="contactName2"
                  value={values.contactName2}
                  onChange={handleChange("contactName2")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="emailId2">Email</label>
                <input
                  type="text"
                  className="mb-4 Contactinputbox"
                  name="emailId2"
                  value={values.emailId2}
                  onChange={handleChange("emailId2")}
                />{" "}
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="contactNumber2">Contact Number</label>
                <input
                  type="number"
                  className="mb-4 Contactinputbox"
                  name="contactNumber2"
                  value={values.contactNumber2}
                  onChange={handleChange("contactNumber2")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor=" contactName3">Name</label>
                <input
                  type="text"
                  className="mb-4 Contactinputbox"
                  name="contactName3"
                  value={values.contactName3}
                  onChange={handleChange("contactName3")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="emailId3">Email</label>
                <input
                  type="text"
                  className="mb-4 Contactinputbox"
                  name="emailId3"
                  value={values.emailId3}
                  onChange={handleChange("emailId3")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="contactNumber3">Contact Number</label>
                <input
                  type="number"
                  className="mb-4 Contactinputbox"
                  name="contactNumber3"
                  value={values.contactNumber3}
                  onChange={handleChange("contactNumber3")}
                />
              </div>
            </div>
          </div>
          <div className="float-end">
            <button
              type="button"
              onClick={cancel}
              className="btn financialbtn btn-md m-3"
            >
              Cancel
            </button>
            {params.userId ? (
              <>
                <button
                  type="button"
                  onClick={updateContactTeam}
                  className="btn Contactbtn btn-md m-3"
                >
                  Update & Submit
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={saveContactTeam}
                  className="btn Contactbtn btn-md m-3"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default ContactTeam;
