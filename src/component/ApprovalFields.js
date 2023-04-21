import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "../css/ApprovalFields.css";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
function ApprovalFields(props) {
  const GSTValidation = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
  const PANValidation = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  const numberValidation = /^-?(0|[1-9]\d*)?$/;
  const emailValidation = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  const [editData, seteditData] = useState([]);
  const [editCommmData, seteditCommmData] = useState([]);
  const [editStatData, seteditStatData] = useState([]);
  const [editFinanceData, seteditFinanceData] = useState([]);
  const [editContactData, seteditContactData] = useState([]);
 

  useEffect(() => {
    apiService.getAllCollection(props.userid).then((res) => {
      if (res.data.basicInfo[0] !== "null" && res.data.basicInfo.length > 0) {
        var abc = res.data.basicInfo;
        seteditData([]);
        seteditData((prevState) => [...prevState, ...abc]);
        setaddress1(res.data.basicInfo[0].Address);
        setaddress2(res.data.basicInfo[0].Address_2);
        setcompanyName(res.data.basicInfo[0].companyName);
        setcountry(res.data.basicInfo[0].Country_Region_Code);
        setstate(res.data.basicInfo[0].state);
        setcity(res.data.basicInfo[0].City);
        setpinCode(res.data.basicInfo[0].Post_Code);
        setlogo(res.data.basicInfo[0].image);
      } else {
        setaddress1("");
        setaddress2("");
        setcompanyName("");
        setcountry("");
        setstate("");
        setcity("");
        setpinCode("");
      }

      if (
        res.data.CommunicationDetails[0] !== "null" &&
        res.data.CommunicationDetails.length > 0
      ) {
        var communicate = res.data.CommunicationDetails;
        seteditCommmData([]);
        seteditCommmData((prevState) => [...prevState, ...communicate]);
        setfs_ContactName(
          res.data.CommunicationDetails[0].financeSpoccontactName
        );
        setfs_Designation(
          res.data.CommunicationDetails[0].financeSpocdesignation
        );
        setfs_PhoneNo(res.data.CommunicationDetails[0].financeSpocphoneNo);
        setfs_Email(res.data.CommunicationDetails[0].financeSpocemail);
        setops_ContactName(
          res.data.CommunicationDetails[0].operationSpoccontactName
        );
        setops_Designation(
          res.data.CommunicationDetails[0].operationSpocdesignation
        );
        setops_PhoneNo(res.data.CommunicationDetails[0].operationSpocphoneNo);
        setops_Email(res.data.CommunicationDetails[0].operationSpocemail);
        setcolls_ContactName(
          res.data.CommunicationDetails[0].collectionSpoccontactName
        );
        setcolls_Designation(
          res.data.CommunicationDetails[0].collectionSpocdesignation
        );
        setcolls_PhoneNo(
          res.data.CommunicationDetails[0].collectionSpocphoneNo
        );
        setcolls_Email(res.data.CommunicationDetails[0].collectionSpocemail);
        setmngs_ContactName(
          res.data.CommunicationDetails[0].managementSpoccontactName
        );
        setmngs_Designation(
          res.data.CommunicationDetails[0].managementSpocdesignation
        );
        setmngs_PhoneNo(res.data.CommunicationDetails[0].managementSpocphoneNo);
        setmngs_Email(res.data.CommunicationDetails[0].managementSpocemail);
        setothers_ContactName(res.data.CommunicationDetails[0].contactName);
        setothers_Designation(res.data.CommunicationDetails[0].designation);
        setothers_PhoneNo(res.data.CommunicationDetails[0].phoneNo);
        setothers_Email(res.data.CommunicationDetails[0].email);
        setmastervendor_email(
          res.data.CommunicationDetails[0].mastervendor_email
        );
      } else {
        setfs_ContactName("");
        setfs_Designation("");
        setfs_PhoneNo("");
        setfs_Email("");
        setops_ContactName("");
        setops_Designation("");
        setops_PhoneNo("");
        setops_Email("");
        setcolls_ContactName("");
        setcolls_Designation("");
        setcolls_PhoneNo("");
        setcolls_Email("");
        setmngs_ContactName("");
        setmngs_Designation("");
        setmngs_PhoneNo("");
        setmngs_Email("");
        setothers_ContactName("");
        setothers_Designation("");
        setothers_PhoneNo("");
        setothers_Email("");
        setmastervendor_email("");
      }

      if (res.data.Statutory[0] !== "null" && res.data.Statutory.length > 0) {
        var statarr = res.data.Statutory;
        console.log("res.data.Statutory", res.data.Statutory[0])
        seteditStatData([]);
        seteditStatData((prevState) => [...prevState, ...statarr]);
        setGST_type(res.data.Statutory[0].GST_Vendor_Type);
        setGST_No(res.data.Statutory[0].GST_Registration_No);
        setGST_Doc(res.data.Statutory[0].GST_Doc);
        setfileDisclosure(res.data.Statutory[0].fileDisclosure);
        setPAN_No(res.data.Statutory[0].P_A_N_No);
        setPAN_Doc(res.data.Statutory[0].PAN_Doc);
        setCIN_No(res.data.Statutory[0].CIN_No);
        setform_10f(res.data.Statutory[0].form_10f_Doc);
        setpe_declaration(res.data.Statutory[0].PE_Declaration_Doc);
        setMSME_status(res.data.Statutory[0].MSMED);
        setMSME_No(res.data.Statutory[0].MSMED_Number);
        setMSME_Doc(res.data.Statutory[0].MSME_Doc);
        setMSME_Type(res.data.Statutory[0].MSMED_Vendor_Type);
        setTAN_No(res.data.Statutory[0].TAN_No);
        setTAN_Doc(res.data.Statutory[0].TAN_Doc);
        setTax_residency(res.data.Statutory[0].Tax_residency_Doc
);
      } else {
        setGST_type("");
        setGST_No("");
        setGST_Doc("");
        setPAN_No("");
        setPAN_Doc("");
        setCIN_No("");
        setform_10f("");
        setpe_declaration("");
        setMSME_status("");
        setMSME_No("");
        setMSME_Doc("");
        setMSME_Type("");
        setTAN_No("");
        setTAN_Doc("");
        setTax_residency("");
      }

      if (
        res.data.ComplianceDetail[0] !== "null" &&
        res.data.ComplianceDetail.length > 0
      ) {
        setRPD_Doc(res.data.ComplianceDetail[0].RPD_Doc);
        setCOC_Doc(res.data.ComplianceDetail[0].COC_Doc);
        setNDA_Doc(res.data.ComplianceDetail[0].NDA_Doc);
      } else {
        setRPD_Doc("");
        setCOC_Doc("");
        setNDA_Doc("");
      }

      if (
        res.data.FinancialDetail[0] !== "null" &&
        res.data.FinancialDetail.length > 0
      ) {
        var fD = res.data.FinancialDetail;
        seteditFinanceData([]);
        seteditFinanceData((prevState) => [...prevState, ...fD]);
        setyearOfAuditedFinancial(
          res.data.FinancialDetail[0].yearOfAuditedFinancial
        );
        setRevenue(res.data.FinancialDetail[0].Revenue);
        setProfit(res.data.FinancialDetail[0].Profit);
        setnetWorth(res.data.FinancialDetail[0].netWorth);
        setcurrentAssets(res.data.FinancialDetail[0].currentAssets);
        setdirectorDetails(res.data.FinancialDetail[0].directorDetails);
        setfinancial_data(res.data.FinancialDetail[0].financial_data);
        setfinancial_data2(res.data.FinancialDetail[0].financial_data2);
      } else {
        setyearOfAuditedFinancial("");
        setRevenue("");
        setProfit("");
        setnetWorth("");
        setcurrentAssets("");
        setdirectorDetails("");
        setfinancial_data("");
        setfinancial_data2("");
      }

      if (res.data.Bankdetail[0] !== 'null' && res.data.Bankdetail.length > 0) {
        setbankAccountName(res.data.Bankdetail[0].Account_Holder_Name);
        setbankName(res.data.Bankdetail[0].Bank_Name);
        setbankAccountNumber(res.data.Bankdetail[0].Account_No);
        setifscCode(res.data.Bankdetail[0].IFSC_Code);
        setMICRcode(res.data.Bankdetail[0].MICRcode);
        setbranchAddress(res.data.Bankdetail[0].Bank_Address);
        setbankdetailDoc(res.data.Bankdetail[0].bankdetailDoc);
      } else {
        setbankAccountName("");
        setbankName("");
        setbankAccountNumber("");
        setifscCode("");
        setMICRcode("");
        setbranchAddress("");
        setbankdetailDoc("");
      }

      if (
        res.data.contactDetail[0] !== "null" &&
        res.data.contactDetail.length > 0
      ) {
        var contactarr = res.data.contactDetail;
        seteditContactData([]);
        seteditContactData((prevState) => [...prevState, ...contactarr]);
        setname(res.data.contactDetail[0].contactName1);
        setcontactNumber(res.data.contactDetail[0].contactNumber1);
        setemail(res.data.contactDetail[0].emailId1);
        setname2(res.data.contactDetail[0].contactName2);
        setcontactNumber2(res.data.contactDetail[0].contactNumber2);
        setemail2(res.data.contactDetail[0].emailId2);
        setname3(res.data.contactDetail[0].contactName3);
        setcontactNumber3(res.data.contactDetail[0].contactNumber3);
        setemail3(res.data.contactDetail[0].emailId3);
        setTicketID(res.data.contactDetail[0].Ticket_ID);
      } else {
        setname("");
        setcontactNumber("");
        setemail("");
        setname2("");
        setcontactNumber2("");
        setemail2("");
        setname3("");
        setcontactNumber3("");
        setemail3("");
        setTicketID("");
      }
    });
  }, []);

  const [Address, setaddress1] = useState("");
  const [Address_2, setaddress2] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [Country_Region_Code, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [City, setcity] = useState("");
  const [Post_Code, setpinCode] = useState("");
  const [logo, setlogo] = useState("");

  const [fs_ContactName, setfs_ContactName] = useState("");
  const [fs_Designation, setfs_Designation] = useState("");
  const [fs_PhoneNo, setfs_PhoneNo] = useState("");
  const [fs_Email, setfs_Email] = useState("");
  const [ops_ContactName, setops_ContactName] = useState("");
  const [ops_Designation, setops_Designation] = useState("");
  const [ops_PhoneNo, setops_PhoneNo] = useState("");
  const [ops_Email, setops_Email] = useState("");
  const [colls_ContactName, setcolls_ContactName] = useState("");
  const [colls_Designation, setcolls_Designation] = useState("");
  const [colls_PhoneNo, setcolls_PhoneNo] = useState("");
  const [colls_Email, setcolls_Email] = useState("");
  const [mngs_ContactName, setmngs_ContactName] = useState("");
  const [mngs_Designation, setmngs_Designation] = useState("");
  const [mngs_PhoneNo, setmngs_PhoneNo] = useState("");
  const [mngs_Email, setmngs_Email] = useState("");
  const [others_ContactName, setothers_ContactName] = useState("");
  const [others_Designation, setothers_Designation] = useState("");
  const [others_PhoneNo, setothers_PhoneNo] = useState("");
  const [others_Email, setothers_Email] = useState("");
  const [mastervendor_email, setmastervendor_email] = useState("");

  const [GST_type, setGST_type] = useState("");
  const [GST_No, setGST_No] = useState("");
  const [GST_Doc, setGST_Doc] = useState("");
  const [fileDisclosure, setfileDisclosure] = useState("");
  const [PAN_No, setPAN_No] = useState("");
  const [PAN_Doc, setPAN_Doc] = useState("");
  const [CIN_No, setCIN_No] = useState("");
  const [form_10f, setform_10f] = useState("");
  const [pe_declaration, setpe_declaration] = useState("");
  const [MSME_status, setMSME_status] = useState("");
  const [MSME_No, setMSME_No] = useState("");
  const [MSME_Doc, setMSME_Doc] = useState("");
  const [MSME_Type, setMSME_Type] = useState("");
  const [TAN_No, setTAN_No] = useState("");
  const [TAN_Doc, setTAN_Doc] = useState("");
  const [Tax_residency, setTax_residency] = useState("");

  const [RPD_Doc, setRPD_Doc] = useState("");
  const [COC_Doc, setCOC_Doc] = useState("");
  const [NDA_Doc, setNDA_Doc] = useState("");

  const [yearOfAuditedFinancial, setyearOfAuditedFinancial] = useState("");
  const [Revenue, setRevenue] = useState("");
  const [Profit, setProfit] = useState("");
  const [netWorth, setnetWorth] = useState("");
  const [currentAssets, setcurrentAssets] = useState("");
  const [directorDetails, setdirectorDetails] = useState("");
  const [financial_data, setfinancial_data] = useState("");
  const [financial_data2, setfinancial_data2] = useState("");

  const [bankAccountName, setbankAccountName] = useState("");
  const [bankName, setbankName] = useState("");
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const [MICRcode, setMICRcode] = useState("");
  const [branchAddress, setbranchAddress] = useState("");
  const [bankdetailDoc, setbankdetailDoc] = useState("");
  const [name, setname] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [email, setemail] = useState("");
  const [name2, setname2] = useState("");
  const [contactNumber2, setcontactNumber2] = useState("");
  const [email2, setemail2] = useState("");
  const [name3, setname3] = useState("");
  const [contactNumber3, setcontactNumber3] = useState("");
  const [email3, setemail3] = useState("");
  const [TicketID,setTicketID]=useState("");

  const [vendorType, setvendorType] = useState("");
  const [acManager, setacManager] = useState("");
  const [mkcheck, setmkcheck] = useState(false);
  const [approverFile, setapproverFile] = useState("");
  const [style, setStyle] = useState("approvalsform");

  // Error states start
  const [address1Err, setaddress1Err] = useState("");
  // const [address2Err, setaddress2Err] = useState(false);
  const [companyNameErr, setcompanyNameErr] = useState("");
  const [countryErr, setcountryErr] = useState("");
  const [stateErr, setstateErr] = useState("");
  const [cityErr, setcityErr] = useState("");
  const [pinCodeErr, setpinCodeErr] = useState("");
  const [logoErr, setlogoErr] = useState("");

  const [fs_ContactNameErr, setfs_ContactNameErr] = useState("");
  const [fs_DesignationErr, setfs_DesignationErr] = useState("");
  const [fs_PhoneNoErr, setfs_PhoneNoErr] = useState("");
  const [fs_EmailErr, setfs_EmailErr] = useState("");

  const [mngs_ContactNameErr, setmngs_ContactNameErr] = useState("");
  const [mngs_DesignationErr, setmngs_DesignationErr] = useState("");
  const [mngs_PhoneNoErr, setmngs_PhoneNoErr] = useState("");
  const [mngs_EmailErr, setmngs_EmailErr] = useState("");
  const [mastervendor_emailErr, setmastervendor_emailErr] = useState("");

  const [GST_typeErr, setGST_typeErr] = useState("");
  const [GST_NoErr, setGST_NoErr] = useState("");
  const [GST_DocErr, setGST_DocErr] = useState("");
  const [fileDisclosureErr, setfileDisclosureErr] = useState("");
  const [PAN_NoErr, setPAN_NoErr] = useState("");
  const [PAN_DocErr, setPAN_DocErr] = useState("");
  const [CIN_NoErr, setCIN_NoErr] = useState("");
  const [form_10fErr, setform_10fErr] = useState("");
  const [pe_declarationErr, setpe_declarationErr] = useState("");
  const [MSME_statusErr, setMSME_statusErr] = useState("");
  const [MSME_NoErr, setMSME_NoErr] = useState("");
  const [MSME_DocErr, setMSME_DocErr] = useState("");
  const [MSME_TypeErr, setMSME_TypeErr] = useState("");
  const [TAN_NoErr, setTAN_NoErr] = useState("");
  const [TAN_DocErr, setTAN_DocErr] = useState("");
  const [Tax_residencyErr, setTax_residencyErr] = useState("");

  const [RPD_DocErr, setRPD_DocErr] = useState("");
  const [COC_DocErr, setCOC_DocErr] = useState("");
  const [NDA_DocErr, setNDA_DocErr] = useState("");

  const [bankAccountNameErr, setbankAccountNameErr] = useState("");
  const [bankNameErr, setbankNameErr] = useState("");
  const [bankAccountNumberErr, setbankAccountNumberErr] = useState("");
  const [ifscCodeErr, setifscCodeErr] = useState("");
  const [MICRcodeErr, setMICRcodeErr] = useState("");
  const [branchAddressErr, setbranchAddressErr] = useState("");
  const [bankdetailDocErr, setbankdetailDocErr] = useState("");

  const [nameErr, setnameErr] = useState("");
  const [contactNumberErr, setcontactNumberErr] = useState("");
  const [emailErr, setemailErr] = useState("");

  const [vendorTypeErr, setvendorTypeErr] = useState("");
  const [acManagerErr, setacManagerErr] = useState("");
  const [mkcheckErr, setmkcheckErr] = useState("");
  const [approverFileErr, setapproverFileErr] = useState("");
  // Error states end

  // states update start
  const validatecompanyName = (e) => {
    setcompanyName(e.target.value);
    if (e.target.value.length === 0) {
      setcompanyNameErr("Company name is required");
    } else {
      setcompanyNameErr("");
      setcompanyName(e.target.value);
    }
  };

  const validateaddress1 = (e) => {
    setaddress1(e.target.value);
    if (e.target.value.length === 0) {
      setaddress1Err("Address 1 is required");
    } else {
      setaddress1Err("");
      setaddress1(e.target.value);
    }
  };
  const validateaddress2 = (e) => {
    setaddress2(e.target.value);
  };
  const validatecountry = (e) => {
    setcountry(e.target.value);
    if (e.target.value.length === 0) {
      setcountryErr("Country is required");
    } else {
      setcountryErr("");
      setcountry(e.target.value);
    }
  };
  const validatestate = (e) => {
    setstate(e.target.value);
    if (e.target.value.length === 0) {
      setstateErr("State is required");
    } else {
      setstateErr("");
      setstate(e.target.value);
    }
  };
  const validatecity = (e) => {
    setcity(e.target.value);
    if (e.target.value.length === 0) {
      setcityErr("City is required");
    } else {
      setcityErr("");
      setcity(e.target.value);
    }
  };
  const validatepinCode = (e) => {
    setpinCode(e.target.value);
    if (e.target.value.length === 0) {
      setpinCodeErr("Pincode is required");
    } else if (
      !numberValidation.test(e.target.value) ||
      e.target.value.length !== 6
    ) {
      setpinCodeErr("Pincode is invalid");
    } else {
      setpinCodeErr("");
      setpinCode(e.target.value);
    }
  };
  //Communication details
  const validatefs_ContactName = (e) => {
    setfs_ContactName(e.target.value);
    if (e.target.value.length === 0) {
      setfs_ContactNameErr("Contact name is required");
    } else {
      setfs_ContactNameErr("");
      setfs_ContactName(e.target.value);
    }
  };
  const validatefs_Designation = (e) => {
    setfs_Designation(e.target.value);
    if (e.target.value.length === 0) {
      setfs_DesignationErr("Designation is required");
    } else {
      setfs_DesignationErr("");
      setfs_Designation(e.target.value);
    }
  };
  const validatefs_PhoneNo = (e) => {
    setfs_PhoneNo(e.target.value);
    if (e.target.value.length === 0) {
      setfs_PhoneNoErr("Phone number is required");
    } else if (
      !numberValidation.test(e.target.value) ||
      e.target.value.length !== 10
    ) {
      setfs_PhoneNoErr("Phone number is invalid");
    } else {
      setfs_PhoneNoErr("");
      setfs_PhoneNo(e.target.value);
    }
  };
  const validatefs_Email = (e) => {
    setfs_Email(e.target.value);
    if (e.target.value.length === 0) {
      setfs_EmailErr("Email is required");
    } else if (!emailValidation.test(e.target.value)) {
      setfs_EmailErr("Email is invalid");
    } else {
      setfs_EmailErr("");
      setfs_Email(e.target.value);
    }
  };
  const validatemngs_ContactName = (e) => {
    setmngs_ContactName(e.target.value);
    if (e.target.value.length === 0) {
      setmngs_ContactNameErr("Contact name is required");
    } else {
      setmngs_ContactNameErr("");
      setmngs_ContactName(e.target.value);
    }
  };
  const validatemngs_Designation = (e) => {
    setmngs_Designation(e.target.value);
    if (e.target.value.length === 0) {
      setmngs_DesignationErr("Designation is required");
    } else {
      setmngs_DesignationErr("");
      setmngs_Designation(e.target.value);
    }
  };
  const validatemngs_PhoneNo = (e) => {
    setmngs_PhoneNo(e.target.value);
    if (e.target.value.length === 0) {
      setmngs_PhoneNoErr("Phone number is required");
    } else if (
      !numberValidation.test(e.target.value) ||
      e.target.value.length !== 10
    ) {
      setmngs_PhoneNoErr("Phone number is invalid");
    } else {
      setmngs_PhoneNoErr("");
      setmngs_PhoneNo(e.target.value);
    }
  };
  const validatemngs_Email = (e) => {
    setmngs_Email(e.target.value);
    if (e.target.value.length === 0) {
      setmngs_EmailErr("Email is required");
    } else if (!emailValidation.test(e.target.value)) {
      setmngs_EmailErr("Email is invalid");
    } else {
      setmngs_EmailErr("");
      setmngs_Email(e.target.value);
    }
  };
  const validatemastervendor_email = (e) => {
    setmastervendor_email(e.target.value);
    if (e.target.value.length === 0) {
      setmastervendor_emailErr("Email is required");
    } else {
      setmastervendor_emailErr("");
      setmastervendor_email(e.target.value);
    }
  };
  //bank details
  const validatebankAccountName = (e) => {
    setbankAccountName(e.target.value);
    if (e.target.value.length === 0) {
      setbankAccountNameErr("Account name is required");
    } else {
      setbankAccountNameErr("");
      setbankAccountName(e.target.value);
    }
  };
  const validatebankName = (e) => {
    setbankName(e.target.value);
    if (e.target.value.length === 0) {
      setbankNameErr("Bank name is required");
    } else {
      setbankNameErr("");
      setbankName(e.target.value);
    }
  };
  const validatebankAccountNumber = (e) => {
    setbankAccountNumber(e.target.value);
    if (e.target.value.length === 0) {
      setbankAccountNumberErr("Account number is required");
    } else {
      setbankAccountNumberErr("");
      setbankAccountNumber(e.target.value);
    }
  };
  const validateifscCode = (e) => {
    setifscCode(e.target.value);
    if (e.target.value.length === 0) {
      setifscCodeErr("IFSC code is required");
    } else {
      setifscCodeErr("");
      setifscCode(e.target.value);
    }
  };
  const validateMICRcode = (e) => {
    setMICRcode(e.target.value);
    if (e.target.value.length === 0) {
      setMICRcodeErr("MICR code is required");
    } else {
      setMICRcodeErr("");
      setMICRcode(e.target.value);
    }
  };
  const validatebranchAddress = (e) => {
    setbranchAddress(e.target.value);
    if (e.target.value.length === 0) {
      setbranchAddressErr("Branch address is required");
    } else {
      setbranchAddressErr("");
      setbranchAddress(e.target.value);
    }
  };
  // contact team
  const validatename = (e) => {
    setname(e.target.value);
    if (e.target.value.length === 0) {
      setnameErr("Name is required");
    } else {
      setnameErr("");
      setname(e.target.value);
    }
  };
  const validatecontactNumber = (e) => {
    setcontactNumber(e.target.value);
    if (e.target.value.length === 0) {
      setcontactNumberErr("Contact number is required");
    } else if (
      !numberValidation.test(e.target.value) ||
      e.target.value.length !== 10
    ) {
      setcontactNumberErr("Contact number is invalid");
    } else {
      setcontactNumberErr("");
      setcontactNumber(e.target.value);
    }
  };
  const validateemail = (e) => {
    setemail(e.target.value);
    if (e.target.value.length === 0) {
      setemailErr("Email is required");
    } else if (!emailValidation.test(e.target.value)) {
      setemailErr("Email is invalid");
    } else {
      setemailErr("");
      setemail(e.target.value);
    }
  };
  // approval manager
  const validatevendorType = (e) => {
    setvendorType(e.target.value);
    if (e.target.value.length === 0) {
      setvendorTypeErr("Vendor type is required");
    } else {
      setvendorTypeErr("");
      setvendorType(e.target.value);
    }
  };
  const validateacManager = (e) => {
    setacManager(e.target.value);
    if (e.target.value.length === 0) {
      setacManagerErr("A/C manager is required");
    } else {
      setacManagerErr("");
      setacManager(e.target.value);
    }
  };
  const validatemkcheck = (e) => {
    setmkcheck(e.target.checked);
    if (e.target.checked.length === 0) {
      setmkcheckErr("Check is required");
    } else {
      setmkcheckErr("");
      setmkcheck(e.target.checked);
    }
  };
  // satutory Details
  const validateGST_type = (e) => {
    setGST_type(e.target.value);
    if (e.target.value.length === 0) {
      setGST_typeErr("GST type is required");
    } else {
      setGST_typeErr("");
      setGST_type(e.target.value);
    }
  };
  const validateGST_No = (e) => {
    setGST_No(e.target.value);
    if (e.target.value.length === 0) {
      setGST_NoErr("GST Number is required");
    } else if (!GSTValidation.test(e.target.value)) {
      setGST_NoErr("GST Number is not valid");
    } else {
      setGST_NoErr("");
      setGST_No(e.target.value);
    }
  };
  // const validateGST_Doc= (e) => {
  //     setGST_Doc(e.target.value);
  //     if (e.target.value.length === 0) {
  //         setGST_DocErr("GST document is required");
  //     } else {
  //         setGST_DocErr("");
  //         setGST_Doc(e.target.value);
  //     }
  // };
  const validatePAN_No = (e) => {
    setPAN_No(e.target.value);
    if (e.target.value.length === 0) {
      setPAN_NoErr("Pan number is required");
    } else if (!PANValidation.test(e.target.value)) {
      setPAN_NoErr("Pan number is not valid");
    } else {
      setPAN_NoErr("");
      setPAN_No(e.target.value);
    }
  };
  // const validatePAN_Doc= (e) => {
  //     setPAN_Doc(e.target.value);
  //     if (e.target.value.length === 0) {
  //         setPAN_DocErr("Pan document is required");
  //     } else {
  //         setPAN_DocErr("");
  //         setPAN_Doc(e.target.value);
  //     }
  // };
  const validateCIN_No = (e) => {
    setCIN_No(e.target.value);
    if (e.target.value.length === 0) {
      setCIN_NoErr("CIN number is required");
    } else {
      setCIN_NoErr("");
      setCIN_No(e.target.value);
    }
  };
  // const validateform_10f = (e) => {
  //     setform_10f(e.target.value);
  //     if (e.target.value.length === 0) {
  //         setform_10fErr("Form 10f is required");
  //     } else {
  //         setform_10fErr("");
  //         setform_10f(e.target.value);
  //     }
  // };
  // const validatepe_declaration = (e) => {
  //     setpe_declaration(e.target.value);
  //     if (e.target.value.length === 0) {
  //         setpe_declarationErr("PE declaration is required");
  //     } else {
  //         setpe_declarationErr("");
  //         setpe_declaration(e.target.value);
  //     }
  // };
  const validateMSME_status = (e) => {
    setMSME_status(e.target.value);
    if (e.target.value.length === 0) {
      setMSME_statusErr("MSME status is required");
    } else {
      setMSME_statusErr("");
      setMSME_status(e.target.value);
    }
  };
  const validateMSME_No = (e) => {
    setMSME_No(e.target.value);
    if (e.target.value.length === 0) {
      setMSME_NoErr("MSME number is required");
    } else {
      setMSME_NoErr("");
      setMSME_No(e.target.value);
    }
  };
  // const validateMSME_Doc= (e) => {
  //     setMSME_Doc(e.target.value);
  //     if (e.target.value.length === 0) {
  //         setMSME_DocErr("MSME document is required");
  //     } else {
  //         setMSME_DocErr("");
  //         setMSME_Doc(e.target.value);
  //     }
  // };
  const validateMSME_Type = (e) => {
    setMSME_Type(e.target.value);
    if (e.target.value.length === 0) {
      setMSME_TypeErr("MSME type is required");
    } else {
      setMSME_TypeErr("");
      setMSME_Type(e.target.value);
    }
  };
  const validateTAN_No = (e) => {
    setTAN_No(e.target.value);
    if (e.target.value.length === 0) {
      setTAN_NoErr("TAN number is required");
    } else {
      setTAN_NoErr("");
      setTAN_No(e.target.value);
    }
  };
  // const validateTAN_Doc= (e) => {
  //     setTAN_Doc(e.target.value);
  //     if (e.target.value.length === 0) {
  //         setTAN_DocErr("TAN document is required");
  //     } else {
  //         setTAN_DocErr("");
  //         setTAN_Doc(e.target.value);
  //     }
  // };

  const validateTax_residency = (e) => {
    setTax_residency(e.target.value);
    if (e.target.value.length === 0) {
      setTax_residencyErr("Tax residency is required");
    } else {
      setTax_residencyErr("");
      setTax_residency(e.target.value);
    }
  };

  const onApproverFileChange = (event) => {
    setapproverFile(event.target.files[0]);
  };

  const handleEdit = (event) => {
    if (style === "cont2") {
      setStyle("approvalsform");
    } else {
      setStyle("cont2");
    }
  };
  const handleLogoView = (event) => {
    console.log("event------------------logo--->>>>", event)
    Swal.fire({
      title: "Company Logo",
      html: ` <img className="camera-img" src='data:image/jpeg;base64,${event}' alt="image" width='100px' width='100px'/> `,
      focusConfirm: false,
    });
  };

  const handleView = (event) => {
    if (event) {
      let text = event;
      let fname = text.split("/");
      fetch(`http://localhost:12707/downloadPdfUploads/${fname[1]}`).then(
        (response) => {
          response.blob().then((blob) => {
            let url = URL.createObjectURL(blob, "application/pdf");
            window.open(url, "_blank");
          });
        }
      );
    } else {
      Swal.fire({
        title: "Error While Fetching",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const handleEditPopup = (event) => {
    // event.preventDefault(); bankdetailDoc
    if (
      (event === "logo" && logo) ||
      (event === "GST_Doc" && GST_Doc) ||
      (event === "fileDisclosure" && fileDisclosure) ||
      (event === "PAN_Doc" && PAN_Doc) ||
      (event === "form_10f" && form_10f) ||
      (event === "pe_declaration" && pe_declaration) ||
      (event === "Tax_residency" && Tax_residency) ||
      (event === "MSME_Doc" && MSME_Doc) ||
      (event === "TAN_Doc" && TAN_Doc) ||
      (event === "RPD_Doc" && RPD_Doc) ||
      (event === "COC_Doc" && COC_Doc) ||
      (event === "NDA_Doc" && NDA_Doc) ||
      (event === "financial_data" && financial_data) ||
      (event === "financial_data2" && financial_data2) ||
      (event === "bankdetailDoc" && bankdetailDoc)
    ) {
      let title = event;
      Swal.fire({
        heightAuto: true,
        title: "Delete Existing File",
        html: `<div class="rejectstyle">
           <div> <lablel> ${title}</label>
       
         </div>
          `,
        confirmButtonText: "Delete",
        confirmButtonColor: "#B1000E",
        showCancelButton: true,
        focusConfirm: false,
        customClass: "swal-wide",
        // didOpen: () => {
        //     const yes = document.querySelector('#delete')
        //     yes.addEventListener('click', () => {
        // })
        // },

        preConfirm: () => {
          Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#B1000E",
            denyButtonText: "No",
            denyButtonColor: "gray",
            customClass: {
              actions: "my-actions",
              cancelButton: "order-1 right-gap",
              confirmButton: "order-2",
              denyButton: "order-3",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              if (event === "GST_Doc") {
                setGST_Doc("");
                setGST_DocErr("GST document is required");
              }
              else if (event === "fileDisclosure") {
                setfileDisclosure("");
                setfileDisclosureErr("FileDisclosure is required");
              } else if (event === "logo") {
                setlogo("");
                setlogoErr("Logo is required");
              } else if (event === "PAN_Doc") {
                setPAN_Doc("");
                setPAN_DocErr("PAN document is required");
              } else if (event === "form_10f") {
                setform_10f("");
                setform_10fErr("form_10f document is required");
              } else if (event === "pe_declaration") {
                setpe_declaration("");
                setpe_declarationErr("Pe_declaration document is required");
              } else if (event === "MSME_Doc") {
                setMSME_Doc("");
                setMSME_DocErr("MSME document is required");
              } else if (event === "TAN_Doc") {
                setTAN_Doc("");
                setTAN_DocErr("TAN document is required");
              } else if (event === "Tax_residency") {
                setTax_residency("");
                setTax_residencyErr("TAX document is required");
              } else if (event === "RPD_Doc") {
                setRPD_Doc("");
                setRPD_DocErr("RPD document is required");
              } else if (event === "COC_Doc") {
                setCOC_Doc("");
                setCOC_DocErr("COC document is required");
              } else if (event === "NDA_Doc") {
                setNDA_Doc("");
                setNDA_DocErr("NDA document is required");
              } else if (event === "financial_data") {
                setfinancial_data("");
              } else if (event === "financial_data2") {
                setfinancial_data2("");
              } else if (event === "bankdetailDoc") {
                setbankdetailDoc("");
                setbankdetailDocErr("Bank document is required");
              }
              Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("File not deleted", "", "info");
            }
          });
          // Swal({
          //     title: "Are you sure?",
          //     text: "You will not be able to recover this imaginary file!",
          //     type: "warning",
          //     showCancelButton: true,
          //     confirmButtonColor: '#DD6B55',
          //     confirmButtonText: 'Yes, I am sure!',
          //     cancelButtonText: "No, cancel it!"
          //  }).then(
          //        function () { /*Your Code Here*/ },
          //        function () { return false; });

          // let rejectdoc = Swal.getPopup().querySelector('#rejectdoc').files[0]

          // if (!rejectdoc) {

          //     Swal.showValidationMessage(`Please enter comments and file`)
          // } else {
          //     console.log("File True=============>>>>", rejectdoc)
          // const reject = {
          //     "rejectdoc": rejectdoc
          // }
          // }
        },
      });
    } else {
      // let bankDocument = "Copy of cancel Cheque.pdf";
      // let title = event
      Swal.fire({
        title: "Select File",
        input: "file",
        // inputAttributes: {
        //     'accept': 'image/*',
        //     'aria-label': 'Upload your profile picture'
        // },
        confirmButtonText: "Upload",
        confirmButtonColor: "#B1000E",
        showCancelButton: true,

        inputValidator: (value) => {
          if (!value) {
            return "You need to upload a file!";
          }
        },
      }).then((result) => {
        // const reader = new FileReader()
        // reader.onload = (e) => {
        //     Swal.fire({
        //         title: 'Your uploaded picture',
        //         imageUrl: e.target.result,
        //         imageAlt: 'The uploaded picture'
        //     })
        // }
        // reader.readAsDataURL(result.value)

        if (result.isConfirmed) {
          if (event === "GST_Doc") {
            setGST_Doc(result.value);
            setGST_DocErr("");
          } else if (event === "fileDisclosure") {
            setfileDisclosure(result.value);
            setfileDisclosureErr("");
          } else if (event === "logo") {
            var filereader = new FileReader();
            // filereader.readAsDataURL(result.value);
            filereader.readAsBinaryString(result.value);
            filereader.onload = function (evt) {
              var base64 = evt.target.result;
              setlogo(btoa(base64));
            };

            setlogoErr("");
          } else if (event === "PAN_Doc") {
            setPAN_Doc(result.value);
            setPAN_DocErr("");
          } else if (event === "form_10f") {
            setform_10f(result.value);
            setform_10fErr("");
          } else if (event === "pe_declaration") {
            setpe_declaration(result.value);
            setpe_declarationErr("");
          } else if (event === "MSME_Doc") {
            setMSME_Doc(result.value);
            setMSME_DocErr("");
          } else if (event === "TAN_Doc") {
            setTAN_Doc(result.value);
            setTAN_DocErr("");
          } else if (event === "Tax_residency") {
            setTax_residency(result.value);
            setTax_residencyErr("");
          } else if (event === "RPD_Doc") {
            setRPD_Doc(result.value);
            setRPD_DocErr("");
          } else if (event === "COC_Doc") {
            setCOC_Doc(result.value);
            setCOC_DocErr("");
          } else if (event === "NDA_Doc") {
            setNDA_Doc(result.value);
            setNDA_DocErr("");
          } else if (event === "financial_data") {
            setfinancial_data(result.value);
          } else if (event === "financial_data2") {
            setfinancial_data2(result.value);
          } else if (event === "bankdetailDoc") {
            setbankdetailDoc(result.value);
            setbankdetailDocErr("");
          }
          Swal.fire("File Selected!", "", "success");
        }
      });
      //     console.log("file-------------->>>>>",file)
      //     const reader = new FileReader()
      //     reader.onload = (e) => {
      //         Swal.fire({
      //             title: 'Your uploaded picture',
      //             imageUrl: e.target.result,
      //             imageAlt: 'The uploaded picture'
      //         })
      //     }
      //     reader.readAsDataURL(file)
    }
  };

  const handleNoConcernFound = (event) => {
    const userId = event;
    const data = new FormData();
    // data.append('level1Status', "approved");
    data.append("userId", event);
    // data.append('level1RejectComment', "");
    // data.append('level1rejectFileDoc', "");
    data.append("level2Status", "approved");
    data.append("level2Date", new Date());
    // data.append('level2RejectComment', "");
    // data.append('level2rejectFileDoc', "");
    apiService.updateApprovalStatus(userId, data).then((responseData) => {
      if (responseData.data.status === 'success') {
        Swal.fire({
          title: "Approved",
          icon: "success",
          confirmButtonText: "OK",
        }).then((JapanTeamApprove) => {
          if(JapanTeamApprove){
            const ERPData={
              Address: Address||undefined,
              Address_2:Address_2||undefined,
              City: City||undefined,
              state:state||undefined,
              Country_Region_Code: Country_Region_Code||undefined,
              Entry_No:TicketID||undefined,   
            };
            apiService.postErpResourcePortalVendorlist(ERPData).then((response) => {
              console.log("saved",response);
            })
          }
          
                  })
      } else {
        Swal.fire({
          title: responseData.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };
  const handleConcernFound = (event) => {
    Swal.fire({
      heightAuto: true,
      title: "Review vendor details",
      html: `<div class="rejectstyle">
            <textarea rows="10" cols="30" id="comment" class="swal01-input" placeholder="Comments "></textarea>
            <input type="file" id="rejectdoc" class="swal01-input" placeholder="Select file">
       </div> `,
      confirmButtonText: "Reject",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector("#comment").value;
        const rejectdoc = Swal.getPopup().querySelector("#rejectdoc").files[0];
        if (!comment || !rejectdoc) {
          Swal.showValidationMessage(`Please enter comments and file`);
        } else {
          const data = new FormData();
          console.log("new date--------", new Date());
          data.append("userId", event);
          data.append("level2Status", "rejected");
          data.append("level2RejectComment", comment);
          data.append("level2rejectFileDoc", rejectdoc);
          data.append("level2Date", new Date());
          const userId = event;
          apiService.updateApprovalStatus(userId, data).then((responseData) => {
            if (responseData.data.status === 'success') {
              Swal.fire({
                title: "Rejected",
                icon: "success",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                title: responseData.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          });
        }
      },
    });
  };

  const handleMRTApprove = (event) => {
    if (companyName.length === 0) {
      setcompanyNameErr("Company name is required");
    }
    if (Address.length === 0) {
      console.log("hello2222");
      setaddress1Err("Address 1 is required");
    }
    if (Country_Region_Code.length === 0) {
      setcountryErr("Country is required");
    }
    if (state.length === 0) {
      setstateErr("State is required");
    }
    if (City.length === 0) {
      setcityErr("City is required");
    }
    if (Post_Code.length === 0) {
      setpinCodeErr("Pincode is required");
    }
    if (!logo) {
      setlogoErr("Logo is required");
      console.log("hellossssssss", logoErr);
    }
    if (fs_ContactName.length === 0) {
      setfs_ContactNameErr("Contact name is required");
    }
    if (fs_Designation.length === 0) {
      setfs_DesignationErr("Designation is required");
    }
    if (fs_PhoneNo.length === 0) {
      setfs_PhoneNoErr("Phone number is required");
    }
    if (fs_Email.length === 0) {
      setfs_EmailErr("Email is required");
    }
    // console.log("fs_Email",fs_Email);
    // console.log("mngs_ContactName",mngs_ContactName);
    // console.log("mngs_Designation",mngs_Designation);
    // console.log("mngs_PhoneNo",mngs_PhoneNo);
    // console.log("mngs_Email",mngs_Email);
    // console.log("mastervendor_email",mastervendor_email);

    if (mngs_ContactName.length === 0) {
      setmngs_ContactNameErr("Contact name is required");
    }
    if (mngs_Designation.length === 0) {
      setmngs_DesignationErr("Designation is required");
    }
    if (mngs_PhoneNo.length === 0) {
      setmngs_PhoneNoErr("Phone number is required");
    }
    if (mngs_Email.length === 0) {
      setmngs_EmailErr("Email is required");
    }
    if (mastervendor_email.length === 0) {
      setmastervendor_emailErr("Email is required");
    }

    if (bankAccountName.length === 0) {
      setbankAccountNameErr("Account name is required");
    }
    if (bankName.length === 0) {
      setbankNameErr("Bank name is required");
    }
    if (bankAccountNumber.length === 0) {
      setbankAccountNumberErr("Account number is required");
    }
    if (ifscCode.length === 0) {
      setifscCodeErr("IFSC code is required");
    }
    if (MICRcode.length === 0) {
      setMICRcodeErr("MICR code is required");
    }
    if (branchAddress.length === 0) {
      setbranchAddressErr("Branch address is required");
    }
    if (!bankdetailDoc) {
      setbankdetailDocErr("Bank document is required");
    }

    if (!RPD_Doc) {
      setRPD_DocErr("RPD document is required");
    }
    if (!COC_Doc) {
      setCOC_DocErr("COC document is required");
    }
    if (!NDA_Doc) {
      setNDA_DocErr("NDA document is required");
    }

    if (name.length === 0) {
      setnameErr("Name is required");
    }
    if (contactNumber.length === 0) {
      setcontactNumberErr("Contact number is required");
    }
    if (email.length === 0) {
      setemailErr("Email is required");
    }

    if (vendorType.length === 0) {
      setvendorTypeErr("Vendor type is required");
    }
    if (acManager.length === 0) {
      setacManagerErr("A/C manager is required");
    }
    if (mkcheck === false) {
      setmkcheckErr("Check is required");
    }

    if (GST_type.length === 0) {
      setGST_typeErr("GST type is required");
    }
    if (GST_No.length === 0) {
      setGST_NoErr("GST Number is required");
    }
    if (!GST_Doc) {
      setGST_DocErr("GST doc is required");
    }
    if (PAN_No.length === 0) {
      setPAN_NoErr("Pan number is required");
    }
    if (!PAN_Doc) {
      setPAN_DocErr("Pan doc is required");
    }
    if (CIN_No.length === 0) {
      setCIN_NoErr("CIN number is required");
    }
    if (!form_10f) {
      setform_10fErr("Form 10f is required");
    }
    if (MSME_status.length === 0) {
      setMSME_statusErr("MSME status is required");
    }
    if (MSME_No.length === 0) {
      setMSME_NoErr("MSME number is required");
    }
    if (!MSME_Doc) {
      setMSME_DocErr("MSME doc is required");
    }
    if (MSME_Type.length === 0) {
      setMSME_TypeErr("MSME type is required");
    }
    if (TAN_No.length === 0) {
      setTAN_NoErr("TAN number is required");
    }
    if (!TAN_Doc) {
      setTAN_DocErr("TAN doc is required");
    }
    if (!Tax_residency) {
      setTax_residencyErr("Tax residency is required");
    }
    if (!pe_declaration) {
      setpe_declarationErr("PE declaration is required");
    }

    // const userId = props.userid;
    console.log("companyNameErr", companyName);
    console.log("address1Err", Address);
    console.log("countryErr", Country_Region_Code);
    console.log("stateErr", state);
    console.log("cityErr", City);
    console.log("pinCodeErr", Post_Code);
    console.log("logoErr", logo);
    console.log("fs_ContactNameErr", fs_ContactName);
    console.log("fs_DesignationErr", fs_Designation);
    console.log("fs_PhoneNoErr", fs_PhoneNo);
    console.log("fs_EmailErr", fs_Email);
    console.log("mngs_ContactNameErr", mngs_ContactName);
    console.log("mngs_DesignationErr", mngs_Designation);
    console.log("mngs_PhoneNoErr", mngs_PhoneNo);
    console.log("mngs_EmailErr", mngs_Email);
    console.log("mastervendor_emailErr", mastervendor_email);
    console.log("bankAccountNameErr", bankAccountName);
    console.log("bankNameErr", bankName);
    console.log("bankAccountNumberErr", bankAccountNumber);
    console.log("ifscCodeErr", ifscCode);
    console.log("MICRcodeErr", MICRcode);
    console.log("branchAddressErr", branchAddress);
    console.log("bankdetailDocErr", bankdetailDoc);
    console.log("nameErr", name);
    console.log("contactNumberErr", contactNumber);
    console.log("emailErr", email);
    console.log("vendorTypeErr", vendorType);
    console.log("acManagerErr", acManager);
    console.log("mkcheckErr", mkcheck);
    console.log("GST_typeErr", GST_type);
    console.log("GST_NoErr", GST_No);
    console.log("PAN_NoErr", PAN_No);
    console.log("CIN_NoErr", CIN_No);
    console.log("form_10fErr", form_10f);
    console.log("MSME_statusErr", MSME_status);
    console.log("MSME_NoErr", MSME_No);
    console.log("MSME_TypeErr", MSME_Type);
    console.log("TAN_NoErr", TAN_No);
    console.log("GST_DocErr", GST_Doc);
    console.log("PAN_DocErr", PAN_Doc);
    console.log("MSME_DocErr", MSME_Doc);
    console.log("TAN_DocErr", TAN_Doc);
    console.log("Tax_residencyErr", Tax_residency);
    console.log("pe_declarationErr", pe_declaration);
    console.log("RPD_DocErr", RPD_Doc);
    console.log("COC_DocErr", COC_Doc);
    console.log("NDA_DocErr", NDA_Doc);

    if (
      companyName &&
      Address &&
      Country_Region_Code &&
      state &&
      City &&
      Post_Code &&
      fs_ContactName &&
      fs_Designation &&
      fs_PhoneNo &&
      fs_Email &&
      mngs_ContactName &&
      mngs_Designation &&
      mngs_PhoneNo &&
      mngs_Email &&
      mastervendor_email &&
      bankAccountName &&
      bankName &&
      bankAccountNumber &&
      ifscCode &&
      MICRcode &&
      branchAddress &&
      bankdetailDoc &&
      name &&
      contactNumber &&
      email &&
      // vendorType &&
      // acManager &&
      // mkcheck &&
      GST_type &&
      GST_No &&
      PAN_No &&
      CIN_No &&
      MSME_status &&
      MSME_No &&
      MSME_Type &&
      TAN_No &&
      // GST_Doc &&
      PAN_Doc &&
      // MSME_Doc &&
      TAN_Doc &&
      RPD_Doc &&
      COC_Doc &&
      NDA_Doc
    ) {

      const data = new FormData();
      data.append("userId", props.userid);
      data.append("Address", Address);
      data.append("Address_2", Address_2);
      data.append("companyName", companyName);
      data.append("Country_Region_Code", Country_Region_Code);
      data.append("state", state);
      data.append("City", City);
      data.append("Post_Code", Post_Code);
      data.append("image", logo);
      data.append("Vendor_Type", vendorType);
      data.append("Vendor_Account_Manager", acManager);
      data.append("mkDenialCheque", mkcheck);
      data.append("financeSpoccontactName", fs_ContactName);
      data.append("financeSpocdesignation", fs_Designation);
      data.append("financeSpocphoneNo", fs_PhoneNo);
      data.append("financeSpocemail", fs_Email);
      data.append("operationSpoccontactName", ops_ContactName);
      data.append("operationSpocdesignation", ops_Designation);
      data.append("operationSpocphoneNo", ops_PhoneNo);
      data.append("operationSpocemail", ops_Email);
      data.append("collectionSpoccontactName", colls_ContactName);
      data.append("collectionSpocdesignation", colls_Designation);
      data.append("collectionSpocphoneNo", colls_PhoneNo);
      data.append("collectionSpocemail", colls_Email);
      data.append("managementSpoccontactName", mngs_ContactName);
      data.append("managementSpocdesignation", mngs_Designation);
      data.append("managementSpocphoneNo", mngs_PhoneNo);
      data.append("managementSpocemail", mngs_Email);
      data.append("contactName", others_ContactName);
      data.append("designation", others_Designation);
      data.append("phoneNo", others_PhoneNo);
      data.append("others_Email", others_Email);
      data.append("mastervendor_email", mastervendor_email);
      data.append("RPD_Doc", RPD_Doc);
      data.append("NDA_Doc", NDA_Doc);
      data.append("COC_Doc", COC_Doc);
      data.append("GST_Doc", GST_Doc);
      data.append("fileDisclosure", fileDisclosure);
      data.append("GST_Vendor_Type", GST_type);
      data.append("GST_Registration_No", GST_No);
      data.append("P_A_N_No", PAN_No);
      data.append("PAN_Doc", PAN_Doc);
      data.append("form_10f_Doc", form_10f);
      data.append("TAN_Doc", TAN_Doc);
      data.append("PE_Declaration_Doc", pe_declaration);
      data.append("MSME_Doc", MSME_Doc);
      data.append("Tax_residency_Doc", Tax_residency);
      data.append("CIN_No", CIN_No);
      data.append("MSMED", MSME_status);
      data.append("MSMED_Number", MSME_No);
      data.append("MSMED_Vendor_Type", MSME_Type);
      data.append("TAN_No", TAN_No);
      data.append("financial_data", financial_data);
      data.append("financial_data2", financial_data2);
      data.append("yearOfAuditedFinancial", yearOfAuditedFinancial);
      data.append("Revenue", Revenue);
      data.append("Profit", Profit);
      data.append("netWorth", netWorth);
      data.append("currentAssets", currentAssets);
      data.append("directorDetails", directorDetails);
      data.append('Account_Holder_Name', bankAccountName);
      data.append('Bank_Name', bankName);
      data.append('Account_No', bankAccountNumber);
      data.append('IFSC_Code', ifscCode);
      data.append('MICRcode', MICRcode);
      data.append('Bank_Address', branchAddress);
      data.append("bankdetailDoc", bankdetailDoc);
      data.append("name", name);
      data.append("contactNumber", contactNumber);
      data.append("email", email);
      data.append("name2", name2);
      data.append("contactNumber2", contactNumber2);
      data.append("email2", email2);
      data.append("name3", name3);
      data.append("contactNumber3", contactNumber3);
      data.append("email3", email3);
      data.append("approverFile", approverFile);

      apiService.updateAllCollection(props.userid, data).then((response) => {
      });

      const userId = event;
      const data1 = new FormData();
      data1.append("userId", event);
      data1.append("level3Status", "approved");
      data1.append("level3Date", new Date());

      apiService.updateApprovalStatus(userId, data1).then((responseData) => {
        if (responseData.data.status === 'success') {
          Swal.fire({
            title: "Approved",
            icon: "success",
            confirmButtonText: "OK",
          }).then((MRTTeamApprove) => {
            if(MRTTeamApprove){
              const ERPData={
                Address: Address||undefined,
                Address_2:Address_2||undefined,
                City: City||undefined,
                state:state||undefined,
                Country_Region_Code: Country_Region_Code||undefined,
                Entry_No:TicketID||undefined,   
              };

              apiService.postErpResourcePortalVendorlist(ERPData).then((response) => {
                const MasterVendor={
                  mastervendor_email:mastervendor_email||undefined,
                  companyName:mastervendor_email||undefined
                }
                apiService.saveMasterLogin(MasterVendor).then((response) => {
                })              
              })
            }
            
                    })
        } else {
          Swal.fire({
            title: responseData.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please fill the mandatory fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleMRTReject = (event) => {
    Swal.fire({
      heightAuto: true,
      title: "Review vendor details",
      html: `<div class="rejectstyle">
            <textarea rows="10" cols="30" id="comment" class="swal01-input" placeholder="Comments "></textarea>
            <input type="file" id="rejectdoc" class="swal01-input" placeholder="Select file">
       </div> `,
      confirmButtonText: "Reject",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector("#comment").value;
        const rejectdoc = Swal.getPopup().querySelector("#rejectdoc").files[0];
        if (!comment || !rejectdoc) {
          Swal.showValidationMessage(`Please enter comments and file`);
        } else {
          const data = new FormData();
          data.append("userId", event);
          data.append("level3Status", "rejected");
          data.append("level3RejectComment", comment);
          data.append("level3rejectFileDoc", rejectdoc);
          data.append("level3Date", new Date());
          const userId = event;
          apiService.updateApprovalStatus(userId, data).then((responseData) => {
            if (responseData.data.status === 'success') {
              Swal.fire({
                title: "Rejected",
                icon: "success",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                title: responseData.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          });
        }
      },
    });
  };

  const handleApprove = (event) => {
    console.log("approvae click");
    // event.preventDefault();
    if (companyName.length === 0) {
      setcompanyNameErr("Company name is required");
    }
    if (Address.length === 0) {
      console.log("hello2222");
      setaddress1Err("Address 1 is required");
    }
    if (Country_Region_Code.length === 0) {
      setcountryErr("Country is required");
    }
    if (state.length === 0) {
      setstateErr("State is required");
    }
    if (City.length === 0) {
      setcityErr("City is required");
    }
    if (Post_Code.length === 0) {
      setpinCodeErr("Pincode is required");
    }
    if (!logo) {
      setlogoErr("Logo is required");
      console.log("hellossssssss", logoErr);
    }
    if (fs_ContactName.length === 0) {
      setfs_ContactNameErr("Contact name is required");
    }
    if (fs_Designation.length === 0) {
      setfs_DesignationErr("Designation is required");
    }
    if (fs_PhoneNo.length === 0) {
      setfs_PhoneNoErr("Phone number is required");
    }
    if (fs_Email.length === 0) {
      setfs_EmailErr("Email is required");
    }
    // console.log("fs_Email",fs_Email);
    // console.log("mngs_ContactName",mngs_ContactName);
    // console.log("mngs_Designation",mngs_Designation);
    // console.log("mngs_PhoneNo",mngs_PhoneNo);
    // console.log("mngs_Email",mngs_Email);
    // console.log("mastervendor_email",mastervendor_email);

    if (mngs_ContactName.length === 0) {
      setmngs_ContactNameErr("Contact name is required");
    }
    if (mngs_Designation.length === 0) {
      setmngs_DesignationErr("Designation is required");
    }
    if (mngs_PhoneNo.length === 0) {
      setmngs_PhoneNoErr("Phone number is required");
    }
    if (mngs_Email.length === 0) {
      setmngs_EmailErr("Email is required");
    }
    if (mastervendor_email.length === 0) {
      setmastervendor_emailErr("Email is required");
    }

    if (bankAccountName.length === 0) {
      setbankAccountNameErr("Account name is required");
    }
    if (bankName.length === 0) {
      setbankNameErr("Bank name is required");
    }
    if (bankAccountNumber.length === 0) {
      setbankAccountNumberErr("Account number is required");
    }
    if (ifscCode.length === 0) {
      setifscCodeErr("IFSC code is required");
    }
    if (MICRcode.length === 0) {
      setMICRcodeErr("MICR code is required");
    }
    if (branchAddress.length === 0) {
      setbranchAddressErr("Branch address is required");
    }
    if (!bankdetailDoc) {
      setbankdetailDocErr("Bank document is required");
    }

    if (!RPD_Doc) {
      setRPD_DocErr("RPD document is required");
    }
    if (!COC_Doc) {
      setCOC_DocErr("COC document is required");
    }
    if (!NDA_Doc) {
      setNDA_DocErr("NDA document is required");
    }

    if (name.length === 0) {
      setnameErr("Name is required");
    }
    if (contactNumber.length === 0) {
      setcontactNumberErr("Contact number is required");
    }
    if (email.length === 0) {
      setemailErr("Email is required");
    }

    if (vendorType.length === 0) {
      setvendorTypeErr("Vendor type is required");
    }
    if (acManager.length === 0) {
      setacManagerErr("A/C manager is required");
    }
    if (mkcheck === false) {
      setmkcheckErr("Check is required");
    }

    if (GST_type.length === 0) {
      setGST_typeErr("GST type is required");
    }
    if (GST_No.length === 0) {
      setGST_NoErr("GST Number is required");
    }
    if (!GST_Doc) {
      setGST_DocErr("GST doc is required");
    }
    if (PAN_No.length === 0) {
      setPAN_NoErr("Pan number is required");
    }
    if (!PAN_Doc) {
      setPAN_DocErr("Pan doc is required");
    }
    if (CIN_No.length === 0) {
      setCIN_NoErr("CIN number is required");
    }
    if (!form_10f) {
      setform_10fErr("Form 10f is required");
    }
    if (MSME_status.length === 0) {
      setMSME_statusErr("MSME status is required");
    }
    if (MSME_No.length === 0) {
      setMSME_NoErr("MSME number is required");
    }
    if (!MSME_Doc) {
      setMSME_DocErr("MSME doc is required");
    }
    if (MSME_Type.length === 0) {
      setMSME_TypeErr("MSME type is required");
    }
    if (TAN_No.length === 0) {
      setTAN_NoErr("TAN number is required");
    }
    if (!TAN_Doc) {
      setTAN_DocErr("TAN doc is required");
    }
    if (!Tax_residency) {
      setTax_residencyErr("Tax residency is required");
    }
    if (!pe_declaration) {
      setpe_declarationErr("PE declaration is required");
    }

    // const userId = props.userid;
    console.log("companyNameErr", companyName);
    console.log("address1Err", Address);
    console.log("countryErr", Country_Region_Code);
    console.log("stateErr", state);
    console.log("cityErr", City);
    console.log("pinCodeErr", Post_Code);
    console.log("logoErr", logo);
    console.log("fs_ContactNameErr", fs_ContactName);
    console.log("fs_DesignationErr", fs_Designation);
    console.log("fs_PhoneNoErr", fs_PhoneNo);
    console.log("fs_EmailErr", fs_Email);
    console.log("mngs_ContactNameErr", mngs_ContactName);
    console.log("mngs_DesignationErr", mngs_Designation);
    console.log("mngs_PhoneNoErr", mngs_PhoneNo);
    console.log("mngs_EmailErr", mngs_Email);
    console.log("mastervendor_emailErr", mastervendor_email);
    console.log("bankAccountNameErr", bankAccountName);
    console.log("bankNameErr", bankName);
    console.log("bankAccountNumberErr", bankAccountNumber);
    console.log("ifscCodeErr", ifscCode);
    console.log("MICRcodeErr", MICRcode);
    console.log("branchAddressErr", branchAddress);
    console.log("bankdetailDocErr", bankdetailDoc);
    console.log("nameErr", name);
    console.log("contactNumberErr", contactNumber);
    console.log("emailErr", email);
    console.log("vendorTypeErr", vendorType);
    console.log("acManagerErr", acManager);
    console.log("mkcheckErr", mkcheck);
    console.log("GST_typeErr", GST_type);
    console.log("GST_NoErr", GST_No);
    console.log("PAN_NoErr", PAN_No);
    console.log("CIN_NoErr", CIN_No);
    console.log("form_10fErr", form_10f);
    console.log("MSME_statusErr", MSME_status);
    console.log("MSME_NoErr", MSME_No);
    console.log("MSME_TypeErr", MSME_Type);
    console.log("TAN_NoErr", TAN_No);
    console.log("GST_DocErr", GST_Doc);
    console.log("PAN_DocErr", PAN_Doc);
    console.log("MSME_DocErr", MSME_Doc);
    console.log("TAN_DocErr", TAN_Doc);
    console.log("Tax_residencyErr", Tax_residency);
    console.log("pe_declarationErr", pe_declaration);
    console.log("RPD_DocErr", RPD_Doc);
    console.log("COC_DocErr", COC_Doc);
    console.log("NDA_DocErr", NDA_Doc);

    if (
      companyName &&
      Address &&
      Country_Region_Code &&
      state &&
      City &&
      Post_Code &&
      fs_ContactName &&
      fs_Designation &&
      fs_PhoneNo &&
      fs_Email &&
      mngs_ContactName &&
      mngs_Designation &&
      mngs_PhoneNo &&
      mngs_Email &&
      mastervendor_email &&
      bankAccountName &&
      bankName &&
      bankAccountNumber &&
      ifscCode &&
      MICRcode &&
      branchAddress &&
      bankdetailDoc &&
      name &&
      contactNumber &&
      email &&
      vendorType &&
      acManager &&
      mkcheck &&
      GST_type &&
      GST_No &&
      PAN_No &&
      CIN_No &&
      MSME_status &&
      MSME_No &&
      MSME_Type &&
      TAN_No &&
      // GST_Doc &&
      PAN_Doc &&
      // MSME_Doc &&
      TAN_Doc &&
      RPD_Doc &&
      COC_Doc &&
      NDA_Doc
    ) {

      const data = new FormData();
      data.append("userId", props.userid);
      data.append("Address", Address);
      data.append("Address_2", Address_2);
      data.append("companyName", companyName);
      data.append("Country_Region_Code", Country_Region_Code);
      data.append("state", state);
      data.append("City", City);
      data.append("Post_Code", Post_Code);
      data.append("image", logo);
      data.append("Vendor_Type", vendorType);
      data.append("Vendor_Account_Manager", acManager);
      data.append("mkDenialCheque", mkcheck);
      data.append("financeSpoccontactName", fs_ContactName);
      data.append("financeSpocdesignation", fs_Designation);
      data.append("financeSpocphoneNo", fs_PhoneNo);
      data.append("financeSpocemail", fs_Email);
      data.append("operationSpoccontactName", ops_ContactName);
      data.append("operationSpocdesignation", ops_Designation);
      data.append("operationSpocphoneNo", ops_PhoneNo);
      data.append("operationSpocemail", ops_Email);
      data.append("collectionSpoccontactName", colls_ContactName);
      data.append("collectionSpocdesignation", colls_Designation);
      data.append("collectionSpocphoneNo", colls_PhoneNo);
      data.append("collectionSpocemail", colls_Email);
      data.append("managementSpoccontactName", mngs_ContactName);
      data.append("managementSpocdesignation", mngs_Designation);
      data.append("managementSpocphoneNo", mngs_PhoneNo);
      data.append("managementSpocemail", mngs_Email);
      data.append("contactName", others_ContactName);
      data.append("designation", others_Designation);
      data.append("phoneNo", others_PhoneNo);
      data.append("others_Email", others_Email);
      data.append("mastervendor_email", mastervendor_email);
      data.append("RPD_Doc", RPD_Doc);
      data.append("NDA_Doc", NDA_Doc);
      data.append("COC_Doc", COC_Doc);
      data.append("GST_Doc", GST_Doc);
      data.append("fileDisclosure", fileDisclosure);
      data.append("GST_Vendor_Type", GST_type);
      data.append("GST_Registration_No", GST_No);
      data.append("P_A_N_No", PAN_No);
      data.append("PAN_Doc", PAN_Doc);
      data.append("form_10f_Doc", form_10f);
      data.append("TAN_Doc", TAN_Doc);
      data.append("PE_Declaration_Doc", pe_declaration);
      data.append("MSME_Doc", MSME_Doc);
      data.append("Tax_residency_Doc", Tax_residency);
      data.append("CIN_No", CIN_No);
      data.append("MSMED", MSME_status);
      data.append("MSMED_Number", MSME_No);
      data.append("MSMED_Vendor_Type", MSME_Type);
      data.append("TAN_No", TAN_No);
      data.append("financial_data", financial_data);
      data.append("financial_data2", financial_data2);
      data.append("yearOfAuditedFinancial", yearOfAuditedFinancial);
      data.append("Revenue", Revenue);
      data.append("Profit", Profit);
      data.append("netWorth", netWorth);
      data.append("currentAssets", currentAssets);
      data.append("directorDetails", directorDetails);
      data.append('Account_Holder_Name', bankAccountName);
      data.append('Bank_Name', bankName);
      data.append('Account_No', bankAccountNumber);
      data.append('IFSC_Code', ifscCode);
      data.append('MICRcode', MICRcode);
      data.append('Bank_Address', branchAddress);
      data.append("bankdetailDoc", bankdetailDoc);
      data.append("name", name);
      data.append("contactNumber", contactNumber);
      data.append("email", email);
      data.append("name2", name2);
      data.append("contactNumber2", contactNumber2);
      data.append("email2", email2);
      data.append("name3", name3);
      data.append("contactNumber3", contactNumber3);
      data.append("email3", email3);
      data.append("approverFile", approverFile);

      apiService.updateAllCollection(props.userid, data).then((response) => {
      });


      const data1 = new FormData();
      data1.append("level1Status", "approved");
      data1.append("userId", event);
      apiService.saveApproval(data1).then((responseData) => {
        //erpPost
        if (responseData.data.status === 'success') {
          const ERPData = {
            Address: Address,
            Address_2: Address_2,
            City: City,
            state: state,
            Country_Region_Code: Country_Region_Code,
            Post_Code: Post_Code,
            companyName: companyName,
            Ticket_ID: Math.floor(Math.random() * 1000),
            Vendor_No: "VLOC-3888",
          };
          apiService.postErpResourcePortalVendorlist(ERPData).then((response) => {
            console.log("saved", data);
            const MasterVendor={
              mastervendor_email:mastervendor_email||undefined,
              companyName:mastervendor_email||undefined
            }
            apiService.saveMasterLogin(MasterVendor).then((response) => {
            })
          })
          Swal.fire({
            title: "Approved",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: responseData.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please fill the mandatory fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRegject = (event) => {
    Swal.fire({
      heightAuto: true,
      title: "Review vendor details",
      html: `<div class="rejectstyle">
            <textarea rows="10" cols="30" id="comment" class="swal01-input" placeholder="Comments "></textarea>
            <input type="file" id="rejectdoc" class="swal01-input" placeholder="Select file">
       </div> `,
      confirmButtonText: "Reject",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector("#comment").value;
        const rejectdoc = Swal.getPopup().querySelector("#rejectdoc").files[0];
        if (!comment || !rejectdoc) {
          Swal.showValidationMessage(`Please enter comments and file`);
        } else {
          const data = new FormData();
          data.append("userId", event);
          data.append("level1Status", "rejected");
          data.append("level1RejectComment", comment);
          data.append("level1rejectFileDoc", rejectdoc);

          apiService.saveApproval(data).then((responseData) => {

            if (responseData.data.status === 'success') {
              Swal.fire({
                title: "Rejected",
                icon: "success",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                title: responseData.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          });
        }
      },
    });
  };

  const submitHandler = (e, team) => {
    e.preventDefault();
    if (companyName.length === 0) {
      setcompanyNameErr("Company name is required");
    }
    if (Address.length === 0) {
      setaddress1Err("Address 1 is required");
    }
    if (Country_Region_Code.length === 0) {
      setcountryErr("Country is required");
    }
    if (state.length === 0) {
      setstateErr("State is required");
    }
    if (City.length === 0) {
      setcityErr("City is required");
    }
    if (Post_Code.length === 0) {
      setpinCodeErr("Pincode is required");
    }
    if (!logo) {
      setlogoErr("Logo is required");
      console.log("hellossssssss", logoErr);
    }
    if (fs_ContactName.length === 0) {
      setfs_ContactNameErr("Contact name is required");
    }
    if (fs_Designation.length === 0) {
      setfs_DesignationErr("Designation is required");
    }
    if (fs_PhoneNo.length === 0) {
      setfs_PhoneNoErr("Phone number is required");
    }
    if (fs_Email.length === 0) {
      setfs_EmailErr("Email is required");
    }
    // console.log("fs_Email",fs_Email);
    // console.log("mngs_ContactName",mngs_ContactName);
    // console.log("mngs_Designation",mngs_Designation);
    // console.log("mngs_PhoneNo",mngs_PhoneNo);
    // console.log("mngs_Email",mngs_Email);
    // console.log("mastervendor_email",mastervendor_email);

    if (mngs_ContactName.length === 0) {
      setmngs_ContactNameErr("Contact name is required");
    }
    if (mngs_Designation.length === 0) {
      setmngs_DesignationErr("Designation is required");
    }
    if (mngs_PhoneNo.length === 0) {
      setmngs_PhoneNoErr("Phone number is required");
    }
    if (mngs_Email.length === 0) {
      setmngs_EmailErr("Email is required");
    }
    if (mastervendor_email.length === 0) {
      setmastervendor_emailErr("Email is required");
    }

    if (bankAccountName.length === 0) {
      setbankAccountNameErr("Account name is required");
    }
    if (bankName.length === 0) {
      setbankNameErr("Bank name is required");
    }
    if (bankAccountNumber.length === 0) {
      setbankAccountNumberErr("Account number is required");
    }
    if (ifscCode.length === 0) {
      setifscCodeErr("IFSC code is required");
    }
    if (MICRcode.length === 0) {
      setMICRcodeErr("MICR code is required");
    }
    if (branchAddress.length === 0) {
      setbranchAddressErr("Branch address is required");
    }
    if (!bankdetailDoc) {
      setbankdetailDocErr("Bank document is required");
    }

    if (!RPD_Doc) {
      setRPD_DocErr("RPD document is required");
    }
    if (!COC_Doc) {
      setCOC_DocErr("COC document is required");
    }
    if (!NDA_Doc) {
      setNDA_DocErr("NDA document is required");
    }

    if (name.length === 0) {
      setnameErr("Name is required");
    }
    if (contactNumber.length === 0) {
      setcontactNumberErr("Contact number is required");
    }
    if (email.length === 0) {
      setemailErr("Email is required");
    }

    if (vendorType.length === 0) {
      setvendorTypeErr("Vendor type is required");
    }
    if (acManager.length === 0) {
      setacManagerErr("A/C manager is required");
    }
    if (mkcheck === false) {
      setmkcheckErr("Check is required");
    }

    if (GST_type.length === 0) {
      setGST_typeErr("GST type is required");
    }
    if (GST_No.length === 0) {
      setGST_NoErr("GST Number is required");
    }
    if (!GST_Doc) {
      setGST_DocErr("GST doc is required");
    }
    if (PAN_No.length === 0) {
      setPAN_NoErr("Pan number is required");
    }
    if (!PAN_Doc) {
      setPAN_DocErr("Pan doc is required");
    }
    if (CIN_No.length === 0) {
      setCIN_NoErr("CIN number is required");
    }
    if (!form_10f) {
      setform_10fErr("Form 10f is required");
    }
    if (MSME_status.length === 0) {
      setMSME_statusErr("MSME status is required");
    }
    if (MSME_No.length === 0) {
      setMSME_NoErr("MSME number is required");
    }
    if (!MSME_Doc) {
      setMSME_DocErr("MSME doc is required");
    }
    if (MSME_Type.length === 0) {
      setMSME_TypeErr("MSME type is required");
    }
    if (TAN_No.length === 0) {
      setTAN_NoErr("TAN number is required");
    }
    if (!TAN_Doc) {
      setTAN_DocErr("TAN doc is required");
    }
    if (!Tax_residency) {
      setTax_residencyErr("Tax residency is required");
    }
    if (!pe_declaration) {
      setpe_declarationErr("PE declaration is required");
    }

    const userId = props.userid;
    console.log("companyNameErr", companyName);
    console.log("address1Err", Address);
    console.log("countryErr", Country_Region_Code);
    console.log("stateErr", state);
    console.log("cityErr", City);
    console.log("pinCodeErr", Post_Code);
    console.log("logoErr", logo);
    console.log("fs_ContactNameErr", fs_ContactName);
    console.log("fs_DesignationErr", fs_Designation);
    console.log("fs_PhoneNoErr", fs_PhoneNo);
    console.log("fs_EmailErr", fs_Email);
    console.log("mngs_ContactNameErr", mngs_ContactName);
    console.log("mngs_DesignationErr", mngs_Designation);
    console.log("mngs_PhoneNoErr", mngs_PhoneNo);
    console.log("mngs_EmailErr", mngs_Email);
    console.log("mastervendor_emailErr", mastervendor_email);
    console.log("bankAccountNameErr", bankAccountName);
    console.log("bankNameErr", bankName);
    console.log("bankAccountNumberErr", bankAccountNumber);
    console.log("ifscCodeErr", ifscCode);
    console.log("MICRcodeErr", MICRcode);
    console.log("branchAddressErr", branchAddress);
    console.log("bankdetailDocErr", bankdetailDoc);
    console.log("nameErr", name);
    console.log("contactNumberErr", contactNumber);
    console.log("emailErr", email);
    console.log("vendorTypeErr", vendorType);
    console.log("acManagerErr", acManager);
    console.log("mkcheckErr", mkcheck);
    console.log("GST_typeErr", GST_type);
    console.log("GST_NoErr", GST_No);
    console.log("PAN_NoErr", PAN_No);
    console.log("CIN_NoErr", CIN_No);
    console.log("form_10fErr", form_10f);
    console.log("MSME_statusErr", MSME_status);
    console.log("MSME_NoErr", MSME_No);
    console.log("MSME_TypeErr", MSME_Type);
    console.log("TAN_NoErr", TAN_No);
    console.log("GST_DocErr", GST_Doc);
    console.log("PAN_DocErr", PAN_Doc);
    console.log("MSME_DocErr", MSME_Doc);
    console.log("TAN_DocErr", TAN_Doc);
    console.log("Tax_residencyErr", Tax_residency);
    console.log("pe_declarationErr", pe_declaration);
    console.log("RPD_DocErr", RPD_Doc);
    console.log("COC_DocErr", COC_Doc);
    console.log("NDA_DocErr", NDA_Doc);

    if (
      companyName &&
      Address &&
      Country_Region_Code &&
      state &&
      City &&
      Post_Code &&
      fs_ContactName &&
      fs_Designation &&
      fs_PhoneNo &&
      fs_Email &&
      mngs_ContactName &&
      mngs_Designation &&
      mngs_PhoneNo &&
      mngs_Email &&
      mastervendor_email &&
      bankAccountName &&
      bankName &&
      bankAccountNumber &&
      ifscCode &&
      MICRcode &&
      branchAddress &&
      bankdetailDoc &&
      name &&
      contactNumber &&
      email &&
      vendorType &&
      acManager &&
      mkcheck &&
      GST_type &&
      GST_No &&
      PAN_No &&
      CIN_No &&
      MSME_status &&
      MSME_No &&
      MSME_Type &&
      TAN_No &&
      // GST_Doc &&
      PAN_Doc &&
      // MSME_Doc &&
      TAN_Doc &&
      RPD_Doc &&
      COC_Doc &&
      NDA_Doc
    ) {
      const data = new FormData();
      data.append("userId", props.userid);
      data.append("Address", Address);
      data.append("Address_2", Address_2);
      data.append("companyName", companyName);
      data.append("Country_Region_Code", Country_Region_Code);
      data.append("state", state);
      data.append("City", City);
      data.append("Post_Code", Post_Code);
      data.append("image", logo);
      data.append("Vendor_Type", vendorType);
      data.append("Vendor_Account_Manager", acManager);
      data.append("mkDenialCheque", mkcheck);
      data.append("financeSpoccontactName", fs_ContactName);
      data.append("financeSpocdesignation", fs_Designation);
      data.append("financeSpocphoneNo", fs_PhoneNo);
      data.append("financeSpocemail", fs_Email);
      data.append("operationSpoccontactName", ops_ContactName);
      data.append("operationSpocdesignation", ops_Designation);
      data.append("operationSpocphoneNo", ops_PhoneNo);
      data.append("operationSpocemail", ops_Email);
      data.append("collectionSpoccontactName", colls_ContactName);
      data.append("collectionSpocdesignation", colls_Designation);
      data.append("collectionSpocphoneNo", colls_PhoneNo);
      data.append("collectionSpocemail", colls_Email);
      data.append("managementSpoccontactName", mngs_ContactName);
      data.append("managementSpocdesignation", mngs_Designation);
      data.append("managementSpocphoneNo", mngs_PhoneNo);
      data.append("managementSpocemail", mngs_Email);
      data.append("contactName", others_ContactName);
      data.append("designation", others_Designation);
      data.append("phoneNo", others_PhoneNo);
      data.append("others_Email", others_Email);
      data.append("mastervendor_email", mastervendor_email);
      data.append("RPD_Doc", RPD_Doc);
      data.append("NDA_Doc", NDA_Doc);
      data.append("COC_Doc", COC_Doc);
      data.append("GST_Doc", GST_Doc);
      data.append("fileDisclosure", fileDisclosure);
      data.append("GST_Vendor_Type", GST_type);
      data.append("GST_Registration_No", GST_No);
      data.append("P_A_N_No", PAN_No);
      data.append("PAN_Doc", PAN_Doc);
      data.append("form_10f_Doc", form_10f);
      data.append("TAN_Doc", TAN_Doc);
      data.append("PE_Declaration_Doc", pe_declaration);
      data.append("MSME_Doc", MSME_Doc);
      data.append("Tax_residency_Doc", Tax_residency);
      data.append("CIN_No", CIN_No);
      data.append("MSMED", MSME_status);
      data.append("MSMED_Number", MSME_No);
      data.append("MSMED_Vendor_Type", MSME_Type);
      data.append("TAN_No", TAN_No);
      data.append("financial_data", financial_data);
      data.append("financial_data2", financial_data2);
      data.append("yearOfAuditedFinancial", yearOfAuditedFinancial);
      data.append("Revenue", Revenue);
      data.append("Profit", Profit);
      data.append("netWorth", netWorth);
      data.append("currentAssets", currentAssets);
      data.append("directorDetails", directorDetails);
      data.append('Account_Holder_Name', bankAccountName);
      data.append('Bank_Name', bankName);
      data.append('Account_No', bankAccountNumber);
      data.append('IFSC_Code', ifscCode);
      data.append('MICRcode', MICRcode);
      data.append('Bank_Address', branchAddress);
      data.append("bankdetailDoc", bankdetailDoc);
      data.append("name", name);
      data.append("contactNumber", contactNumber);
      data.append("email", email);
      data.append("name2", name2);
      data.append("contactNumber2", contactNumber2);
      data.append("email2", email2);
      data.append("name3", name3);
      data.append("contactNumber3", contactNumber3);
      data.append("email3", email3);
      data.append("approverFile", approverFile);

      for (var pair of data.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      apiService.updateAllCollection(userId, data).then((response) => {
        console.log("res=============>>>>>>>", response);
        if (response) {
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please fill the mandatory fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const submitMRTHandler = (e, team) => {
    e.preventDefault();
    if (companyName.length === 0) {
      setcompanyNameErr("Company name is required");
    }
    if (Address.length === 0) {
      console.log("hello2222");
      setaddress1Err("Address 1 is required");
    }
    if (Country_Region_Code.length === 0) {
      setcountryErr("Country is required");
    }
    if (state.length === 0) {
      setstateErr("State is required");
    }
    if (City.length === 0) {
      setcityErr("City is required");
    }
    if (Post_Code.length === 0) {
      setpinCodeErr("Pincode is required");
    }
    if (!logo) {
      setlogoErr("Logo is required");
      console.log("hellossssssss", logoErr);
    }
    if (fs_ContactName.length === 0) {
      setfs_ContactNameErr("Contact name is required");
    }
    if (fs_Designation.length === 0) {
      setfs_DesignationErr("Designation is required");
    }
    if (fs_PhoneNo.length === 0) {
      setfs_PhoneNoErr("Phone number is required");
    }
    if (fs_Email.length === 0) {
      setfs_EmailErr("Email is required");
    }
    // console.log("fs_Email",fs_Email);
    // console.log("mngs_ContactName",mngs_ContactName);
    // console.log("mngs_Designation",mngs_Designation);
    // console.log("mngs_PhoneNo",mngs_PhoneNo);
    // console.log("mngs_Email",mngs_Email);
    // console.log("mastervendor_email",mastervendor_email);

    if (mngs_ContactName.length === 0) {
      setmngs_ContactNameErr("Contact name is required");
    }
    if (mngs_Designation.length === 0) {
      setmngs_DesignationErr("Designation is required");
    }
    if (mngs_PhoneNo.length === 0) {
      setmngs_PhoneNoErr("Phone number is required");
    }
    if (mngs_Email.length === 0) {
      setmngs_EmailErr("Email is required");
    }
    if (mastervendor_email.length === 0) {
      setmastervendor_emailErr("Email is required");
    }

    if (bankAccountName.length === 0) {
      setbankAccountNameErr("Account name is required");
    }
    if (bankName.length === 0) {
      setbankNameErr("Bank name is required");
    }
    if (bankAccountNumber.length === 0) {
      setbankAccountNumberErr("Account number is required");
    }
    if (ifscCode.length === 0) {
      setifscCodeErr("IFSC code is required");
    }
    if (MICRcode.length === 0) {
      setMICRcodeErr("MICR code is required");
    }
    if (branchAddress.length === 0) {
      setbranchAddressErr("Branch address is required");
    }
    if (!bankdetailDoc) {
      setbankdetailDocErr("Bank document is required");
    }

    if (!RPD_Doc) {
      setRPD_DocErr("RPD document is required");
    }
    if (!COC_Doc) {
      setCOC_DocErr("COC document is required");
    }
    if (!NDA_Doc) {
      setNDA_DocErr("NDA document is required");
    }

    if (name.length === 0) {
      setnameErr("Name is required");
    }
    if (contactNumber.length === 0) {
      setcontactNumberErr("Contact number is required");
    }
    if (email.length === 0) {
      setemailErr("Email is required");
    }

    if (vendorType.length === 0) {
      setvendorTypeErr("Vendor type is required");
    }
    if (acManager.length === 0) {
      setacManagerErr("A/C manager is required");
    }
    if (mkcheck === false) {
      setmkcheckErr("Check is required");
    }

    if (GST_type.length === 0) {
      setGST_typeErr("GST type is required");
    }
    if (GST_No.length === 0) {
      setGST_NoErr("GST Number is required");
    }
    if (!GST_Doc) {
      setGST_DocErr("GST doc is required");
    }
    if (PAN_No.length === 0) {
      setPAN_NoErr("Pan number is required");
    }
    if (!PAN_Doc) {
      setPAN_DocErr("Pan doc is required");
    }
    if (CIN_No.length === 0) {
      setCIN_NoErr("CIN number is required");
    }
    if (!form_10f) {
      setform_10fErr("Form 10f is required");
    }
    if (MSME_status.length === 0) {
      setMSME_statusErr("MSME status is required");
    }
    if (MSME_No.length === 0) {
      setMSME_NoErr("MSME number is required");
    }
    if (!MSME_Doc) {
      setMSME_DocErr("MSME doc is required");
    }
    if (MSME_Type.length === 0) {
      setMSME_TypeErr("MSME type is required");
    }
    if (TAN_No.length === 0) {
      setTAN_NoErr("TAN number is required");
    }
    if (!TAN_Doc) {
      setTAN_DocErr("TAN doc is required");
    }
    if (!Tax_residency) {
      setTax_residencyErr("Tax residency is required");
    }
    if (!pe_declaration) {
      setpe_declarationErr("PE declaration is required");
    }

    const userId = props.userid;
    console.log("companyNameErr", companyName);
    console.log("address1Err", Address);
    console.log("countryErr", Country_Region_Code);
    console.log("stateErr", state);
    console.log("cityErr", City);
    console.log("pinCodeErr", Post_Code);
    console.log("logoErr", logo);
    console.log("fs_ContactNameErr", fs_ContactName);
    console.log("fs_DesignationErr", fs_Designation);
    console.log("fs_PhoneNoErr", fs_PhoneNo);
    console.log("fs_EmailErr", fs_Email);
    console.log("mngs_ContactNameErr", mngs_ContactName);
    console.log("mngs_DesignationErr", mngs_Designation);
    console.log("mngs_PhoneNoErr", mngs_PhoneNo);
    console.log("mngs_EmailErr", mngs_Email);
    console.log("mastervendor_emailErr", mastervendor_email);
    console.log("bankAccountNameErr", bankAccountName);
    console.log("bankNameErr", bankName);
    console.log("bankAccountNumberErr", bankAccountNumber);
    console.log("ifscCodeErr", ifscCode);
    console.log("MICRcodeErr", MICRcode);
    console.log("branchAddressErr", branchAddress);
    console.log("bankdetailDocErr", bankdetailDoc);
    console.log("nameErr", name);
    console.log("contactNumberErr", contactNumber);
    console.log("emailErr", email);
    console.log("vendorTypeErr", vendorType);
    console.log("acManagerErr", acManager);
    console.log("mkcheckErr", mkcheck);
    console.log("GST_typeErr", GST_type);
    console.log("GST_NoErr", GST_No);
    console.log("PAN_NoErr", PAN_No);
    console.log("CIN_NoErr", CIN_No);
    console.log("form_10fErr", form_10f);
    console.log("MSME_statusErr", MSME_status);
    console.log("MSME_NoErr", MSME_No);
    console.log("MSME_TypeErr", MSME_Type);
    console.log("TAN_NoErr", TAN_No);
    console.log("GST_DocErr", GST_Doc);
    console.log("PAN_DocErr", PAN_Doc);
    console.log("MSME_DocErr", MSME_Doc);
    console.log("TAN_DocErr", TAN_Doc);
    console.log("Tax_residencyErr", Tax_residency);
    console.log("pe_declarationErr", pe_declaration);
    console.log("RPD_DocErr", RPD_Doc);
    console.log("COC_DocErr", COC_Doc);
    console.log("NDA_DocErr", NDA_Doc);

    if (
      companyName &&
      Address &&
      Country_Region_Code &&
      state &&
      City &&
      Post_Code &&
      fs_ContactName &&
      fs_Designation &&
      fs_PhoneNo &&
      fs_Email &&
      mngs_ContactName &&
      mngs_Designation &&
      mngs_PhoneNo &&
      mngs_Email &&
      mastervendor_email &&
      bankAccountName &&
      bankName &&
      bankAccountNumber &&
      ifscCode &&
      MICRcode &&
      branchAddress &&
      bankdetailDoc &&
      name &&
      contactNumber &&
      email &&
      // vendorType &&
      // acManager &&
      // mkcheck &&
      GST_type &&
      GST_No &&
      PAN_No &&
      CIN_No &&
      MSME_status &&
      MSME_No &&
      MSME_Type &&
      TAN_No &&
      // GST_Doc &&
      PAN_Doc &&
      // MSME_Doc &&
      TAN_Doc &&
      RPD_Doc &&
      COC_Doc &&
      NDA_Doc
    ) {
      const data = new FormData();
      data.append("userId", props.userid);
      data.append("Address", Address);
      data.append("Address_2", Address_2);
      data.append("companyName", companyName);
      data.append("Country_Region_Code", Country_Region_Code);
      data.append("state", state);
      data.append("City", City);
      data.append("Post_Code", Post_Code);
      data.append("image", logo);
      data.append("Vendor_Type", vendorType);
      data.append("Vendor_Account_Manager", acManager);
      data.append("mkDenialCheque", mkcheck);
      data.append("financeSpoccontactName", fs_ContactName);
      data.append("financeSpocdesignation", fs_Designation);
      data.append("financeSpocphoneNo", fs_PhoneNo);
      data.append("financeSpocemail", fs_Email);
      data.append("operationSpoccontactName", ops_ContactName);
      data.append("operationSpocdesignation", ops_Designation);
      data.append("operationSpocphoneNo", ops_PhoneNo);
      data.append("operationSpocemail", ops_Email);
      data.append("collectionSpoccontactName", colls_ContactName);
      data.append("collectionSpocdesignation", colls_Designation);
      data.append("collectionSpocphoneNo", colls_PhoneNo);
      data.append("collectionSpocemail", colls_Email);
      data.append("managementSpoccontactName", mngs_ContactName);
      data.append("managementSpocdesignation", mngs_Designation);
      data.append("managementSpocphoneNo", mngs_PhoneNo);
      data.append("managementSpocemail", mngs_Email);
      data.append("contactName", others_ContactName);
      data.append("designation", others_Designation);
      data.append("phoneNo", others_PhoneNo);
      data.append("others_Email", others_Email);
      data.append("mastervendor_email", mastervendor_email);
      data.append("RPD_Doc", RPD_Doc);
      data.append("NDA_Doc", COC_Doc);
      data.append("COC_Doc", NDA_Doc);
      data.append("GST_Doc", GST_Doc);
      data.append("fileDisclosure", fileDisclosure);
      data.append("GST_Vendor_Type", GST_type);
      data.append("GST_Registration_No", GST_No);
      data.append("P_A_N_No", PAN_No);
      data.append("PAN_Doc", PAN_Doc);
      data.append("form_10f_Doc", form_10f);
      data.append("TAN_Doc", TAN_Doc);
      data.append("PE_Declaration_Doc", pe_declaration);
      data.append("MSME_Doc", MSME_Doc);
      data.append("Tax_residency_Doc", Tax_residency);
      data.append("CIN_No", CIN_No);
      data.append("MSMED", MSME_status);
      data.append("MSMED_Number", MSME_No);
      data.append("MSMED_Vendor_Type", MSME_Type);
      data.append("TAN_No", TAN_No);
      data.append("financial_data", financial_data);
      data.append("financial_data2", financial_data2);
      data.append("yearOfAuditedFinancial", yearOfAuditedFinancial);
      data.append("Revenue", Revenue);
      data.append("Profit", Profit);
      data.append("netWorth", netWorth);
      data.append("currentAssets", currentAssets);
      data.append("directorDetails", directorDetails);
      data.append('Account_Holder_Name', bankAccountName);
      data.append('Bank_Name', bankName);
      data.append('Account_No', bankAccountNumber);
      data.append('IFSC_Code', ifscCode);
      data.append('MICRcode', MICRcode);
      data.append('Bank_Address', branchAddress);
      data.append("bankdetailDoc", bankdetailDoc);
      data.append("name", name);
      data.append("contactNumber", contactNumber);
      data.append("email", email);
      data.append("name2", name2);
      data.append("contactNumber2", contactNumber2);
      data.append("email2", email2);
      data.append("name3", name3);
      data.append("contactNumber3", contactNumber3);
      data.append("email3", email3);
      data.append("approverFile", approverFile);
      console.log("Form Submitted", data);

      apiService.updateAllCollection(userId, data).then((response) => {
        console.log("res=============>>>>>>>", response);
        if (response) {
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please fill the mandatory fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Box>
      <div
        className="container-fluid  py-2"
        style={{ backgroundColor: "#f3f4f7" }}
      >
        <form className={style} style={{ marginBottom: "3em" }}>
          {/* <div >onSubmit={submitHandler} */}
          <div className={style}>
            <div style={{ overflowY: "scroll", height: "300px" }}>
              <div
                className="row px-3  pt-3"
                style={{ backgroundColor: "#fff" }}
              >
                <h5 className="headlines">
                  <b>Vendor Details Basic Informations</b>
                </h5>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="companyName*">Company Name</label>
                  <input
                    type="text"
                    className="mb-2 inputbox"
                    name="companyName"
                    value={companyName}
                    onChange={(e) => validatecompanyName(e)}
                  />
                  <span className="formError">{companyNameErr}</span>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="Address">Address 1</label>
                  <input
                    type="text"
                    className="mb-2 inputbox"
                    name="Address"
                    value={Address}
                    onChange={(e) => validateaddress1(e)}
                  />
                  <span className="formError">{address1Err}</span>
                </div>

                {editData[0]?.Address_2 !== "null" && editData[0]?.Address_2 ? (
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="Address_2">Address 2</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="Address_2"
                      value={Address_2}
                      onChange={(e) => validateaddress2(e)}
                    />
                    {/* <span className="formError">{address2Err}</span> */}
                  </div>
                ) : (
                  ""
                )}
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    className="mb-2 inputbox"
                    name="country"
                    value={Country_Region_Code}
                    onChange={(e) => validatecountry(e)}
                  />
                  <span className="formError">{countryErr}</span>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="mb-2 inputbox"
                    name="state"
                    value={state}
                    onChange={(e) => validatestate(e)}
                  />
                  <span className="formError">{stateErr}</span>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="City">City</label>
                  <input
                    type="text"
                    className="mb-2 inputbox"
                    name="City"
                    value={City}
                    onChange={(e) => validatecity(e)}
                  />
                  <span className="formError">{cityErr}</span>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="Post_Code">PinCode</label>
                  <input
                    type="text"
                    className="mb-2 inputbox"
                    name="Post_Code"
                    value={Post_Code}
                    onChange={(e) => validatepinCode(e)}
                  />
                  <span className="formError">{pinCodeErr}</span>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12 mb-0">
                  {style === "cont2" ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handleEditPopup("logo")}
                        className="btn bankbtn btn-primary btn-md mt-3"
                      >
                        View Logo
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleLogoView(logo)}
                      className="btn bankbtn btn-primary btn-md mt-3"
                    >
                      View Logo
                    </button>
                  )}
                  <p className="formError">{logoErr}</p>
                </div>
                {/* <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Phone No.</label>
                                    <input type="text" className="mb-2 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Vendor Payment Term</label>
                                    <input type="text" className="mb-2 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Contact Name</label>
                                    <input type="text" className="mb-2 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Email</label>
                                    <input type="text" className="mb-2 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div> */}
                {/* <div className="col-lg-4 col-sm-6 col-xs-12 mt-2">
                                    <button type="button" className="btn bankbtn btn-primary btn-md m-2">View logo</button>
                                </div> */}
              </div>

              <div className="row px-3" style={{ backgroundColor: "#fff" }}>
                <h5 className="headlines">
                  <b>Communication Details</b>
                </h5>
                <p>
                  <b>Finance Spoc</b>
                </p>
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="fs_ContactName">Contact Name</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="fs_ContactName"
                      value={fs_ContactName}
                      onChange={(e) => validatefs_ContactName(e)}
                    />
                    <span className="formError">{fs_ContactNameErr}</span>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="fs_Designation">Designation</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="fs_Designation"
                      value={fs_Designation}
                      onChange={(e) => validatefs_Designation(e)}
                    />
                    <span className="formError">{fs_DesignationErr}</span>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="fs_PhoneNo">Phone no</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="fs_PhoneNo"
                      value={fs_PhoneNo}
                      onChange={(e) => validatefs_PhoneNo(e)}
                    />
                    <span className="formError">{fs_PhoneNoErr}</span>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="fs_Email">Email</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="fs_Email"
                      value={fs_Email}
                      onChange={(e) => validatefs_Email(e)}
                    />
                    <span className="formError">{fs_EmailErr}</span>
                  </div>
                </div>
                {/* {editCommmData[0]?.operationSpoccontactName &&
                  editCommmData[0]?.operationSpocdesignation &&
                  editCommmData[0]?.operationSpocphoneNo &&
                  editCommmData[0]?.operationSpocemail ? ( */}

                <>
                  {(editCommmData[0]?.operationSpoccontactName !== "null" &&
                    editCommmData[0]?.operationSpoccontactName) ||
                   ( editCommmData[0]?.operationSpocdesignation !== "null" &&
                    editCommmData[0]?.operationSpocdesignation)||
                    (editCommmData[0]?.operationSpocphoneNo !== "null" &&
                    editCommmData[0]?.operationSpocphoneNo) ||
                    (editCommmData[0]?.operationSpocemail !== "null" &&
                    editCommmData[0]?.operationSpocemail) ? (
                    <p>
                      <b>Operation Spoc</b>
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="row">
                    {(editCommmData[0]?.operationSpoccontactName !== "null" &&
                      editCommmData[0]?.operationSpoccontactName) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="ops_ContactName">Contact Name</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="ops_ContactName"
                          value={ops_ContactName}
                          onChange={(e) => setops_ContactName(e.target.value)}
                        />
                      </div>
                      : ""}
                    {(editCommmData[0]?.operationSpocdesignation !== "null" &&
                      editCommmData[0]?.operationSpocdesignation) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="ops_Designation">Designation</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="ops_Designation"
                          value={ops_Designation}
                          onChange={(e) => setops_Designation(e.target.value)}
                        />
                      </div>
                      : ""}
                    {(editCommmData[0]?.operationSpocphoneNo !== "null" &&
                      editCommmData[0]?.operationSpocphoneNo) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="ops_PhoneNo">Phone no</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="ops_PhoneNo"
                          value={ops_PhoneNo}
                          onChange={(e) => setops_PhoneNo(e.target.value)}
                        />
                      </div> : ""}
                    {(editCommmData[0]?.operationSpocemail !== "null" &&
                      editCommmData[0]?.operationSpocemail) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="ops_Email">Email</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="ops_Email"
                          value={ops_Email}
                          onChange={(e) => setops_Email(e.target.value)}
                        />
                      </div> : ""}
                  </div>
                </>

                {/* {editCommmData[0]?.collectionSpoccontactName &&
                  editCommmData[0]?.collectionSpocdesignation &&
                  editCommmData[0]?.collectionSpocphoneNo &&
                  editCommmData[0]?.collectionSpocemail ? ( */}

                <>
                  {(editCommmData[0]?.collectionSpoccontactName !== "null" &&
                    editCommmData[0]?.collectionSpoccontactName) ||
                    (editCommmData[0]?.collectionSpocdesignation !== "null" &&
                      editCommmData[0]?.collectionSpocdesignation) ||
                    (editCommmData[0]?.collectionSpocphoneNo !== "null" &&
                      editCommmData[0]?.collectionSpocphoneNo) ||
                    (editCommmData[0]?.collectionSpocemail !== "null" &&
                      editCommmData[0]?.collectionSpocemail) ? (
                    <p>
                      <b>Collection Spoc</b>
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="row">
                    {(editCommmData[0]?.collectionSpoccontactName !== "null" &&
                      editCommmData[0]?.collectionSpoccontactName) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="country">Contact Name</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="colls_ContactName"
                          value={colls_ContactName}
                          onChange={(e) => setcolls_ContactName(e.target.value)}
                        />
                      </div>
                      : ""}
                    {(editCommmData[0]?.collectionSpocdesignation !== "null" &&
                      editCommmData[0]?.collectionSpocdesignation) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="country">Designation</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="colls_Designation"
                          value={colls_Designation}
                          onChange={(e) => setcolls_Designation(e.target.value)}
                        />
                      </div>
                      : ""}
                    {(editCommmData[0]?.collectionSpocphoneNo !== "null" &&
                      editCommmData[0]?.collectionSpocphoneNo) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="country">Phone no</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="colls_PhoneNo"
                          value={colls_PhoneNo}
                          onChange={(e) => setcolls_PhoneNo(e.target.value)}
                        />
                      </div>
                      : ""}
                    {(editCommmData[0]?.collectionSpocemail !== "null" &&
                      editCommmData[0]?.collectionSpocemail) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="country">Email</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="colls_Email"
                          value={colls_Email}
                          onChange={(e) => setcolls_Email(e.target.value)}
                        />
                      </div>
                      : ""}
                  </div>
                </>

                <p>
                  <b>Management Spoc</b>
                </p>
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="mngs_ContactName">Contact Name</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="mngs_ContactName"
                      value={mngs_ContactName}
                      onChange={(e) => validatemngs_ContactName(e)}
                    />
                    <span className="formError">{mngs_ContactNameErr}</span>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="mngs_Designation">Designation</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="mngs_Designation"
                      value={mngs_Designation}
                      onChange={(e) => validatemngs_Designation(e)}
                    />
                    <span className="formError">{mngs_DesignationErr}</span>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="mngs_PhoneNo">Phone no</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="mngs_PhoneNo"
                      value={mngs_PhoneNo}
                      onChange={(e) => validatemngs_PhoneNo(e)}
                    />
                    <span className="formError">{mngs_PhoneNoErr}</span>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="mngs_Email">Email</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="mngs_Email"
                      value={mngs_Email}
                      onChange={(e) => validatemngs_Email(e)}
                    />
                    <span className="formError">{mngs_EmailErr}</span>
                  </div>
                </div>
                {/* {editCommmData[0]?.contactName &&
                  editCommmData[0]?.designation &&
                  editCommmData[0]?.phoneNo &&
                  editCommmData[0]?.email ? ( */}

                <>
                  {(editCommmData[0]?.contactName !== "null" &&
                    editCommmData[0]?.contactName) ||
                    (editCommmData[0]?.designation !== "null" &&
                      editCommmData[0]?.designation) ||
                    (editCommmData[0]?.phoneNo !== "null" &&
                      editCommmData[0]?.phoneNo) ||
                    (editCommmData[0]?.email !== "null" &&
                      editCommmData[0]?.email) ? (
                    <p>
                      <b>Others</b>
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="row">
                    {(editCommmData[0]?.contactName !== "null" &&
                      editCommmData[0]?.contactName) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="others_ContactName">Contact Name</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="others_ContactName"
                          value={others_ContactName}
                          onChange={(e) =>
                            setothers_ContactName(e.target.value)
                          }
                        />
                      </div>
                      : ""}

                    {(editCommmData[0]?.designation !== "null" &&
                      editCommmData[0]?.designation) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="others_Designation">Designation</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="others_Designation"
                          value={others_Designation}
                          onChange={(e) =>
                            setothers_Designation(e.target.value)
                          }
                        />
                      </div>
                      : ""}
                    {(editCommmData[0]?.phoneNo !== "null" &&
                      editCommmData[0]?.phoneNo) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="others_PhoneNo">Phone no</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="others_PhoneNo"
                          value={others_PhoneNo}
                          onChange={(e) => setothers_PhoneNo(e.target.value)}
                        />
                      </div>
                      : ""}
                    {(editCommmData[0]?.email !== "null" &&
                      editCommmData[0]?.email) ?
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="others_Email">Email</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="others_Email"
                          value={others_Email}
                          onChange={(e) => setothers_Email(e.target.value)}
                        />
                      </div>
                      : ""}
                  </div>
                </>

                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="Post_Code">Master vendor email id*</label>
                  <input
                    type="text"
                    className="mb-2 inputbox"
                    name="mastervendor_email"
                    value={mastervendor_email}
                    onChange={(e) => validatemastervendor_email(e)}
                  />
                  <span className="formError">{mastervendor_emailErr}</span>
                </div>
              </div>

              <div className="row px-3" style={{ backgroundColor: "#fff" }}>
                <h5 className="headlines">
                  <b>Statutary Details</b>
                </h5>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                    <div className="row">
                      <label>Vendor GST Type*</label>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="GST_Vendor_Type"
                            id="flexRadioDefault1"
                            value={"Registered"}
                            checked={GST_type === "Registered"}
                            // disabled={GST_type !== "Registered" ? true : false}
                            onChange={(e) => validateGST_type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Registered
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="GST_Vendor_Type"
                            id="flexRadioDefault2"
                            value={"UnRegistered"}
                            checked={GST_type === "UnRegistered"}
                            // disabled={GST_type !== "UnRegistered" ? true : false}
                            onChange={(e) => validateGST_type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            UnRegistered
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="GST_Vendor_Type"
                            id="flexRadioDefault3"
                            value={"Import"}
                            checked={GST_type === "Import"}
                            // disabled={GST_type !== "Import" ? true : false}
                            onChange={(e) => validateGST_type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault3"
                          >
                            Import
                          </label>
                        </div>
                      </div>
                      <span className="formError">{GST_typeErr}</span>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                    <div className="row">
                      <label>MSME status*</label>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="MSMED"
                            id="MSME_status1"
                            value={"Registered"}
                            checked={MSME_status === "Registered"}
                            onChange={(e) => validateMSME_status(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="MSME_status1"
                          >
                            Registered
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="MSMED"
                            id="MSME_status2"
                            value={"UnRegistered"}
                            checked={MSME_status === "UnRegistered"}
                            onChange={(e) => validateMSME_status(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="MSME_status2"
                          >
                            UnRegistered
                          </label>
                        </div>
                      </div>
                      <span className="formError">{MSME_statusErr}</span>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-2">
                    <div className="row">
                      <div className="col-sm-12 col-lg-8">
                        <label htmlFor="GST_Registration_No">GST no*</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="GST_Registration_No"
                          value={GST_No}
                          onChange={(e) => validateGST_No(e)}
                        />
                        <span className="formError">{GST_NoErr}</span>
                      </div>
                      {GST_type === "Registered" ? (
                        <div className="col-sm-12 col-lg-4 m-auto">
                          {style === "cont2" ? (
                            <>
                              <button
                                type="button"
                                onClick={(e) => handleEditPopup("GST_Doc")}
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleView(GST_Doc)}
                              className="btn bankbtn btn-primary btn-md mt-3"
                            >
                              View File
                            </button>
                          )}
                          <p className="formError">{GST_DocErr}</p>
                        </div>
                      ) : (
                        <></>
                      )}
                      {GST_type === "UnRegistered" ? (
                        <div className="col-sm-12 col-lg-4 m-auto">
                          {style === "cont2" ? (
                            <>
                              <button
                                type="button"
                                onClick={(e) => handleEditPopup("fileDisclosure")}
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleView(fileDisclosure)}
                              className="btn bankbtn btn-primary btn-md mt-3"
                            >
                              View File
                            </button>
                          )}
                          <p className="formError">{fileDisclosureErr}</p>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-2">
                    <div className="row">
                      <div className="col-sm-12 col-lg-8">
                        <label htmlFor="MSME_No">MSME no*</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="MSME_No"
                          value={MSME_No}
                          onChange={(e) => validateMSME_No(e)}
                        />
                        <span className="formError">{MSME_NoErr}</span>
                      </div>
                      {editStatData[0]?.MSME_Doc ? (
                        <div className="col-sm-12 col-lg-4 m-auto">
                          {style === "cont2" ? (
                            <button
                              type="button"
                              onClick={(e) => handleEditPopup("MSME_Doc")}
                              className="btn bankbtn btn-primary btn-md mt-3"
                            >
                              View File
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleView(MSME_Doc)}
                              className="btn bankbtn btn-primary btn-md mt-3"
                            >
                              View File
                            </button>
                          )}
                          <p className="formError">{MSME_DocErr}</p>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                    <div className="row">
                      <div className="col-sm-12 col-lg-8">
                        <label htmlFor="P_A_N_No">PAN no*</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="P_A_N_No"
                          value={PAN_No}
                          onChange={(e) => validatePAN_No(e)}
                        />
                        <span className="formError">{PAN_NoErr}</span>
                      </div>
                      <div className="col-sm-12 col-lg-4 m-auto">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("PAN_Doc")}
                            className="btn bankbtn btn-primary btn-md mt-3"
                          >
                            View File
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(PAN_Doc)}
                            className="btn bankbtn btn-primary btn-md mt-3"
                          >
                            View File
                          </button>
                        )}
                        <p className="formError">{PAN_DocErr}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                    <div className="row">
                      <label>MSME Type*</label>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="MSME_Type"
                            id="MSME_Type1"
                            value={"Micro"}
                            checked={MSME_Type === "Micro"}
                            onChange={(e) => validateMSME_Type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="MSME_Type1"
                          >
                            Micro
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="MSME_Type"
                            id="MSME_Type2"
                            value={"Small"}
                            checked={MSME_Type === "Small"}
                            onChange={(e) => validateMSME_Type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="MSME_Type2"
                          >
                            Small
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="MSME_Type"
                            id="MSME_Type3"
                            value={"Macro"}
                            checked={MSME_Type === "Macro"}
                            onChange={(e) => validateMSME_Type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="MSME_Type3"
                          >
                            Medium
                          </label>
                        </div>
                      </div>
                      <span className="formError">{MSME_TypeErr}</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                    {/* <div className="row">
                                            <div className="col-sm-12 col-md-8"> */}
                    <label htmlFor="CIN_No">CIN no*</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="CIN_No"
                      value={CIN_No}
                      onChange={(e) => validateCIN_No(e)}
                    />
                    {/* </div> */}
                    {/* </div> */}
                    <span className="formError">{CIN_NoErr}</span>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12">
                    <div className="row">
                      <div className="col-sm-12 col-lg-8">
                        <label htmlFor="TAN_No">TAN no*</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="TAN_No"
                          value={TAN_No}
                          onChange={(e) => validateTAN_No(e)}
                        />
                        <span className="formError">{TAN_NoErr}</span>
                      </div>
                      <div className="col-sm-12 col-lg-4 m-auto ">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("TAN_Doc")}
                            className="btn bankbtn btn-primary btn-md mt-3"
                          >
                            View File
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(TAN_Doc)}
                            className="btn bankbtn btn-primary btn-md mt-3"
                          >
                            View File
                          </button>
                        )}
                        <p className="formError">{TAN_DocErr}</p>
                      </div>
                    </div>
                  </div>

                  {editStatData[0]?.form_10f_Doc && Country_Region_Code !== "IN" ? (
                    <>
                      <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                        <div className="row text-center">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            <label className="banklabel mt-2">Form 10F*</label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            {style === "cont2" ? (
                              <button
                                type="button"
                                onClick={(e) => handleEditPopup("form_10f")}
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => handleView(form_10f)}
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            )}
                          </div>
                        </div>

                        {/* <label htmlFor="form_10f">Form 10F*</label>
                                        <input type="text" className="mb-2 inputbox" name="form_10f" value={form_10f} onChange={(e) => validateform_10f(e)}   /> */}

                        <span className="formError">{form_10fErr}</span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {editStatData[0]?.Tax_residency_Doc && Country_Region_Code !== "IN" ? (
                    <>
                      <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                        <div className="row text-center">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            <label className="banklabel mt-2">
                              Tax Residency certificate*
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            {style === "cont2" ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleEditPopup("Tax_residency")
                                }
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => handleView(Tax_residency)}
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            )}
                          </div>
                        </div>
                        {/* <label htmlFor="Tax_residency">Tax Residency certificate*</label>
                                        <input type="text" className="mb-2 inputbox" name="Tax_residency" value={Tax_residency} onChange={(e) => validateTax_residency(e)}  /> */}
                        <span className="formError">{Tax_residencyErr}</span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {editStatData[0]?.PE_Declaration_Doc && Country_Region_Code !== "IN" ? (
                    <>
                      <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                        <div className="row text-center">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            <label className="banklabel mt-2">
                              No PE declaration*
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            {style === "cont2" ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleEditPopup("pe_declaration")
                                }
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => handleView(pe_declaration)}
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            )}
                          </div>
                        </div>
                        {/* <label htmlFor="pe_declaration">No PE declaration*</label>
                                        <input type="text" className="mb-2 inputbox" name="pe_declaration" value={pe_declaration} onChange={(e) => validatepe_declaration(e)}  /> */}
                        <span className="formError">{pe_declarationErr}</span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div
                className="row px-3 pt-2"
                style={{ backgroundColor: "#fff" }}
              >
                <h5 className="headlines">
                  <b>Compliance Details</b>
                </h5>
                <div className="row text-center">
                  <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                    <div className="row text-center">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                        <label className="banklabel">
                          Related party disclosure*
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("RPD_Doc")}
                            className="btn bankbtn btn-primary btn-md  m-1"
                          >
                            View File
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(RPD_Doc)}
                            className="btn bankbtn btn-primary btn-md mt-1"
                          >
                            View File
                          </button>
                        )}
                        {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button> */}
                      </div>
                      <span className="formError">{RPD_DocErr}</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                    <div className="row text-center">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                        <label className="banklabel">
                          COC for services support/ installation*
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("COC_Doc")}
                            className="btn bankbtn btn-primary btn-md m-1"
                          >
                            View File
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(COC_Doc)}
                            className="btn bankbtn btn-primary btn-md mt-1"
                          >
                            View File
                          </button>
                        )}
                        {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button> */}
                      </div>
                      <span className="formError">{COC_DocErr}</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                    <div className="row text-center">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <label className="banklabel">
                          Non disclosure agreement*
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("NDA_Doc")}
                            className="btn bankbtn btn-primary btn-md m-1"
                          >
                            View File
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(NDA_Doc)}
                            className="btn bankbtn btn-primary btn-md mt-1"
                          >
                            View File
                          </button>
                        )}
                        {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button> */}
                      </div>
                      <span className="formError">{NDA_DocErr}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row px-3 pt-2"
                style={{ backgroundColor: "#fff" }}
              >
                <h5 className="headlines">
                  <b>Bank Details</b>
                </h5>
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Name as per Bank A/c</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="Account_Holder_Name"
                      value={bankAccountName}
                      onChange={(e) => validatebankAccountName(e)}
                    />
                    <span className="formError">{bankAccountNameErr}</span>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">IFSC code*</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="IFSC_Code"
                      value={ifscCode}
                      onChange={(e) => validateifscCode(e)}
                    />
                    <span className="formError">{ifscCodeErr}</span>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Bank name*</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="Bank_Name"
                      value={bankName}
                      onChange={(e) => validatebankName(e)}
                    />
                    <span className="formError">{bankNameErr}</span>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">MICR code/ Swift code*</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="MICRcode"
                      value={MICRcode}
                      onChange={(e) => validateMICRcode(e)}
                    />
                    <span className="formError">{MICRcodeErr}</span>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Bank A/C no*</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="Account_No"
                      value={bankAccountNumber}
                      onChange={(e) => validatebankAccountNumber(e)}
                    />
                    <span className="formError">{bankAccountNumberErr}</span>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Branch address*</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="Bank_Address"
                      value={branchAddress}
                      onChange={(e) => validatebranchAddress(e)}
                    />
                    <span className="formError">{branchAddressErr}</span>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-2">
                    <div className="d-flex">
                      <div className="p-2 ">
                        <label className="banklabel mt-2">
                          Copy of cancel Cheque/Bank detail duly certified from
                          bank*
                        </label>
                      </div>
                      <div className="p-2 justify-content-start my-auto">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("bankdetailDoc")}
                            className="btn bankbtn btn-primary btn-md "
                          >
                            View File
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(bankdetailDoc)}
                            className="btn bankbtn btn-primary btn-md "
                          >
                            View File
                          </button>
                        )}
                        <p className="formError">{bankdetailDocErr}</p>
                      </div>
                    </div>

                    {/* {style === "cont2" ?
                                            <button type="button" onClick={handleRegject} className="btn bankbtn btn-primary btn-md m-2">View File</button>
                                            : <button type="button" className="btn bankbtn btn-primary btn-md m-2">View File</button>} */}
                  </div>
                </div>
              </div>
              {/* { editFinanceData[0] ?<> */}
              {/* { editFinanceData[0]?.yearOfAuditedFinancial || editFinanceData[0]?.Revenue || editFinanceData[0]?.Profit || editFinanceData[0]?.netWorth || editFinanceData[0]?.currentAssets || editFinanceData[0]?.directorDetails || editFinanceData[0]?.financial_data || editFinanceData[0]?.financial_data2 ? <> */}
              <div
                className="row px-3 pt-2"
                style={{ backgroundColor: "#fff" }}
              >
                <h5 className="headlines">
                  <b>Financial Details</b>
                </h5>
                <div className="row">
                  {/* {editFinanceData[0]?.yearOfAuditedFinancial ? ( */}
                  {editFinanceData[0]?.yearOfAuditedFinancial !== "null" &&
                    editFinanceData[0]?.yearOfAuditedFinancial ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">
                        Year of audited financials
                      </label>
                      <input
                        type="text"
                        className="mb-2 inputbox"
                        name="yearOfAuditedFinancial"
                        value={yearOfAuditedFinancial}
                        onChange={(e) =>
                          setyearOfAuditedFinancial(e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.Revenue ? ( */}
                  {editFinanceData[0]?.Revenue !== "null" &&
                    editFinanceData[0]?.Revenue ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">Revenue</label>
                      <input
                        type="text"
                        className="mb-2 inputbox"
                        name="Revenue"
                        value={Revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.Profit ? ( */}
                  {editFinanceData[0]?.Profit !== "null" &&
                    editFinanceData[0]?.Profit ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">Profit</label>
                      <input
                        type="text"
                        className="mb-2 inputbox"
                        name="Profit"
                        value={Profit}
                        onChange={(e) => setProfit(e.target.value)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.netWorth ? ( */}
                  {editFinanceData[0]?.netWorth !== "null" &&
                    editFinanceData[0]?.netWorth ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">Networth</label>
                      <input
                        type="text"
                        className="mb-2 inputbox"
                        name="netWorth"
                        value={netWorth}
                        onChange={(e) => setnetWorth(e.target.value)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.currentAssets ? ( */}
                  {editFinanceData[0]?.currentAssets !== "null" &&
                    editFinanceData[0]?.currentAssets ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">Current Assets</label>
                      <input
                        type="text"
                        className="mb-2 inputbox"
                        name="currentAssets"
                        value={currentAssets}
                        onChange={(e) => setcurrentAssets(e.target.value)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.directorDetails ? ( */}
                  {editFinanceData[0]?.directorDetails !== "null" &&
                    editFinanceData[0]?.directorDetails ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">Director detail</label>
                      <input
                        type="text"
                        className="mb-2 inputbox"
                        name="directorDetails"
                        value={directorDetails}
                        onChange={(e) => setdirectorDetails(e.target.value)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.financial_data ? ( */}

                  {editFinanceData[0]?.financial_data !== "null" &&
                    editFinanceData[0]?.financial_data ? (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 my-auto">
                      {style === "cont2" ? (
                        <button
                          type="button"
                          onClick={(e) => handleEditPopup("financial_data")}
                          className="btn bankbtn btn-primary btn-md mt-2"
                        >
                          Financials data
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleView(financial_data)}
                          className="btn bankbtn btn-primary btn-md mt-2"
                        >
                          Financials data
                        </button>
                      )}
                      {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">Financials data</button> */}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.financial_data2 ? ( */}
                  {editFinanceData[0]?.financial_data2 !== "null" &&
                    editFinanceData[0]?.financial_data2 ? (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                      {style === "cont2" ? (
                        <button
                          type="button"
                          onClick={(e) => handleEditPopup("financial_data2")}
                          className="btn bankbtn btn-primary btn-md m-1"
                        >
                          Financials data 2
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleView(financial_data2)}
                          className="btn bankbtn btn-primary btn-md mt-1"
                        >
                          Financials data 2
                        </button>
                      )}
                      {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">Financials data 2</button> */}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* </> : ""} */}
              {/* </>:<></>} */}
              <div
                className="row px-3 pt-2"
                style={{ backgroundColor: "#fff" }}
              >
                <h5 className="headlines">
                  <b>Hitachi Contact Team</b>
                </h5>
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Name*</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="name"
                      value={name}
                      onChange={(e) => validatename(e)}
                    />
                    <span className="formError">{nameErr}</span>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Email*</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="email"
                      value={email}
                      onChange={(e) => validateemail(e)}
                    />
                    <span className="formError">{emailErr}</span>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Contact number*</label>
                    <input
                      type="text"
                      className="mb-2 inputbox"
                      name="contactNumber"
                      value={contactNumber}
                      onChange={(e) => validatecontactNumber(e)}
                    />
                    <span className="formError">{contactNumberErr}</span>
                  </div>
                </div>

                <>
                  <div className="row">
                    {editContactData[0]?.contactName2 !== "null" &&
                      editContactData[0]?.contactName2 ?
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Name*</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="name2"
                          value={name2}
                          onChange={(e) => setname2(e.target.value)}
                        />
                      </div>
                      : ""}

                    {editContactData[0]?.emailId2 !== "null" &&
                      editContactData[0]?.emailId2 ?
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Email*</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="email2"
                          value={email2}
                          onChange={(e) => setemail2(e.target.value)}
                        />
                      </div>
                      : ""}
                    {editContactData[0]?.contactNumber2 !== "null" &&
                      editContactData[0]?.contactNumber2 ?
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Contact Number*</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="contactNumber2"
                          value={contactNumber2}
                          onChange={(e) => setcontactNumber2(e.target.value)}
                        />
                      </div>
                      : ""}
                  </div>
                </>

                <>
                  <div className="row">
                    {editContactData[0]?.contactName3 !== "null" &&
                      editContactData[0]?.contactName3 ?
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Name*</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="name3"
                          value={name3}
                          onChange={(e) => setname3(e.target.value)}
                        />
                      </div>
                      : ""}
                    {editContactData[0]?.emailId3 !== "null" &&
                      editContactData[0]?.emailId3 ?
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Email*</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="email3"
                          value={email3}
                          onChange={(e) => setemail3(e.target.value)}
                        />
                      </div>
                      : ""}
                    {editContactData[0]?.contactNumber3 !== "null" &&
                      editContactData[0]?.contactNumber3 ?
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Contact Number*</label>
                        <input
                          type="text"
                          className="mb-2 inputbox"
                          name="contactNumber3"
                          value={contactNumber3}
                          onChange={(e) => setcontactNumber3(e.target.value)}
                        />
                      </div>
                      : ""}
                  </div>
                </>
              </div>
            </div>

            {props.approvedV === "approvalTeam" ? (
              <>
                <div className="section2">
                  <div className="row px-3 pt-2">
                    <div className="col-lg-4 col-sm-6 col-xs-12 mb-3">
                      <label htmlFor="Distributors">Vendor Type</label>
                      <select
                        className="form-select"
                        id="Distributors"
                        name="vendorType"
                        aria-label="Disabled select example"
                        value={vendorType}
                        disabled={style === "approvalsform" ? true : false}
                        onChange={(e) => validatevendorType(e)}
                      >
                        {/* <option selected>Open this select menu</option> */}
                        <option value="Distributor">Distributor</option>
                        <option value="import">import</option>
                        <option value="OEM">OEM</option>
                        <option value="local vendor">local vendor</option>
                        <option value="others">others</option>
                      </select>
                      <span className="formError">{vendorTypeErr}</span>
                    </div>
                    <div className="col-lg-8 col-sm-6 col-xs-12 pt-1">
                      <span>Vendor A/C Manager</span>
                      <div className="row">
                        <div className="col-lg-3 col-sm-12 col-xs-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="acManager"
                              id="acManager1"
                              value={"Rajender San"}
                              checked={acManager === "Rajender San"}
                              onChange={(e) => validateacManager(e)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="acManager1"
                            >
                              Rajender San
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-12 col-xs-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="acManager"
                              id="acManager2"
                              value={"Keshav San"}
                              checked={acManager === "Keshav San"}
                              onChange={(e) => validateacManager(e)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="acManager2"
                            >
                              Keshav San
                            </label>
                          </div>
                          <span className="formError">{acManagerErr}</span>
                        </div>
                        <div className="col-lg-3 col-sm-12 col-xs-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="mkcheck1"
                              name="mkcheck"
                              checked={mkcheck}
                              onChange={(e) => validatemkcheck(e)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="mkcheck1"
                            >
                              MK Denial Check
                            </label>
                          </div>
                          <span className="formError">{mkcheckErr}</span>
                        </div>

                        <div className="approvalManagerfile col-lg-3 col-sm-12 col-xs-12">
                          <label htmlFor="approverFile1">Select File</label>
                          <input
                            type="file"
                            id="approverFile1"
                            name="approverFile"
                            onChange={onApproverFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          {props.japan ? (
            <>
              <div className="float-end my-2">
                <button
                  type="button"
                  onClick={(e) => handleConcernFound(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Concern found
                </button>
                <button
                  type="button"
                  onClick={(e) => handleNoConcernFound(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  No Concern found
                </button>
              </div>
            </>
          ) : props.MRT ? (
            <>
              <div className="float-end">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  {style === "cont2" ? "View" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={(e) => submitMRTHandler(e, "MRTsubmit")}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={(e) => handleMRTReject(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={(e) => handleMRTApprove(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Approve
                </button>
              </div>
            </>
          ) : props.approvedV ? (
            <>
              <div className="float-end">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  {style === "cont2" ? "View" : "Edit"}

                </button>
                <button
                  type="button"
                  onClick={(e) => submitHandler(e, "VCTsubmit")}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={(e) => handleRegject(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={(e) => handleApprove(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Approve
                </button>
              </div>
            </>
          ) : (
            <></>
          )}

          {/* </div> */}
        </form>
      </div>
    </Box>
  );
}

export default ApprovalFields;
