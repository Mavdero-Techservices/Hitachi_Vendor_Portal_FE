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
// /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
const emailValidation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const desiredDomain = "hitachi-systems.com";
const groupEmailValidation = /^VND-APPV-[1-3]@hitachi-systems\.com$/;
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
    const newValue = event.target.value;
    setValues({ ...values, [name]: event.target.value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
    //  // Perform length validation for the specific field
    //  const newErrors = { ...errors };
    //  if (name === 'contactName1' && newValue.length > 30) {
    //    newErrors.contactName1 = 'contactName should be 30 characters or less.';
    //  } else {
    //    // If the length is valid, remove the error message for that field
    //    delete newErrors.contactName1;
    //  }

    //  // Update the errors state
    //  setErrors(newErrors);
  };

  const validateFormLength = () => {
    const {
      contactName1,
      emailId1,
      contactNumber1,
      emailId2,
      emailId3,
      contactName2,
      contactNumber2,
      contactName3,
      contactNumber3,
    } = values;

    const newErrors = {};
    if (contactName1 && contactName1.length > 30) {
      newErrors.contactName1 =
        "HSI Contact Name-1 should be 30 characters or less.";
    }
    if (contactName2 && contactName2.length > 30) {
      newErrors.contactName2 =
        "HSI Contact Name-2 should be 30 characters or less.";
    }
    if (contactName3 && contactName3.length > 30) {
      newErrors.contactName3 =
        "HSI Contact Name-3 should be 30 characters or less.";
    }
    if (emailId1 && emailId1.length > 50) {
      newErrors.emailId1 =
        "HSI Contact E-Mail-1 should be 50 characters or less.";
    }

    if (emailId2) {
      if (emailId2.length > 50) {
        newErrors.emailId2 =
          "HSI Contact E-Mail-2 should be 50 characters or less.";
      }
    }
    if (emailId3) {
      if (emailId3.length > 50) {
        newErrors.emailId3 =
          "HSI Contact E-Mail-3 should be 50 characters or less.";
      }
    }
    if (contactNumber1) {
      if (contactNumber1.length > 50) {
        newErrors.contactNumber1 =
          "HSI Contact No-1 should be 50 characters or less.";
      }
    }
    if (contactNumber2) {
      if (contactNumber2.length > 50) {
        newErrors.contactNumber2 =
          "HSI Contact No-2 should be 50 characters or less.";
      }
    }
    if (contactNumber3) {
      if (contactNumber3.length > 50) {
        newErrors.contactNumber3 =
          "HSI Contact No-3 should be 50 characters or less.";
      }
    }
    return newErrors;
  };

  const validateForm = () => {
    const {
      contactName1,
      emailId1,
      contactNumber1,
      emailId2,
      emailId3,
      contactName2,
      contactNumber2,
      contactName3,
      contactNumber3,
    } = values;

    const newErrors = {};
    if (!contactName1 || contactName1 === "") {
      newErrors.contactName1 = "contactName";
    }
    if (!emailId1 || emailId1 === "") {
      newErrors.emailId1 = "EmailId";
    }
    if (emailId1) {
      if (!new RegExp("@" + desiredDomain + "\\s*$").test(emailId1)) {
        newErrors.emailId1 =
          "PLEASE ENTER THE VALID HITACHI CONTACT PERSON EMAIL ID";
      }
    }
    if (emailId2) {
      if (!new RegExp("@" + desiredDomain + "\\s*$").test(emailId2)) {
        newErrors.emailId2 =
          "PLEASE ENTER THE VALID HITACHI CONTACT PERSON EMAIL ID";
      }
    }
    if (emailId3) {
      if (!new RegExp("@" + desiredDomain + "\\s*$").test(emailId3)) {
        newErrors.emailId3 =
          "PLEASE ENTER THE VALID HITACHI CONTACT PERSON EMAIL ID";
      }
    }
    // if (!groupEmailValidation.test(emailId1)) {
    //   newErrors.emailId1 = "Please enter a valid Email";
    // }

    if (!contactNumber1 || contactNumber1 === "") {
      newErrors.contactNumber1 = "contactNumber";
    }

    // if (
    //   !numberValidation.test(contactNumber1) ||
    //   contactNumber1.length !== 10
    // ) {
    //   newErrors.contactNumber1 = "Please enter a valid Phone Number";
    // }

    return newErrors;
  };
  const saveContactTeam = async (e) => {
    e.preventDefault();
    const formlengthErrors = validateFormLength();
    if (Object.keys(formlengthErrors).length > 0) {
      setErrors(formlengthErrors);
    } else {
      const formErrors = validateForm();
      var basicInfoArray = [];
      var basicInfoMandtatory = "";
      var communicationArray = [];
      var complianceArray = [];
      var statutoryArray = [];
      var bankDetailArray = [];
      var contactDetailArray = [];

      if (!basicInfo || !communicationDetail || !statutory) {
        console.log("not loaded yet");
      }
      if (basicInfo.length <= 0) {
        basicInfoArray.push("Address Line-1");
        basicInfoArray.push("City");
        basicInfoArray.push("companyName");
        basicInfoArray.push("country");
        basicInfoArray.push("pinCode");
        basicInfoArray.push("state");
      } else {
        Object.entries(basicInfo[0]).map(([key, value]) => {
          if (value === "" || value === null || value === undefined) {
            if (key === "Address") {
              basicInfoArray.push("Address Line-1");
            }
            if (key === "City") {
              basicInfoArray.push("City");
            }
            if (key === "companyName") {
              basicInfoArray.push("companyName");
            }
            if (key === "Country_Region_Code") {
              basicInfoArray.push("country");
            }
            if (key === "Post_Code") {
              basicInfoArray.push("pinCode");
            }
            if (key === "state") {
              basicInfoArray.push("state");
            }
          }
          // if (value && key === "Post_Code") {
          //   if (!numberValidation.test(value))
          //     basicInfoArray.push("Pincode is invalid");
          // }
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
        {
          let role = JSON.parse(window.sessionStorage.getItem("jwt")).result
            ?.usertype;
          if (role !== "NewRegistration") {
            communicationArray.push("mastervendor EmailId");
          }
        }
      } else {
        console.log("firstcheck::");
        Object.entries(communicationDetail[0]).map(([key, value]) => {
          if (value === "" || value === null || value === undefined) {
            console.log("emptyKey::", key);
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

            if (
              key === "mastervendor_email" &&
              JSON.parse(window.sessionStorage.getItem("jwt")).result
                ?.usertype !== "NewRegistration"
            ) {
              communicationArray.push("mastervendor EmailId");
            }
          }

          if (value && key === "financeSpocphoneNo") {
            if (!numberValidation.test(value))
              communicationArray.push("financeSpocphoneNo is invalid");
          }
          if (value && key === "managementSpocphoneNo") {
            if (!numberValidation.test(value))
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
              communicationArray.push("mastervendor Email is invalid");
          }
        });
      }
      if (statutory?.length <= 0) {
        if (
          basicInfo?.length > 0 &&
          basicInfo[0]?.Country_Region_Code &&
          basicInfo[0].Country_Region_Code === "IN"
        ) {
          statutoryArray.push("GST No");
          statutoryArray.push("PAN No");
          statutoryArray.push("CIN No");
          statutoryArray.push("MSME No");
          statutoryArray.push("GST Doc");
          if (
            JSON.parse(window.sessionStorage.getItem("jwt")).result
              ?.usertype !== "NewRegistration"
          ) {
            statutoryArray.push("PAN Doc");
          }
          statutoryArray.push("MSME Doc");
        } else {
          statutoryArray.push("form 10f");
          statutoryArray.push("No PE declaration");
          statutoryArray.push("Tax_residency_Doc");
          statutoryArray.push("GST No");
          statutoryArray.push("CIN No");
          statutoryArray.push("MSME No");
          statutoryArray.push("GST Doc");
          statutoryArray.push("MSME Doc");
        }
      } else {
        const hasError = {};
        let gstDoc5Pushed = false;
        let unregDocPushed = false;
        if (
          basicInfo?.length > 0 &&
          basicInfo[0]?.Country_Region_Code &&
          basicInfo[0].Country_Region_Code === "IN"
        ) {
          if (
            (statutory[0].MSME_Doc === "" || null) &&
            statutory[0].MSMED === "1"
          ) {
            statutoryArray.push("MSME Doc");
          }
          if (
            (statutory[0].MSMED_Number === "" || null) &&
            statutory[0].MSMED === "1"
          ) {
            statutoryArray.push("MSME No");
          }
          if (
            statutory[0].MSMED === "1" &&
            statutory[0].MSMED_Number === "N/A"
          ) {
            statutoryArray.push("MSME No is invalid");
          }

          if (
            (statutory[0].PAN_Doc === "" || null) &&
            statutory[0].GST_Vendor_Type === "Registered"
          ) {
            if (
              JSON.parse(window.sessionStorage.getItem("jwt")).result
                ?.usertype !== "NewRegistration"
            ) {
              statutoryArray.push("PAN Doc");
            }
          }
          if (
            (statutory[0].PAN_Doc === "" || null) &&
            statutory[0].GST_Vendor_Type === "UnRegistered"
          ) {
            if (
              JSON.parse(window.sessionStorage.getItem("jwt")).result
                ?.usertype !== "NewRegistration"
            ) {
              statutoryArray.push("PAN Doc");
            }
          }
          if (
            !gstDoc5Pushed &&
            (statutory[0].GST_Doc === "" ||
              statutory[0].GST_Doc === undefined ||
              statutory[0].GST_Doc === null) &&
            statutory[0].GST_Vendor_Type === "Registered"
          ) {
            console.log("Condition is true, pushing 'GST Doc5'");
            statutoryArray.push("GST Doc");
            gstDoc5Pushed = true;
          }
          if (
            !unregDocPushed &&
            (statutory[0].fileDisclosure === "" || null) &&
            statutory[0].GST_Vendor_Type === "UnRegistered"
          ) {
            statutoryArray.push("UnRegistered GST Doc");
            unregDocPushed = true;
          }
          Object.entries(statutory[0]).map(([key, value]) => {
            if (value === "" || value === null || value === undefined) {
              console.log("emptykeys::", key);
              if (key === "GST_Registration_No") {
                statutoryArray.push("GST No");
              }
              if (key === "P_A_N_No") {
                statutoryArray.push("PAN No");
              }
              if (key === "CIN_No") {
                statutoryArray.push("CIN No");
              }
              // if (key === "MSMED_Number") {
              //   statutoryArray.push("MSME No4");
              // }
              // if (key === "GST_Doc") {
              //   statutoryArray.push("GST Doc");
              // }
              // if (key === "PAN_Doc") {
              //   statutoryArray.push("PAN Doc");
              // }
              // if (key === "MSME_Doc") {
              //   statutoryArray.push("MSME Doc");
              // }
            }

            if (
              key === "GST_Registration_No" &&
              value !== undefined &&
              value !== "undefined" &&
              value.trim() !== "" &&
              value !== "N/A" &&
              value !== "null"
            ) {
              if (!GSTValidation.test(value)) {
                statutoryArray.push("GST No is invalid");
              }
            }
            if (
              statutory[0].GST_Vendor_Type === "Registered" &&
              key === "GST_Registration_No" &&
              value === "N/A"
            ) {
              if (!GSTValidation.test(value)) {
                statutoryArray.push("GST No is invalid");
              }
            }

            if (
              key === "P_A_N_No" &&
              value.trim() !== "" &&
              value !== "N/A" &&
              value !== "null"
            ) {
              if (!PANValidation.test(value))
                statutoryArray.push("PAN NO is invalid");
            }
            if (
              basicInfo[0]?.Country_Region_Code &&
              basicInfo[0]?.Country_Region_Code === "IN" &&
              statutory[0].GST_Vendor_Type === "Registered" &&
              key === "P_A_N_No" &&
              value === "N/A"
            ) {
              statutoryArray.push("PAN NO is invalid");
            }
            if (
              basicInfo[0]?.Country_Region_Code &&
              basicInfo[0]?.Country_Region_Code === "IN" &&
              statutory[0].GST_Vendor_Type === "UnRegistered" &&
              key === "P_A_N_No" &&
              value === "N/A"
            ) {
              statutoryArray.push("PAN NO is invalid");
            }
          });
        } else {
          const hasError = {};
          let gstDoc5Pushed = false;
          let unregDocPushed = false;
          if (
            (statutory[0].MSME_Doc === "" || null) &&
            statutory[0].MSMED === "1"
          ) {
            statutoryArray.push("MSME Doc");
          }
          if (
            (statutory[0].MSMED_Number === "" || null) &&
            statutory[0].MSMED === "1"
          ) {
            statutoryArray.push("MSME No");
          }

          if (
            statutory[0].MSMED === "1" &&
            statutory[0].MSMED_Number === "N/A"
          ) {
            statutoryArray.push("MSME No is invalid");
          }

          if (
            (statutory[0].PAN_Doc === "" || null) &&
            statutory[0].GST_Vendor_Type !== "Import" &&
            basicInfo[0]?.Country_Region_Code &&
            basicInfo[0]?.Country_Region_Code === "IN"
          ) {
            if (
              JSON.parse(window.sessionStorage.getItem("jwt")).result
                ?.usertype !== "NewRegistration"
            ) {
              statutoryArray.push("PAN Doc");
            }
          }

          if (
            !gstDoc5Pushed &&
            (statutory[0].GST_Doc === "" ||
              statutory[0].GST_Doc === undefined ||
              statutory[0].GST_Doc === null) &&
            statutory[0].GST_Vendor_Type === "Registered"
          ) {
            console.log("Condition is true, pushing 'GST Doc5'");
            statutoryArray.push("GST Doc");
            gstDoc5Pushed = true;
          }
          if (
            !unregDocPushed &&
            (statutory[0].fileDisclosure === "" || null) &&
            statutory[0].GST_Vendor_Type === "UnRegistered"
          ) {
            statutoryArray.push("UnRegistered GST Doc");
            unregDocPushed = true;
          }
          Object.entries(statutory[0]).map(([key, value]) => {
            console.log("valuekey::", key);
            if (
              value === "" ||
              value === null ||
              value === undefined ||
              value === "undefined"
            ) {
              if (key === "form_10f_Doc" && JSON.parse(window.sessionStorage.getItem("jwt")).result.role !=="Admin") {
                statutoryArray.push("form 10f");
              }
              if (key === "PE_Declaration_Doc"&& JSON.parse(window.sessionStorage.getItem("jwt")).result.role !=="Admin") {
                statutoryArray.push("No PE declaration");
              }
              if (key === "Tax_residency_Doc"&& JSON.parse(window.sessionStorage.getItem("jwt")).result.role !=="Admin") {
                statutoryArray.push("Tax Residency Certificate");
              }
              if (key === "GST_Registration_No") {
                statutoryArray.push("GST No");
              }
              if (key === "CIN_No") {
                statutoryArray.push("CIN No");
              }
              if (key === "MSMED_Number") {
                statutoryArray.push("MSME No");
              }
              // if (key === "GST_Doc") {
              //   statutoryArray.push("GST Doc");
              // }
              // if (key === "MSME_Doc") {
              //   statutoryArray.push("MSME Doc");
              // }
            }
            if (
              key === "GST_Registration_No" &&
              value !== undefined &&
              value !== "undefined" &&
              value.trim() !== "" &&
              value !== "N/A" &&
              value !== "null"
            ) {
              if (!GSTValidation.test(value)) {
                statutoryArray.push("GST No is invalid");
              }
            }
            if (
              statutory[0].GST_Vendor_Type === "Registered" &&
              key === "GST_Registration_No" &&
              value === "N/A"
            ) {
              if (!GSTValidation.test(value)) {
                statutoryArray.push("GST No is invalid");
              }
            }

            if (
              key === "P_A_N_No" &&
              value.trim() !== "" &&
              value !== "N/A" &&
              value !== "null"
            ) {
              if (!PANValidation.test(value))
                statutoryArray.push("PAN NO is invalid");
            }
            if (
              basicInfo[0]?.Country_Region_Code &&
              basicInfo[0]?.Country_Region_Code === "IN" &&
              statutory[0].GST_Vendor_Type === "Registered" &&
              key === "P_A_N_No" &&
              value === "N/A"
            ) {
              statutoryArray.push("PAN NO is invalid");
            }
            if (
              basicInfo[0]?.Country_Region_Code &&
              basicInfo[0]?.Country_Region_Code === "IN" &&
              statutory[0].GST_Vendor_Type === "UnRegistered" &&
              key === "P_A_N_No" &&
              value === "N/A"
            ) {
              statutoryArray.push("PAN NO is invalid");
            }
          });
        }
      }
      if (compaliance.length <= 0) {
        complianceArray.push("Related Party Disclosure");
        complianceArray.push("COC for services support/installation");
        complianceArray.push("Non-disclosure agreement");
      } else {
        Object.entries(compaliance[0]).map(([key, value]) => {
          if (value === "" || value === null || value === undefined) {
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
        bankDetailArray.push("Branch Address");
      } else {
        Object.entries(bankDetail[0]).map(([key, value]) => {
          if (value === "" || value === null || value === undefined) {
            if (key === "Account_Holder_Name") {
              bankDetailArray.push("Bank Account Name");
            }
            if (key === "Bank_Name") {
              bankDetailArray.push("Bank Name");
            }
            if (key === "Account_No") {
              bankDetailArray.push("Bank AccountNumber");
            }
            if (key === "IFSC_Code") {
              bankDetailArray.push("IFSC Code");
            }
            if (key === "MICRcode") {
              bankDetailArray.push("MICR Code");
            }
            if (key === "bankdetailDoc") {
              bankDetailArray.push("Bank Detail Document");
            }
            if (key === "Bank_Address") {
              bankDetailArray.push("Branch Address");
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

      // if (basicInfoArray.length <= 0) {
      //   basicInfoArray.push("There are no blank or incomplete required fields");
      // }
      // if (communicationArray.length <= 0) {
      //   communicationArray.push(
      //     "There are no blank or incomplete required fields"
      //   );
      // }
      // if (statutoryArray.length <= 0) {
      //   statutoryArray.push("There are no blank or incomplete required fields");
      // }
      // if (complianceArray.length <= 0) {
      //   complianceArray.push("There are no blank or incomplete required fields");
      // }
      // if (bankDetailArray.length <= 0) {
      //   bankDetailArray.push("There are no blank or incomplete required fields");
      // }
      // if (contactDetailArray.length <= 0) {
      //   contactDetailArray.push(
      //     "There are no blank or incomplete required fields"
      //   );
      // }

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
        Ticket_ID: JSON.parse(window.sessionStorage.getItem("jwt")).result
          .Ticket_ID2
          ? JSON.parse(window.sessionStorage.getItem("jwt")).result.Ticket_ID2
          : JSON.parse(window.sessionStorage.getItem("jwt")).result.Ticket_ID,
      };
      if (params.userId) {
        apiService.updateContactTeam(params.userId, user).then((response) => {
          if (response.data.status === "success") {
            navigate(`/ContactTeam/${params.userId}`);
            let userkey = params.userId;
            if (
              basicInfoArray.length <= 0 &&
              communicationArray.length <= 0 &&
              statutoryArray.length <= 0 &&
              complianceArray.length <= 0 &&
              bankDetailArray.length <= 0 &&
              contactDetailArray.length <= 0
            ) {
              basicInfo[0].submitStatus = "Submitted";
              basicInfo[0].submitDate = Date.now();
              apiService
                .updateVendordetail(userkey, basicInfo[0])
                .then((response) => {
                  Swal.fire({
                    title:
                      "Your data has been successfully submitted to Hitachi Team and you will receive an email about the status update.",
                    confirmButtonText: "Yes",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      if (
                        JSON.parse(window.sessionStorage.getItem("jwt")).result
                          ?.usertype === "NewRegistration"
                      ) {
                        let item = JSON.parse(
                          window.sessionStorage.getItem("jwt")
                        );
                        item.result.userId = JSON.parse(
                          window.sessionStorage.getItem("jwt")
                        ).result.userId2;
                        item.result.userId2 = JSON.parse(
                          window.sessionStorage.getItem("jwt")
                        ).result.userId;
                        delete item.result.userId2;
                        delete item.result.usertype;
                        delete item.result.Ticket_ID2;
                        console.log(
                          "new user response------------>>>",
                          item.result
                        );
                        sessionStorage.setItem("jwt", JSON.stringify(item));
                        navigate("/userCreation");
                      } else {
                        setStyle("notEditable");
                      }
                    }
                  });
                });
            } else {
              function hasItems(array) {
                return Array.isArray(array) && array.length > 0;
              }

              // Construct the content for the Swal.fire based on the arrays
              let htmlContent = `
                <div style="text-align: justify;height: 400px; overflow-y: auto;">
              `;

              if (hasItems(basicInfoArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">VENDOR DETAIL-BASIC INFORMATION:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${basicInfoArray.map((item) => `<li>${item}</li>`).join("")}
                    ${basicInfoMandtatory}
                  </ol><br>
                `;
              }

              if (hasItems(communicationArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">VENDOR DETAIL-COMMUNICATION DETAIL:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${communicationArray
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ol><br>
                `;
              }

              if (hasItems(statutoryArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">STATUTORY DETAIL:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${statutoryArray.map((item) => `<li>${item}</li>`).join("")}
                  </ol><br>
                `;
              }

              if (hasItems(complianceArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">COMPLIANCE DETAIL:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${complianceArray
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ol><br>
                `;
              }

              if (hasItems(bankDetailArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">BANK DETAIL:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${bankDetailArray
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ol><br>
                `;
              }

              if (hasItems(contactDetailArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">CONTACT DETAIL:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${contactDetailArray
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ol><br>
                `;
              }

              htmlContent += `
                </div>
              `;

              // Show the Swal.fire dialog
              Swal.fire({
                title: "Please complete this field.",
                html: htmlContent,
                padding: "3px",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
              });
              // Swal.fire({
              //   title: "Please complete this field.",
              //   html: `
              //     <div style="text-align: justify;height: 400px; overflow-y: auto;">
              //       <b style="margin-bottom: 10px;">VENDOR DETAIL-BASIC INFORMATION:</b><br>
              //       <ol style="list-style-type: decimal;">
              //         ${basicInfoArray.map((item) => `<li>${item}</li>`).join("")}
              //         ${basicInfoMandtatory}
              //       </ol><br>

              //       <b style="margin-bottom: 10px;">VENDOR DETAIL-COMMUNICATION DETAIL:</b><br>
              //       <ol style="list-style-type: decimal;">
              //         ${communicationArray.map((item) => `<li>${item}</li>`).join("")}
              //       </ol><br>

              //       <b style="margin-bottom: 10px;">STATUTORY DETAIL:</b><br>
              //       <ol style="list-style-type: decimal;">
              //         ${statutoryArray.map((item) => `<li>${item}</li>`).join("")}
              //       </ol><br>

              //       <b style="margin-bottom: 10px;">COMPLIANCE DETAIL:</b><br>
              //       <ol style="list-style-type: decimal;">
              //         ${complianceArray.map((item) => `<li>${item}</li>`).join("")}
              //       </ol><br>

              //       <b style="margin-bottom: 10px;">BANK DETAIL:</b><br>
              //       <ol style="list-style-type: decimal;">
              //         ${bankDetailArray.map((item) => `<li>${item}</li>`).join("")}
              //       </ol><br>

              //       <b style="margin-bottom: 10px;">CONTACT DETAIL:</b><br>
              //       <ol style="list-style-type: decimal;">
              //         ${contactDetailArray.map((item) => `<li>${item}</li>`).join("")}
              //       </ol><br>
              //     </div>
              //   `,
              //   padding: "3px",
              //   icon: "warning",
              //   confirmButtonColor: "#3085d6",
              //   confirmButtonText: "OK",
              //   showCloseButton: true,
              //   allowOutsideClick: false,
              //   allowEscapeKey: false,
              // });
            }
          }
        });
      } else {
        let newuser = JSON.parse(
          window.sessionStorage.getItem("newregUser")
        )?.newregUser;
        if (newuser) {
          user.userId = newuser;
          apiService.saveContactTeam(user).then((response) => {
            if (response.data.status === "success") {
              // let userkey = JSON.parse(window.sessionStorage.getItem("jwt")).result
              //   .userId;
              if (
                basicInfoArray.length <= 0 &&
                communicationArray.length <= 0 &&
                statutoryArray.length <= 0 &&
                complianceArray.length <= 0 &&
                bankDetailArray.length <= 0 &&
                contactDetailArray.length <= 0
              ) {
                basicInfo[0].submitStatus = "Submitted";
                basicInfo[0].submitDate = Date.now();
                apiService
                  .updateVendordetail(newuser, basicInfo[0])
                  .then((response) => {
                    Swal.fire({
                      title:
                        "Your data has been successfully submitted to Hitachi Team and you will receive an email about the status update.",
                      confirmButtonText: "Yes",
                    }).then((result) => {
                      let id = JSON.parse(
                        window.sessionStorage.getItem("newregUser")
                      )?.newregUser;
                      if (id) {
                        sessionStorage.removeItem("newregUser");
                      }
                      if (result.isConfirmed) {
                        if (
                          JSON.parse(window.sessionStorage.getItem("jwt"))
                            .result?.usertype === "NewRegistration"
                        ) {
                          let item = JSON.parse(
                            window.sessionStorage.getItem("jwt")
                          );
                          item.result.userId = JSON.parse(
                            window.sessionStorage.getItem("jwt")
                          ).result.userId2;
                          item.result.userId2 = JSON.parse(
                            window.sessionStorage.getItem("jwt")
                          ).result.userId;
                          delete item.result.userId2;
                          delete item.result.usertype;
                          delete item.result.Ticket_ID2;
                          console.log(
                            "new user response------------>>>",
                            item.result
                          );
                          sessionStorage.setItem("jwt", JSON.stringify(item));
                          navigate("/userCreation");
                        } else {
                          navigate("/userCreation");
                        }
                      }
                    });
                  });
              } else {
                function hasItems(array) {
                  return Array.isArray(array) && array.length > 0;
                }

                // Construct the content for the Swal.fire based on the arrays
                let htmlContent = `
                  <div style="text-align: justify;height: 400px; overflow-y: auto;">
                `;

                if (hasItems(basicInfoArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">VENDOR DETAIL-BASIC INFORMATION:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${basicInfoArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                      ${basicInfoMandtatory}
                    </ol><br>
                  `;
                }

                if (hasItems(communicationArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">VENDOR DETAIL-COMMUNICATION DETAIL:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${communicationArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                    </ol><br>
                  `;
                }

                if (hasItems(statutoryArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">STATUTORY DETAIL:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${statutoryArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                    </ol><br>
                  `;
                }

                if (hasItems(complianceArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">COMPLIANCE DETAIL:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${complianceArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                    </ol><br>
                  `;
                }

                if (hasItems(bankDetailArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">BANK DETAIL:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${bankDetailArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                    </ol><br>
                  `;
                }

                if (hasItems(contactDetailArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">CONTACT DETAIL:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${contactDetailArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                    </ol><br>
                  `;
                }

                htmlContent += `
                  </div>
                `;

                // Show the Swal.fire dialog
                Swal.fire({
                  title: "Please complete this field.",
                  html: htmlContent,
                  padding: "3px",
                  icon: "warning",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "OK",
                  showCloseButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                });
                // Swal.fire({
                //   title: "Please complete this field.",
                //   html: `
                //     <div style="text-align: justify;height: 400px; overflow-y: auto;">
                //       <b style="margin-bottom: 10px;">VENDOR DETAIL-BASIC INFORMATION:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${basicInfoArray.map((item) => `<li>${item}</li>`).join("")}
                //         ${basicInfoMandtatory}
                //       </ol><br>

                //       <b style="margin-bottom: 10px;">VENDOR DETAIL-COMMUNICATION DETAIL:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${communicationArray.map((item) => `<li>${item}</li>`).join("")}
                //       </ol><br>

                //       <b style="margin-bottom: 10px;">STATUTORY DETAIL:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${statutoryArray.map((item) => `<li>${item}</li>`).join("")}
                //       </ol><br>

                //       <b style="margin-bottom: 10px;">COMPLIANCE DETAIL:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${complianceArray.map((item) => `<li>${item}</li>`).join("")}
                //       </ol><br>

                //       <b style="margin-bottom: 10px;">BANK DETAIL:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${bankDetailArray.map((item) => `<li>${item}</li>`).join("")}
                //       </ol><br>

                //       <b style="margin-bottom: 10px;">CONTACT DETAIL:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${contactDetailArray.map((item) => `<li>${item}</li>`).join("")}
                //       </ol><br>
                //     </div>
                //   `,
                //   padding: "3px",
                //   icon: "warning",
                //   confirmButtonColor: "#3085d6",
                //   confirmButtonText: "OK",
                //   showCloseButton: true,
                //   allowOutsideClick: false,
                //   allowEscapeKey: false,
                // });
              }
            }
          });
        } else {
          apiService.saveContactTeam(user).then((response) => {
            if (response.data.status === "success") {
              let userkey = JSON.parse(window.sessionStorage.getItem("jwt"))
                .result.userId;
              if (
                basicInfoArray.length <= 0 &&
                communicationArray.length <= 0 &&
                statutoryArray.length <= 0 &&
                complianceArray.length <= 0 &&
                bankDetailArray.length <= 0 &&
                contactDetailArray.length <= 0
              ) {
                basicInfo[0].submitStatus = "Submitted";
                basicInfo[0].submitDate = Date.now();
                apiService
                  .updateVendordetail(userkey, basicInfo[0])
                  .then((response) => {
                    Swal.fire({
                      title:
                        "Your data has been successfully submitted to Hitachi Team and you will receive an email about the status update.",
                      confirmButtonText: "Yes",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        if (
                          JSON.parse(window.sessionStorage.getItem("jwt"))
                            .result?.usertype === "NewRegistration"
                        ) {
                          let item = JSON.parse(
                            window.sessionStorage.getItem("jwt")
                          );
                          item.result.userId = JSON.parse(
                            window.sessionStorage.getItem("jwt")
                          ).result.userId2;
                          item.result.userId2 = JSON.parse(
                            window.sessionStorage.getItem("jwt")
                          ).result.userId;
                          delete item.result.userId2;
                          delete item.result.usertype;
                          delete item.result.Ticket_ID2;
                          console.log(
                            "new user response------------>>>",
                            item.result
                          );
                          sessionStorage.setItem("jwt", JSON.stringify(item));
                          navigate("/userCreation");
                        }
                      }
                    });
                  });
              } else {
                function hasItems(array) {
                  return Array.isArray(array) && array.length > 0;
                }

                // Construct the content for the Swal.fire based on the arrays
                let htmlContent = `
                  <div style="text-align: justify;height: 400px; overflow-y: auto;">
                `;

                if (hasItems(basicInfoArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">VENDOR DETAIL-BASIC INFORMATION:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${basicInfoArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                      ${basicInfoMandtatory}
                    </ol><br>
                  `;
                }

                if (hasItems(communicationArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">VENDOR DETAIL-COMMUNICATION DETAIL:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${communicationArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                    </ol><br>
                  `;
                }

                if (hasItems(statutoryArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">STATUTORY DETAIL:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${statutoryArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                    </ol><br>
                  `;
                }

                if (hasItems(complianceArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">COMPLIANCE DETAIL:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${complianceArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                    </ol><br>
                  `;
                }

                if (hasItems(bankDetailArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">BANK DETAIL:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${bankDetailArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                    </ol><br>
                  `;
                }

                if (hasItems(contactDetailArray)) {
                  htmlContent += `
                    <b style="margin-bottom: 10px;">CONTACT DETAIL:</b><br>
                    <ol style="list-style-type: decimal;">
                      ${contactDetailArray
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                    </ol><br>
                  `;
                }

                htmlContent += `
                  </div>
                `;

                // Show the Swal.fire dialog
                Swal.fire({
                  title: "Please complete this field.",
                  html: htmlContent,
                  padding: "3px",
                  icon: "warning",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "OK",
                  showCloseButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                });
                // Swal.fire({
                //   title: "Please complete this field.",
                //   html: `
                //     <div style="text-align: justify;height: 400px; overflow-y: auto;">
                //       <b style="margin-bottom: 10px;">VENDOR DETAIL-BASIC INFORMATION:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${basicInfoArray.map((item) => `<li>${item}</li>`).join("")}
                //         ${basicInfoMandtatory}
                //       </ol><br>

                //       <b style="margin-bottom: 10px;">VENDOR DETAIL-COMMUNICATION DETAIL:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${communicationArray.map((item) => `<li>${item}</li>`).join("")}
                //       </ol><br>

                //       <b style="margin-bottom: 10px;">STATUTORY DETAIL:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${statutoryArray.map((item) => `<li>${item}</li>`).join("")}
                //       </ol><br>

                //       <b style="margin-bottom: 10px;">COMPLIANCE DETAIL:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${complianceArray.map((item) => `<li>${item}</li>`).join("")}
                //       </ol><br>

                //       <b style="margin-bottom: 10px;">BANK DETAIL:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${bankDetailArray.map((item) => `<li>${item}</li>`).join("")}
                //       </ol><br>

                //       <b style="margin-bottom: 10px;">CONTACT DETAIL:</b><br>
                //       <ol style="list-style-type: decimal;">
                //         ${contactDetailArray.map((item) => `<li>${item}</li>`).join("")}
                //       </ol><br>
                //     </div>
                //   `,
                //   padding: "3px",
                //   icon: "warning",
                //   confirmButtonColor: "#3085d6",
                //   confirmButtonText: "OK",
                //   showCloseButton: true,
                //   allowOutsideClick: false,
                //   allowEscapeKey: false,
                // });
              }
            }
          });
        }
      }
    }
  };
  const updateContactTeam = (e) => {
    e.preventDefault();
    const formlengthErrors = validateFormLength();
    if (Object.keys(formlengthErrors).length > 0) {
      setErrors(formlengthErrors);
    } else {
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
        basicInfoArray.push("City");
        basicInfoArray.push("companyName");
        basicInfoArray.push("country");
        basicInfoArray.push("pinCode");
        basicInfoArray.push("state");
      } else {
        Object.entries(basicInfo[0]).map(([key, value]) => {
          if (value === "" || value === null || value === undefined) {
            if (key === "Address") {
              basicInfoArray.push("Address Line-1");
            }
            if (key === "City") {
              basicInfoArray.push("City");
            }
            if (key === "companyName") {
              basicInfoArray.push("companyName");
            }
            if (key === "Country_Region_Code") {
              basicInfoArray.push("country");
            }
            if (key === "Post_Code") {
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
        if (
          JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype !==
          "NewRegistration"
        ) {
          communicationArray.push("mastervendor EmailId");
        }
      } else {
        console.log("secondCheck:");
        Object.entries(communicationDetail[0]).map(([key, value]) => {
          if (value === "" || value === null || value === undefined) {
            console.log("emptyKey::", key);
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

            if (
              key === "mastervendor_email" &&
              JSON.parse(window.sessionStorage.getItem("jwt")).result
                ?.usertype !== "NewRegistration"
            ) {
              communicationArray.push("mastervendor EmailId");
            }
          }

          if (value && key === "financeSpocphoneNo") {
            if (!numberValidation.test(value))
              communicationArray.push("financeSpocphoneNo is invalid");
          }
          if (value && key === "managementSpocphoneNo") {
            if (!numberValidation.test(value))
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
              communicationArray.push("mastervendor Email is invalid");
          }
        });
        // Object.entries(communicationDetail[0]).map(([key, value]) => {
        //   if (value === "" || value === null || value === undefined) {
        //     if (key === "financeSpoccontactName") {
        //       communicationArray.push("financeSpoc-contactName");
        //     }
        //     if (key === "financeSpocdesignation") {
        //       communicationArray.push("financeSpoc-designation");
        //     }
        //     if (key === "financeSpocphoneNo") {
        //       communicationArray.push("financeSpoc-phoneNo");
        //     }
        //     if (key === "financeSpocemail") {
        //       communicationArray.push("financeSpoc-Email");
        //     }

        //     if (key === "managementSpoccontactName") {
        //       communicationArray.push("managementSpoc-contactName");
        //     }
        //     if (key === "managementSpocdesignation") {
        //       communicationArray.push("managementSpoc-designation");
        //     }
        //     if (key === "managementSpocphoneNo") {
        //       communicationArray.push("managementSpoc-phoneNo");
        //     }
        //     if (key === "managementSpocemail") {
        //       communicationArray.push("managementSpoc-Email");
        //     }
        //     if (key === "mastervendor_email" && JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype !== 'NewRegistration') {
        //       communicationArray.push("mastervendor EmailId");
        //     }
        //   }
        // });
      }
      if (statutory.length <= 0) {
        if (
          basicInfo?.length > 0 &&
          basicInfo[0]?.Country_Region_Code &&
          basicInfo[0]?.Country_Region_Code === "IN"
        ) {
          statutoryArray.push("GST No");
          statutoryArray.push("PAN No");
          statutoryArray.push("CIN No");
          statutoryArray.push("MSME No");
          statutoryArray.push("GST Doc");
          if (
            JSON.parse(window.sessionStorage.getItem("jwt")).result
              ?.usertype !== "NewRegistration"
          ) {
            statutoryArray.push("PAN Doc");
          }
          statutoryArray.push("MSME Doc");
        } else {
          statutoryArray.push("form 10f");
          statutoryArray.push("No PE declaration");
          statutoryArray.push("Tax_residency_Doc");
          statutoryArray.push("GST No");
          statutoryArray.push("CIN No");
          statutoryArray.push("MSME No");
          statutoryArray.push("GST Doc");
          statutoryArray.push("MSME Doc");
        }
      } else {
        const hasError = {};
        let gstDoc5Pushed = false;
        let unregDocPushed = false;
        if (
          basicInfo?.length > 0 &&
          basicInfo[0]?.Country_Region_Code &&
          basicInfo[0]?.Country_Region_Code === "IN"
        ) {
          Object.entries(statutory[0]).map(([key, value]) => {
            if (
              value === "" ||
              value === null ||
              value === undefined ||
              value === "undefined"
            ) {
              if (key === "GST_Registration_No") {
                statutoryArray.push("GST No");
              }
              if (key === "P_A_N_No") {
                statutoryArray.push("PAN No");
              }
              if (key === "CIN_No") {
                statutoryArray.push("CIN No");
              }
              if (key === "MSMED_Number") {
                statutoryArray.push("MSME No");
              }
              if (
                !gstDoc5Pushed &&
                (statutory[0].GST_Doc === "" ||
                  statutory[0].GST_Doc === undefined ||
                  statutory[0].GST_Doc === null) &&
                statutory[0].GST_Vendor_Type === "Registered"
              ) {
                console.log("Condition is true, pushing 'GST Doc5'");
                statutoryArray.push("GST Doc");
                gstDoc5Pushed = true;
              }
              if (
                !unregDocPushed &&
                (statutory[0].fileDisclosure === "" || null) &&
                statutory[0].GST_Vendor_Type === "UnRegistered"
              ) {
                statutoryArray.push("UnRegistered GST Doc");
                unregDocPushed = true;
              }
              // if (key === "GST_Doc") {
              //   statutoryArray.push("GST Doc");
              // }

              if (key === "PAN_Doc") {
                if (
                  JSON.parse(window.sessionStorage.getItem("jwt")).result
                    ?.usertype !== "NewRegistration"
                ) {
                  statutoryArray.push("PAN Doc");
                }
              }
              if (
                (statutory[0].MSME_Doc === "" || null) &&
                statutory[0].MSMED === "1"
              ) {
                statutoryArray.push("MSME Doc");
              }
            }

            if (
              key === "GST_Registration_No" &&
              value !== undefined &&
              value !== "undefined" &&
              value.trim() !== "" &&
              value !== "N/A" &&
              value !== "null"
            ) {
              if (!GSTValidation.test(value)) {
                statutoryArray.push("GST No is invalid");
              }
            }
            if (
              statutory[0].GST_Vendor_Type === "Registered" &&
              key === "GST_Registration_No" &&
              value === "N/A"
            ) {
              if (!GSTValidation.test(value)) {
                statutoryArray.push("GST No is invalid");
              }
            }

            if (
              key === "P_A_N_No" &&
              value.trim() !== "" &&
              value !== "N/A" &&
              value !== "null"
            ) {
              if (!PANValidation.test(value))
                statutoryArray.push("PAN NO is invalid");
            }
            if (
              basicInfo[0]?.Country_Region_Code &&
              basicInfo[0]?.Country_Region_Code === "IN" &&
              statutory[0].GST_Vendor_Type === "Registered" &&
              key === "P_A_N_No" &&
              value === "N/A"
            ) {
              statutoryArray.push("PAN NO is invalid");
            }
            if (
              basicInfo[0]?.Country_Region_Code &&
              basicInfo[0]?.Country_Region_Code === "IN" &&
              statutory[0].GST_Vendor_Type === "UnRegistered" &&
              key === "P_A_N_No" &&
              value === "N/A"
            ) {
              statutoryArray.push("PAN NO is invalid");
            }
          });
        } else {
          const hasError = {};
          let gstDoc5Pushed = false;
          let unregDocPushed = false;
          Object.entries(statutory[0]).map(([key, value]) => {
            if (value === "" || value === null || value === undefined) {
              if (key === "form_10f_Doc") {
                statutoryArray.push("form 10f");
              }
              if (key === "PE_Declaration_Doc") {
                statutoryArray.push("No PE declaration");
              }
              if (key === "Tax_residency_Doc") {
                statutoryArray.push("Tax Residency Certificate");
              }
              if (key === "GST_Registration_No") {
                statutoryArray.push("GST No");
              }
              if (key === "CIN_No") {
                statutoryArray.push("CIN No");
              }
              if (key === "MSMED_Number") {
                statutoryArray.push("MSME No");
              }
              if (
                !gstDoc5Pushed &&
                (statutory[0].GST_Doc === "" ||
                  statutory[0].GST_Doc === undefined ||
                  statutory[0].GST_Doc === null) &&
                statutory[0].GST_Vendor_Type === "Registered"
              ) {
                console.log("Condition is true, pushing 'GST Doc5'");
                statutoryArray.push("GST Doc");
                gstDoc5Pushed = true;
              }
              if (
                !unregDocPushed &&
                (statutory[0].fileDisclosure === "" || null) &&
                statutory[0].GST_Vendor_Type === "UnRegistered"
              ) {
                statutoryArray.push("UnRegistered GST Doc");
                unregDocPushed = true;
              }
              if (
                (statutory[0].MSME_Doc === "" || null) &&
                statutory[0].MSMED === "1"
              ) {
                statutoryArray.push("MSME Doc");
              }
            }
            if (
              key === "GST_Registration_No" &&
              value !== undefined &&
              value !== "undefined" &&
              value.trim() !== "" &&
              value !== "N/A" &&
              value !== "null"
              
            ) {
              if (!GSTValidation.test(value)) {
                statutoryArray.push("GST No is invalid");
              }
            }
            if (
              statutory[0].GST_Vendor_Type === "Registered" &&
              key === "GST_Registration_No" &&
              value === "N/A"
            ) {
              if (!GSTValidation.test(value)) {
                statutoryArray.push("GST No is invalid");
              }
            }

            if (
              key === "P_A_N_No" &&
              value.trim() !== "" &&
              value !== "N/A" &&
              value !== "null"
            ) {
              if (!PANValidation.test(value))
                statutoryArray.push("PAN NO is invalid");
            }
            if (
              basicInfo[0]?.Country_Region_Code &&
              basicInfo[0]?.Country_Region_Code === "IN" &&
              statutory[0].GST_Vendor_Type === "Registered" &&
              key === "P_A_N_No" &&
              value === "N/A"
            ) {
              statutoryArray.push("PAN NO is invalid");
            }
            if (
              basicInfo[0]?.Country_Region_Code &&
              basicInfo[0]?.Country_Region_Code === "IN" &&
              statutory[0].GST_Vendor_Type === "UnRegistered" &&
              key === "P_A_N_No" &&
              value === "N/A"
            ) {
              statutoryArray.push("PAN NO is invalid");
            }
          });
        }
      }
      if (compaliance.length <= 0) {
        complianceArray.push("Related Party Disclosure");
        complianceArray.push("COC for services support/installation");
        complianceArray.push("Non-disclosure agreement");
      } else {
        Object.entries(compaliance[0]).map(([key, value]) => {
          if (value === "" || value === null || value === undefined) {
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
        bankDetailArray.push("Branch Address");
      } else {
        Object.entries(bankDetail[0]).map(([key, value]) => {
          if (value === "" || value === null || value === undefined) {
            if (key === "Account_Holder_Name") {
              bankDetailArray.push("Bank Account Name");
            }
            if (key === "Bank_Name") {
              bankDetailArray.push("Bank Name");
            }
            if (key === "Account_No") {
              bankDetailArray.push("Bank AccountNumber");
            }
            if (key === "IFSC_Code") {
              bankDetailArray.push("IFSC Code");
            }
            if (key === "MICRcode") {
              bankDetailArray.push("MICR Code");
            }
            if (key === "bankdetailDoc") {
              bankDetailArray.push("Bank Detail Document");
            }
            if (key === "Bank_Address") {
              bankDetailArray.push("Branch Address");
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

      // if (basicInfoArray.length <= 0) {
      //   basicInfoArray.push("There are no blank or incomplete required fields");
      // }
      // if (communicationArray.length <= 0) {
      //   communicationArray.push(
      //     "There are no blank or incomplete required fields"
      //   );
      // }
      // if (statutoryArray.length <= 0) {
      //   statutoryArray.push("There are no blank or incomplete required fields");
      // }
      // if (complianceArray.length <= 0) {
      //   complianceArray.push("There are no blank or incomplete required fields");
      // }
      // if (bankDetailArray.length <= 0) {
      //   bankDetailArray.push("There are no blank or incomplete required fields");
      // }
      // if (contactDetailArray.length <= 0) {
      //   contactDetailArray.push(
      //     "There are no blank or incomplete required fields"
      //   );
      // }

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
        Ticket_ID: JSON.parse(window.sessionStorage.getItem("jwt")).result
          .Ticket_ID2
          ? JSON.parse(window.sessionStorage.getItem("jwt")).result.Ticket_ID2
          : JSON.parse(window.sessionStorage.getItem("jwt")).result.Ticket_ID,
      };
      if (params.userId) {
        apiService.updateContactTeam(params.userId, user).then((response) => {
          if (response.data.status === "success") {
            navigate(`/ContactTeam/${params.userId}`);
            let userkey = params.userId;
            if (
              basicInfoArray.length <= 0 &&
              communicationArray.length <= 0 &&
              statutoryArray.length <= 0 &&
              complianceArray.length <= 0 &&
              bankDetailArray.length <= 0 &&
              contactDetailArray.length <= 0
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
                      Swal.fire({
                        title:
                          "Your data has been successfully submitted to Hitachi Team and you will receive an email about the status update.",
                        confirmButtonText: "Yes",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          if (
                            JSON.parse(window.sessionStorage.getItem("jwt"))
                              .result?.usertype === "NewRegistration"
                          ) {
                            let item = JSON.parse(
                              window.sessionStorage.getItem("jwt")
                            );
                            item.result.userId = JSON.parse(
                              window.sessionStorage.getItem("jwt")
                            ).result.userId2;
                            item.result.userId2 = JSON.parse(
                              window.sessionStorage.getItem("jwt")
                            ).result.userId;
                            delete item.result.userId2;
                            delete item.result.usertype;
                            delete item.result.Ticket_ID2;
                            console.log(
                              "new user response------------>>>",
                              item.result
                            );
                            sessionStorage.setItem("jwt", JSON.stringify(item));
                            navigate("/userCreation");
                          } else {
                            navigate("/userCreation");
                          }
                        }
                      });
                      // chandran
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
              function hasItems(array) {
                return Array.isArray(array) && array.length > 0;
              }

              // Construct the content for the Swal.fire based on the arrays
              let htmlContent = `
                <div style="text-align: justify;height: 400px; overflow-y: auto;">
              `;

              if (hasItems(basicInfoArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">VENDOR DETAIL-BASIC INFORMATION:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${basicInfoArray.map((item) => `<li>${item}</li>`).join("")}
                    ${basicInfoMandtatory}
                  </ol><br>
                `;
              }

              if (hasItems(communicationArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">VENDOR DETAIL-COMMUNICATION DETAIL:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${communicationArray
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ol><br>
                `;
              }

              if (hasItems(statutoryArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">STATUTORY DETAIL:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${statutoryArray.map((item) => `<li>${item}</li>`).join("")}
                  </ol><br>
                `;
              }

              if (hasItems(complianceArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">COMPLIANCE DETAIL:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${complianceArray
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ol><br>
                `;
              }

              if (hasItems(bankDetailArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">BANK DETAIL:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${bankDetailArray
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ol><br>
                `;
              }

              if (hasItems(contactDetailArray)) {
                htmlContent += `
                  <b style="margin-bottom: 10px;">CONTACT DETAIL:</b><br>
                  <ol style="list-style-type: decimal;">
                    ${contactDetailArray
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ol><br>
                `;
              }

              htmlContent += `
                </div>
              `;

              // Show the Swal.fire dialog
              Swal.fire({
                title: "Please complete this field.",
                html: htmlContent,
                padding: "3px",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
              });
            }
          }
        });
      }
    }
  };
  useEffect(() => {
    let newuser = JSON.parse(
      window.sessionStorage.getItem("newregUser")
    )?.newregUser;
    if (params.userId) {
      let finalstatus = "";
      apiService.signupFindByUserId(params.userId).then((res) => {
        finalstatus = res.data.result?.finalStatus;
      });
      apiService.getAllCollection(params.userId).then((res) => {
        if (
          res.data.basicInfo[0]?.submitStatus === "Submitted" &&
          finalstatus !== "Approved" &&
          JSON.parse(window.sessionStorage.getItem("jwt")).result.role !==
            "Admin"
        ) {
          setStyle("notEditable");
        } else if (
          res.data.basicInfo[0]?.submitStatus === "Submitted" &&
          finalstatus === "Approved" &&
          JSON.parse(window.sessionStorage.getItem("jwt")).result.role !==
            "Admin"
        ) {
          setStyle("notEditable");
        } else {
          setStyle("editable");
        }
        Object.entries(res.data.contactDetail).map(([key, value]) => {
          setValues({
            contactName1: value.contactName1,
            emailId1: value.emailId1,
            contactNumber1: value.contactNumber1,
            contactName2:
              value.contactName2 === "null" ? "" : value.contactName2,
            emailId2: value.emailId2 === "null" ? "" : value.emailId2,
            contactNumber2:
              value.contactNumber2 === "null" ? "" : value.contactNumber2,
            contactName3:
              value.contactName3 === "null" ? "" : value.contactName3,
            emailId3: value.emailId3 === "null" ? "" : value.emailId3,
            contactNumber3:
              value.contactNumber3 === "null" ? "" : value.contactNumber3,
          });
        });
      });
    } else if (newuser) {
      let finalstatus = "";
      apiService.signupFindByUserId(newuser).then((res) => {
        finalstatus = res.data.result?.finalStatus;
      });
      apiService.getAllCollection(newuser).then((res) => {
        if (
          res.data.basicInfo[0]?.submitStatus === "Submitted" &&
          JSON.parse(window.sessionStorage.getItem("jwt")).result.role !==
            "Admin"
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
        JSON.parse(window.sessionStorage.getItem("jwt")).result.role ===
          "Admin" &&
        JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype !==
          "NewRegistration"
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
                {errors.contactName1 && (
                  <p className="text text-danger small">
                    {errors.contactName1}
                  </p>
                )}
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
                {errors.emailId1 && (
                  <p className="text text-danger small">{errors.emailId1}</p>
                )}
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
                {errors.contactNumber1 && (
                  <p className="text text-danger small">
                    {errors.contactNumber1}
                  </p>
                )}
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
                {errors.contactName2 && (
                  <p className="text text-danger small">
                    {errors.contactName2}
                  </p>
                )}
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
                {errors.emailId2 && (
                  <p className="text text-danger small">{errors.emailId2}</p>
                )}
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
                {errors.contactNumber2 && (
                  <p className="text text-danger small">
                    {errors.contactNumber2}
                  </p>
                )}
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
                {errors.contactName3 && (
                  <p className="text text-danger small">
                    {errors.contactName3}
                  </p>
                )}
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
                {errors.emailId3 && (
                  <p className="text text-danger small">{errors.emailId3}</p>
                )}
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
                {errors.contactNumber3 && (
                  <p className="text text-danger small">
                    {errors.contactNumber3}
                  </p>
                )}
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
            {params.userId &&
            JSON.parse(window.sessionStorage.getItem("jwt")).result.role ===
              "Admin" ? (
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
