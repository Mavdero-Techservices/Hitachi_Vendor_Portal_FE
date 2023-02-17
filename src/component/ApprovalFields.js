import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import "../css/ApprovalFields.css";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
function ApprovalFields(props) {
    const GSTValidation = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
    const PANValidation = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    const numberValidation = /^-?(0|[1-9]\d*)?$/
    const emailValidation = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    // console.log("propssssssssssssssssssss", props.vendordata)
    // const [values, setValues] = useState({
    //     userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    // });
    // const basicInfo =[];

    // apiService.getAllCollection(values.userId)
    //     .then(res => {
    //         basicInfo.push(res.data.basicInfo[0])
    //         console.log("res===============AL collection data11111====>>>", res)
    //     })
    // console.log("basicInfo=================>>>", props?.vendordata[0]?.basicInfo[0]?.companyName)
    // const [company_logo, setcompany_logo] = useState("");
    // let basicdata=props.vendordata?.basicInfo?props.vendordata.basicInfo:[];
    // const [alldata, setalldata] = useState("");
    // const [vendorDetail, setvendorDetail] = useState([]);
    useEffect(() => {
        apiService.getAllCollection(props.userid)
            .then(res => {
                if ((res.data.basicInfo[0] !== "null") && (res.data.basicInfo.length > 0)) {
                    setaddress1(res.data.basicInfo[0].address1);
                    setaddress2(res.data.basicInfo[0].address2)
                    setcompanyName(res.data.basicInfo[0].companyName)
                    setcountry(res.data.basicInfo[0].country)
                    setstate(res.data.basicInfo[0].state)
                    setcity(res.data.basicInfo[0].city)
                    setpinCode(res.data.basicInfo[0].pinCode)
                } else {
                    setaddress1("");
                    setaddress2("")
                    setcompanyName("")
                    setcountry("")
                    setstate("")
                    setcity("")
                    setpinCode("")
                }

                if (res.data.CommunicationDetails) {
                    if ((res.data.CommunicationDetails[0] !== "null") && (res.data.CommunicationDetails.length > 0)) {
                        setfs_ContactName(res.data.CommunicationDetails[0].financeSpoccontactName);
                        setfs_Designation(res.data.CommunicationDetails[0].financeSpocdesignation)
                        setfs_PhoneNo(res.data.CommunicationDetails[0].financeSpocphoneNo)
                        setfs_Email(res.data.CommunicationDetails[0].financeSpocemail)
                        setops_ContactName(res.data.CommunicationDetails[0].operationSpoccontactName)
                        setops_Designation(res.data.CommunicationDetails[0].operationSpocdesignation)
                        setops_PhoneNo(res.data.CommunicationDetails[0].operationSpocphoneNo)
                        setops_Email(res.data.CommunicationDetails[0].operationSpocemail);
                        setcolls_ContactName(res.data.CommunicationDetails[0].collectionSpoccontactName)
                        setcolls_Designation(res.data.CommunicationDetails[0].collectionSpocdesignation)
                        setcolls_PhoneNo(res.data.CommunicationDetails[0].collectionSpocphoneNo)
                        setcolls_Email(res.data.CommunicationDetails[0].collectionSpocemail)
                        setmngs_ContactName(res.data.CommunicationDetails[0].managementSpoccontactName)
                        setmngs_Designation(res.data.CommunicationDetails[0].managementSpocdesignation)
                        setmngs_PhoneNo(res.data.CommunicationDetails[0].managementSpocphoneNo);
                        setmngs_Email(res.data.CommunicationDetails[0].managementSpocemail)
                        setothers_ContactName(res.data.CommunicationDetails[0].contactName)
                        setothers_Designation(res.data.CommunicationDetails[0].designation)
                        setothers_PhoneNo(res.data.CommunicationDetails[0].phoneNo)
                        setothers_Email(res.data.CommunicationDetails[0].email)
                        setmastervendor_email(res.data.CommunicationDetails[0].mastervendor_email)
                    } else {
                        setfs_ContactName("");
                        setfs_Designation("")
                        setfs_PhoneNo("")
                        setfs_Email("")
                        setops_ContactName("")
                        setops_Designation("")
                        setops_PhoneNo("")
                        setops_Email("");
                        setcolls_ContactName("")
                        setcolls_Designation("")
                        setcolls_PhoneNo("")
                        setcolls_Email("")
                        setmngs_ContactName("")
                        setmngs_Designation("")
                        setmngs_PhoneNo("");
                        setmngs_Email("")
                        setothers_ContactName("")
                        setothers_Designation("")
                        setothers_PhoneNo("")
                        setothers_Email("")
                        setmastervendor_email("")
                    }
                }

                if ((res.data.Statutory[0] !== "null") && (res.data.Statutory.length > 0)) {
                    setGST_type(res.data.Statutory[0].GST_type);
                    setGST_No(res.data.Statutory[0].GST_No)
                    setGST_Doc(res.data.Statutory[0].GST_Doc)
                    setPAN_No(res.data.Statutory[0].PAN_No)
                    setPAN_Doc(res.data.Statutory[0].PAN_Doc)
                    setCIN_No(res.data.Statutory[0].CIN_No)
                    setform_10f(res.data.Statutory[0].form_10f)
                    setpe_declaration(res.data.Statutory[0].pe_declaration);
                    setMSME_status(res.data.Statutory[0].MSME_status)
                    setMSME_No(res.data.Statutory[0].MSME_No)
                    setMSME_Doc(res.data.Statutory[0].MSME_Doc)
                    setMSME_Type(res.data.Statutory[0].MSME_Type)
                    setTAN_No(res.data.Statutory[0].TAN_No)
                    setTAN_Doc(res.data.Statutory[0].TAN_Doc)
                    setTax_residency(res.data.Statutory[0].Tax_residency)
                } else {
                    setGST_type("");
                    setGST_No("")
                    setGST_Doc("")
                    setPAN_No("")
                    setPAN_Doc("")
                    setCIN_No("")
                    setform_10f("")
                    setpe_declaration("");
                    setMSME_status("")
                    setMSME_No("")
                    setMSME_Doc("")
                    setMSME_Type("")
                    setTAN_No("")
                    setTAN_Doc("")
                    setTax_residency("")
                }



                if ((res.data.ComplianceDetail[0] !== "null") && (res.data.ComplianceDetail.length > 0)) {
                    setRPD_Doc(res.data.ComplianceDetail[0].RPD_Doc);
                    setCOC_Doc(res.data.ComplianceDetail[0].COC_Doc)
                    setNDA_Doc(res.data.ComplianceDetail[0].NDA_Doc)
                } else {
                    setRPD_Doc("");
                    setCOC_Doc("")
                    setNDA_Doc("")
                }

                if ((res.data.FinancialDetail[0] !== "null") && (res.data.FinancialDetail.length > 0)) {
                    setyearOfAuditedFinancial(res.data.FinancialDetail[0].yearOfAuditedFinancial)
                    setRevenue(res.data.FinancialDetail[0].Revenue)
                    setProfit(res.data.FinancialDetail[0].Profit)
                    setnetWorth(res.data.FinancialDetail[0].netWorth)
                    setcurrentAssets(res.data.FinancialDetail[0].currentAssets);
                    setdirectorDetails(res.data.FinancialDetail[0].directorDetails)
                    setfinancial_data(res.data.FinancialDetail[0].financial_data)
                    setfinancial_data2(res.data.FinancialDetail[0].financial_data2)
                } else {
                    setyearOfAuditedFinancial("")
                    setRevenue("")
                    setProfit("")
                    setnetWorth("")
                    setcurrentAssets("");
                    setdirectorDetails("")
                    setfinancial_data("")
                    setfinancial_data2("")
                }



                if ((res.data.Bankdetail[0] !== "null") && (res.data.Bankdetail.length > 0)) {
                    setbankAccountName(res.data.Bankdetail[0].bankAccountName)
                    setbankName(res.data.Bankdetail[0].bankName)
                    setbankAccountNumber(res.data.Bankdetail[0].bankAccountNumber)
                    setifscCode(res.data.Bankdetail[0].ifscCode)
                    setMICRcode(res.data.Bankdetail[0].MICRcode)
                    setbranchAddress(res.data.Bankdetail[0].branchAddress)
                    setbankdetailDoc(res.data.Bankdetail[0].bankdetailDoc)
                } else {
                    setbankAccountName("")
                    setbankName("")
                    setbankAccountNumber("")
                    setifscCode("")
                    setMICRcode("")
                    setbranchAddress("")
                    setbankdetailDoc("")
                }

                if ((res.data.contactDetail[0] !== "null") && (res.data.contactDetail.length > 0)) {
                    setname(res.data.contactDetail[0].contactName1)
                    setcontactNumber(res.data.contactDetail[0].contactNumber1)
                    setemail(res.data.contactDetail[0].emailId1)
                    setname2(res.data.contactDetail[0].contactName2)
                    setcontactNumber2(res.data.contactDetail[0].contactNumber2)
                    setemail2(res.data.contactDetail[0].emailId2)
                    setname3(res.data.contactDetail[0].contactName3)
                    setcontactNumber3(res.data.contactDetail[0].contactNumber3)
                    setemail3(res.data.contactDetail[0].emailId3)
                } else {
                    setname("")
                    setcontactNumber("")
                    setemail("")
                    setname2("")
                    setcontactNumber2("")
                    setemail2("")
                    setname3("")
                    setcontactNumber3("")
                    setemail3("")
                }
            })
        // }
    }, [])


    const [address1, setaddress1] = useState("");
    const [address2, setaddress2] = useState("");
    const [companyName, setcompanyName] = useState("");
    const [country, setcountry] = useState("");
    const [state, setstate] = useState("");
    const [city, setcity] = useState("");
    const [pinCode, setpinCode] = useState("");
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
    // hello
    const [name, setname] = useState("");
    const [contactNumber, setcontactNumber] = useState("");
    const [email, setemail] = useState("");
    const [name2, setname2] = useState("");
    const [contactNumber2, setcontactNumber2] = useState("");
    const [email2, setemail2] = useState("");
    const [name3, setname3] = useState("");
    const [contactNumber3, setcontactNumber3] = useState("");
    const [email3, setemail3] = useState("");

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

    // const [urlGST, seturlGST] = useState("");
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
        } else if (!numberValidation.test(e.target.value) || (e.target.value.length !== 6)) {
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
        } else if ((!numberValidation.test(e.target.value)) || (e.target.value.length !== 10)) {
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
    }; const validatemngs_Designation = (e) => {
        setmngs_Designation(e.target.value);
        if (e.target.value.length === 0) {
            setmngs_DesignationErr("Designation is required");
        } else {
            setmngs_DesignationErr("");
            setmngs_Designation(e.target.value);
        }
    }; const validatemngs_PhoneNo = (e) => {
        setmngs_PhoneNo(e.target.value);
        if (e.target.value.length === 0) {
            setmngs_PhoneNoErr("Phone number is required");
        } else if ((!numberValidation.test(e.target.value)) || (e.target.value.length !== 10)) {
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
        } else if ((!numberValidation.test(e.target.value)) || (e.target.value.length !== 10)) {
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
        setmkcheck(e.target.value);
        if (e.target.value.length === 0) {
            setmkcheckErr("Check is required");
        } else {
            setmkcheckErr("");
            setmkcheck(e.target.value);
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
        }
        else {
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
        setapproverFile(event.target.files[0])
    }


    const handleEdit = (event) => {
        setStyle("cont2");
    }
    const handleView = (event) => {
        // NDA_Doc-1675160386209.pdf
        // uploads/bankdetailDoc-1675928620398
        // if (event) {
        //     console.log("event----event---------event------------>>>>>>", event)
        //     let text = event
        //     let paths = text.split("/");
        //     console.log("path---------------->>>>>", paths[1])
        //     let name = paths[1]

        fetch(`http://localhost:12707/downloadPdfUploads/NDA_Doc-1675160386209.pdf`)

            .then((response) => {
                // setTimeout(()=>{
                response.blob().then((blob) => {
                    // var file = new File([blob], "filename.pdf", { type: "application/pdf" });
                    // const newBlob = new Blob([blob], {type: "application/pdf"});
                    // console.log("blobbbbbbbbbbbnewBlob", newBlob);
                    let url = URL.createObjectURL(blob, "application/pdf");

                    window.open(url, '_blank')
                    // URL.revokeObjectURL(url);
                });
                // },100)
            });
        // } else {
        //       Swal.fire({
        //     title: "Error While Fetching",
        //     icon: "error",
        //     confirmButtonText: "OK",
        //   });
        // }
    }
    const handleEditPopup = (event) => {
        // event.preventDefault(); hello
        // console.log("event------------------------------>>>>", event)
        if (bankdetailDoc) {
            let bankDocument = "Copy of cancel Cheque.pdf";
            let title = event
            Swal.fire({
                heightAuto: true,
                title: 'Delete Existing File',
                html: `<div class="rejectstyle">
           <div> <lablel>File Name : ${bankDocument}</label>
       
         </div>
          `,
                confirmButtonText: 'Delete',
                confirmButtonColor: "#B1000E",
                showCancelButton: true,
                focusConfirm: false,
                customClass: 'swal-wide',
                // didOpen: () => {
                //     const yes = document.querySelector('#delete')
                //     yes.addEventListener('click', () => {



                // if (event === "GST") {
                //     console.log(' GST Deleted Successfully')
                // }
                // else if (event === "MSME") {
                //     console.log(' MSME Deleted Successfully')
                // }
                // else if (event === "PAN") {
                //     console.log(' PAN Deleted Successfully')
                // }
                // else if (event === "TAN") {
                //     console.log(' TAN Deleted Successfully')
                // }
                // else if (event === "Form 10F") {
                //     console.log('Form 10F Deleted Successfully')
                // }
                // else if (event === "Tax Residency") {
                //     console.log(' Tax Residency Deleted Successfully')
                // }
                // else if (event === "No PE declaration") {
                //     console.log('No PE declaration Deleted Successfully')
                // }
                // else if (event === "RPD") {
                //     console.log('RPD Deleted Successfully')
                // }
                // else if (event === "COC") {
                //     console.log(' COC Deleted Successfully')
                // }
                // else if (event === "NDA") {
                //     console.log(' NDA Deleted Successfully')
                // } else if (event === "bank Details") {
                //     console.log(' bank Details Deleted Successfully')
                // }
                // else if (event === "Financials Data1") {
                //     console.log(' Financials Data1 Deleted Successfully')
                // }
                // else if (event === "Financials Data2") {
                //     console.log('Financials Data2 Deleted Successfully')
                // }
                // })
                // },

                preConfirm: () => {
                    Swal.fire({
                        title: 'Do you want to save the changes?',
                        showDenyButton: true,
                        // showCancelButton: true,
                        confirmButtonText: 'Yes',
                        confirmButtonColor: '#B1000E',
                        denyButtonText: 'No',
                        denyButtonColor: 'gray',
                        customClass: {
                            actions: 'my-actions',
                            cancelButton: 'order-1 right-gap',
                            confirmButton: 'order-2',
                            denyButton: 'order-3',
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire('Deleted!', '', 'success')
                        } else if (result.isDenied) {
                            Swal.fire('File not deleted', '', 'info')
                        }
                    })
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
                }
            })
        } else {
            // let bankDocument = "Copy of cancel Cheque.pdf";
            // let title = event
            const { value: file } = Swal.fire({
                title: 'Select File',
                input: 'file',
                inputAttributes: {
                    'accept': 'image/*',
                    'aria-label': 'Upload your profile picture'
                },
                confirmButtonText: 'Upload',
                confirmButtonColor: "#B1000E",
                showCancelButton: true,
            })

            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    Swal.fire({
                        title: 'Your uploaded picture',
                        imageUrl: e.target.result,
                        imageAlt: 'The uploaded picture'
                    })
                }
                reader.readAsDataURL(file)
            }
        }
    }

    const handleNoConcernFound = (event) => {
  
        const userId = event;
        const data = new FormData();
        // data.append('level1Status', "approved");
        data.append('userId', event);
        // data.append('level1RejectComment', "");
        // data.append('level1rejectFileDoc', "");
        data.append('level2Status', "approved");
        // data.append('level2RejectComment', "");
        // data.append('level2rejectFileDoc', "");
        apiService.updateApprovalStatus(userId, data)
            .then(response => {
                if (response) {
                    Swal.fire({
                        title: "Data saved",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
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
    const handleConcernFound = (event) => {
        console.log("handleConcernFound",event)
     
        Swal.fire({
            heightAuto: true,
            title: 'Review vendor details',
            html: `<div class="rejectstyle">
            <textarea rows="10" cols="30" id="comment" class="swal2-input" placeholder="Comments "></textarea>
            <input type="file" id="rejectdoc" class="swal2-input" placeholder="Select file">
       </div> `,
            confirmButtonText: 'Reject',
            confirmButtonColor: "#B1000E",
            showCancelButton: true,
            focusConfirm: false,
            customClass: 'swal-wide',
            preConfirm: () => {

                const comment = Swal.getPopup().querySelector('#comment').value
                const rejectdoc = Swal.getPopup().querySelector('#rejectdoc').files[0]
                if (!comment || !rejectdoc) {
                    Swal.showValidationMessage(`Please enter comments and file`)
                } else {
                    console.log("dataaa",rejectdoc)
                    const data = new FormData();
                    data.append('userId', event);
                    data.append('level2Status', "rejected");
                    data.append('level2RejectComment', comment);
                    data.append('level2rejectFileDoc', rejectdoc);
                    const userId = event;
                    apiService.updateApprovalStatus(userId, data)
                        .then(response => {
                            if (response) {
                                Swal.fire({
                                    title: "Data saved",
                                    icon: "success",
                                    confirmButtonText: "OK",
                                });
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

    const handleApprove = (event) => {
        console.log("handleApprove",event)
        const data = new FormData();
        data.append('level1Status', "approved");
        data.append('userId', event);
        // data.append('level1RejectComment', "");
        // data.append('level1rejectFileDoc', "");
        // data.append('level2Status', "");
        // data.append('level2RejectComment', "");
        // data.append('level2rejectFileDoc', "");
        apiService.saveApproval(data)
            .then(response => {
                if (response) {
                    Swal.fire({
                        title: "Data saved",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
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

    const handleRegject = (event) => {

        Swal.fire({
            heightAuto: true,
            title: 'Review vendor details',
            html: `<div class="rejectstyle">
            <textarea rows="10" cols="30" id="comment" class="swal2-input" placeholder="Comments "></textarea>
            <input type="file" id="rejectdoc" class="swal2-input" placeholder="Select file">
       </div> `,
            confirmButtonText: 'Reject',
            confirmButtonColor: "#B1000E",
            showCancelButton: true,
            focusConfirm: false,
            customClass: 'swal-wide',
            preConfirm: () => {

                const comment = Swal.getPopup().querySelector('#comment').value
                const rejectdoc = Swal.getPopup().querySelector('#rejectdoc').files[0]
                if (!comment || !rejectdoc) {
                    Swal.showValidationMessage(`Please enter comments and file`)
                } else {
                    const data = new FormData();
                    data.append('userId', event);
                    data.append('level1Status', "rejected");
                    data.append('level1RejectComment', comment);
                    data.append('level1rejectFileDoc', rejectdoc);

                    apiService.saveApproval(data)
                        .then(response => {
                            if (response) {
                                Swal.fire({
                                    title: "Data saved",
                                    icon: "success",
                                    confirmButtonText: "OK",
                                });
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
    const submitHandler = (e) => {
        e.preventDefault();
        if (companyName.length === 0) {
            setcompanyNameErr("Company name is required");
        } if (address1.length === 0) {
            setaddress1Err("Address 1 is required");
        } if (country.length === 0) {
            setcountryErr("Country is required");
        } if (state.length === 0) {
            setstateErr("State is required");
        } if (city.length === 0) {
            setcityErr("City is required");
        } if (pinCode.length === 0) {
            setpinCodeErr("Pincode is required");
        }
        if (!logo) {
            setlogoErr("Logo is required");
        }

        if (fs_ContactName.length === 0) {
            setfs_ContactNameErr("Contact name is required");
        } if (fs_Designation.length === 0) {
            setfs_DesignationErr("Designation is required");
        } if (fs_PhoneNo.length === 0) {
            setfs_PhoneNoErr("Phone number is required");
        } if (fs_Email.length === 0) {
            setfs_EmailErr("Email is required");
        } if (mngs_ContactName.length === 0) {
            setmngs_ContactNameErr("Contact name is required");
        } if (mngs_Designation.length === 0) {
            setmngs_DesignationErr("Designation is required");
        } if (mngs_PhoneNo.length === 0) {
            setmngs_PhoneNoErr("Phone number is required");
        } if (mngs_Email.length === 0) {
            setmngs_EmailErr("Email is required");
        } if (mastervendor_email.length === 0) {
            setmastervendor_emailErr("Email is required");
        }

        if (bankAccountName.length === 0) {
            setbankAccountNameErr("Account name is required");
        } if (bankName.length === 0) {
            setbankNameErr("Bank name is required");
        } if (bankAccountNumber.length === 0) {
            setbankAccountNumberErr("Account number is required");
        } if (ifscCode.length === 0) {
            setifscCodeErr("IFSC code is required");
        } if (MICRcode.length === 0) {
            setMICRcodeErr("MICR code is required");
        } if (branchAddress.length === 0) {
            setbranchAddressErr("Branch address is required");
        }
        if (!bankdetailDoc) {
            setbankdetailDocErr("Bank document is required");
        }

        if (!RPD_Doc) {
            setRPD_DocErr("RPD document is required");
        } if (!COC_Doc) {
            setCOC_DocErr("COC document is required");
        } if (!NDA_Doc) {
            setNDA_DocErr("NDA document is required");
        }

        if (name.length === 0) {
            setnameErr("Name is required");
        } if (contactNumber.length === 0) {
            setcontactNumberErr("Contact number is required");
        } if (email.length === 0) {
            setemailErr("Email is required");
        }


        if (vendorType.length === 0) {
            setvendorTypeErr("Vendor type is required");
        } if (acManager.length === 0) {
            setacManagerErr("A/C manager is required");
        }
        if (mkcheck === false) {
            setmkcheckErr("Check is required");
        }


        if (GST_type.length === 0) {
            setGST_typeErr("GST type is required");
        } if (GST_No.length === 0) {
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

        e.preventDefault();
        // apiService.savebankdetail(data)
        // .then(response => {
        // })

        const basicDetails =
        {
            "userid": 1,
            // "company_logo": "comapny.png",
            "address1": address1,
            "address2": address2,
            "companyName": companyName,
            "country": country,
            "state": state,
            "city": city,
            "pinCode": pinCode,
            "image": logo,

            "vendorType": vendorType,
            "vendorManager": acManager,
            "mkDenialCheque": mkcheck,
            // "approverFile": approverFile
        }
        console.log("basicDetails", basicDetails)
        const communicationDetails =
        {
            "userId": 1,
            "financeSpoccontactName": fs_ContactName,
            "financeSpocdesignation": fs_Designation,
            "financeSpocphoneNo": fs_PhoneNo,
            "financeSpocemail": fs_Email,
            "operationSpoccontactName": ops_ContactName,
            "operationSpocdesignation": ops_Designation,
            "operationSpocphoneNo": ops_PhoneNo,
            "operationSpocemail": ops_Email,
            // "collectionSpoccontactName": colls_ContactName,
            // "collectionSpocdesignation": ops_Designation,
            // "collectionSpocphoneNo": setcolls_PhoneNo,
            // "collectionSpocemail": setcolls_Email,
            "managementSpoccontactName": mngs_ContactName,
            "managementSpocdesignation": mngs_Designation,
            "managementSpocphoneNo": mngs_PhoneNo,
            "managementSpocemail": mngs_Email,
            "contactName": others_ContactName,
            "designation": others_Designation,
            "phoneNo": others_PhoneNo,
            "email": others_Email,
            // "mastervendor_email": mastervendor_email
        }
        console.log("communicationDetails", communicationDetails)
        const statutoryDetails = new FormData();
        statutoryDetails.append('GST_Doc', GST_Doc);
        statutoryDetails.append('GST_type', GST_type);
        statutoryDetails.append('GST_No', GST_No);
        statutoryDetails.append('PAN_No', PAN_No);
        statutoryDetails.append('PAN_Doc', PAN_Doc);
        statutoryDetails.append('form_10f_Doc', form_10f);
        statutoryDetails.append('TAN_Doc', TAN_Doc);
        // statutoryDetails.append('PE_DeclarationNo', pe_declaration);
        statutoryDetails.append('PE_Declaration_Doc', pe_declaration);
        statutoryDetails.append('MSME_Doc', MSME_Doc);
        statutoryDetails.append('Tax_residency_Doc', Tax_residency);
        statutoryDetails.append('CIN_No', CIN_No);
        // statutoryDetails.append('form_10f', form_10f);
        statutoryDetails.append('MSME_status', MSME_status);
        statutoryDetails.append('MSME_No', MSME_No);
        statutoryDetails.append('MSME_Type', MSME_Type);
        statutoryDetails.append('TAN_No', TAN_No);
        statutoryDetails.append('userId', JSON.parse(window.sessionStorage.getItem("jwt")).result.userId);
        // statutoryDetails.append('Tax_residency_No', Tax_residency);
        // statutoryDetails.append('fileDisclosure', fileDisclosure);
        // {
        //     "userid": 1,
        //     "GST_type": GST_type,
        //     "GST_No": GST_No,
        //     "GST_Doc": GST_Doc,
        //     "PAN_No": PAN_No,
        //     "PAN_Doc": PAN_Doc,
        //     "CIN_No": CIN_No,
        //     "form_10f": form_10f,
        //     "pe_declaration": pe_declaration,
        //     "MSME_status": MSME_status,
        //     "MSME_No": MSME_No,
        //     "MSME_Doc": MSME_Doc,
        //     "MSME_Type": MSME_Type,
        //     "TAN_No": TAN_No,
        //     "TAN_Doc": TAN_Doc,
        //     "Tax_residency": Tax_residency
        // }
        console.log("statutoryDetails", statutoryDetails)
        const complianceDetails = new FormData();
        complianceDetails.append('RPD_Doc', RPD_Doc);
        complianceDetails.append('NDA_Doc', COC_Doc);
        complianceDetails.append('COC_Doc', NDA_Doc);
        complianceDetails.append('userId', JSON.parse(window.sessionStorage.getItem("jwt")).result.userId);
        // console.log("complianceDetails", complianceDetails)

        const financeDetails = new FormData();
        financeDetails.append('financial_data', financial_data);
        financeDetails.append('financial_data2', financial_data2);
        financeDetails.append('yearOfAuditedFinancial', yearOfAuditedFinancial);
        financeDetails.append('Revenue', Revenue);
        financeDetails.append('Profit', Profit);
        financeDetails.append('netWorth', netWorth);
        financeDetails.append('currentAssets', currentAssets);
        financeDetails.append('directorDetails', directorDetails);
        financeDetails.append('userId', JSON.parse(window.sessionStorage.getItem("jwt")).result.userId);
        // console.log("financeDetails", financeDetails)

        const bankDetails = new FormData();
        bankDetails.append('userId', JSON.parse(window.sessionStorage.getItem("jwt")).result.userId);
        bankDetails.append('bankAccountName', bankAccountName);
        bankDetails.append('bankName', bankName);
        bankDetails.append('bankAccountNumber', bankAccountNumber);
        bankDetails.append('ifscCode', ifscCode);
        bankDetails.append('MICRcode', MICRcode);
        bankDetails.append('branchAddress', branchAddress);
        bankDetails.append('bankdetailDoc', bankdetailDoc);
        // console.log("bankDetails", bankDetails)

        const contactDetails =
        {
            "userid": JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
            "name": name,
            "contactNumber": contactNumber,
            "email": email,
            "name2": name2,
            "contactNumber2": contactNumber2,
            "email2": email2,
            "name3": name3,
            "contactNumber3": contactNumber3,
            "email3": email3
        }
        // console.log("contactDetails", contactDetails)
        // const ApproverDetails = {
        //     "vendorType": vendorType,
        //     "acManager": acManager,
        //     "mkcheck": mkcheck,
        //     "approverFile": approverFile
        // }
        // console.log("ApproverDetails", ApproverDetails)
        const allData = {
            'vendorDetail': basicDetails,
            'Statutory': statutoryDetails,
            'CommunicationDetails': communicationDetails,
            'ComplianceDetail': complianceDetails,
            'FinancialDetail': financeDetails,
            'Bankdetail': bankDetails,
            'contactDetail': contactDetails,
        }
        console.log("AAALLL Files", allData)

        const userId = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId;
        console.log("userId", userId)
        // if (
        //     !companyNameErr && !address1Err && !countryErr && !stateErr && !cityErr && !pinCodeErr && !logoErr &&
        //     !fs_ContactNameErr && !fs_DesignationErr && !fs_PhoneNoErr && !fs_EmailErr && !mngs_ContactNameErr && !mngs_DesignationErr && !mngs_PhoneNoErr && !mngs_EmailErr && !mastervendor_emailErr &&
        //     !bankAccountNameErr && !bankNameErr && !bankAccountNumberErr && !ifscCodeErr && !MICRcodeErr && !branchAddressErr &&
        //     !nameErr && !contactNumberErr && !emailErr &&
        //     !vendorTypeErr && !acManagerErr && !mkcheckErr &&
        //     !GST_typeErr && !GST_NoErr && !PAN_NoErr && !CIN_NoErr && !form_10fErr && !MSME_statusErr && !MSME_NoErr && !MSME_TypeErr && !TAN_NoErr && !Tax_residencyErr && !pe_declarationErr
        // ) {
        console.log("Form Submitted")


        apiService.updateAllCollection(userId, allData)
            .then(response => {
                console.log("res=============>>>>>>>", response)
                if (response) {
                    Swal.fire({
                        title: "Data saved",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                }
                else {
                    Swal.fire({
                        title: "Error While Fetching",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            })
        // }
    }


    return (
        <Box>
            <div className="container-fluid  py-2" style={{ backgroundColor: '#f3f4f7' }}>
                <form className={style} style={{ marginBottom: '3em' }} onSubmit={submitHandler} >
                    {/* <div > */}
                    <div className={style}>
                        <div style={{ overflowY: 'scroll', height: '300px' }}>

                            <div className="row px-3  pt-3" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Vendor Details Basic Informations</b></h5>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="companyName*">Company Name</label>
                                    <input type="text" className="mb-2 inputbox" name="companyName" value={companyName} onChange={(e) => validatecompanyName(e)} />
                                    <span className="formError">{companyNameErr}</span>

                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="address1">Address 1</label>
                                    <input type="text" className="mb-2 inputbox" name="address1" value={address1} onChange={(e) => validateaddress1(e)} />
                                    <span className="formError">{address1Err}</span>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="address2">Address 2</label>
                                    <input type="text" className="mb-2 inputbox" name="address2" value={address2} onChange={(e) => validateaddress2(e)} />
                                    {/* <span className="formError">{address2Err}</span> */}
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" className="mb-2 inputbox" name="country" value={country} onChange={(e) => validatecountry(e)} />
                                    <span className="formError">{countryErr}</span>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="state">State</label>
                                    <input type="text" className="mb-2 inputbox" name="state" value={state} onChange={(e) => validatestate(e)} />
                                    <span className="formError">{stateErr}</span>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="mb-2 inputbox" name="city" value={city} onChange={(e) => validatecity(e)} />
                                    <span className="formError">{cityErr}</span>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="pinCode">PinCode</label>
                                    <input type="text" className="mb-2 inputbox" name="pinCode" value={pinCode} onChange={(e) => validatepinCode(e)} />
                                    <span className="formError">{pinCodeErr}</span>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12 mb-0">
                                    {style === "cont2" ? <>
                                        <button type="button" onClick={(e) => handleEditPopup(logo)} className="btn bankbtn btn-primary btn-md mt-3">View Logo</button>
                                    </>
                                        : <button type="button" onClick={(e) => handleView(logo)} className="btn bankbtn btn-primary btn-md mt-3">View Logo</button>}
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

                            <div className="row px-3" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Communication Details</b></h5>
                                <p><b>Finance Spoc</b></p>
                                <div className="row">
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="fs_ContactName">Contact Name</label>
                                        <input type="text" className="mb-2 inputbox" name="fs_ContactName" value={fs_ContactName} onChange={(e) => validatefs_ContactName(e)} />
                                        <span className="formError">{fs_ContactNameErr}</span>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="fs_Designation">Designation</label>
                                        <input type="text" className="mb-2 inputbox" name="fs_Designation" value={fs_Designation} onChange={(e) => validatefs_Designation(e)} />
                                        <span className="formError">{fs_DesignationErr}</span>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="fs_PhoneNo">Phone no</label>
                                        <input type="text" className="mb-2 inputbox" name="fs_PhoneNo" value={fs_PhoneNo} onChange={(e) => validatefs_PhoneNo(e)} />
                                        <span className="formError">{fs_PhoneNoErr}</span>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="fs_Email">Email</label>
                                        <input type="text" className="mb-2 inputbox" name="fs_Email" value={fs_Email} onChange={(e) => validatefs_Email(e)} />
                                        <span className="formError">{fs_EmailErr}</span>
                                    </div>
                                </div>
                                {ops_ContactName && ops_Designation && ops_PhoneNo && ops_Email ? <>
                                    <p><b>Operation Spoc</b></p>
                                    <div className="row" >
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="ops_ContactName">Contact Name</label>
                                            <input type="text" className="mb-2 inputbox" name="ops_ContactName" value={ops_ContactName} onChange={(e) => setops_ContactName(e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="ops_Designation">Designation</label>
                                            <input type="text" className="mb-2 inputbox" name="ops_Designation" value={ops_Designation} onChange={(e) => setops_Designation(e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="ops_PhoneNo">Phone no</label>
                                            <input type="text" className="mb-2 inputbox" name="ops_PhoneNo" value={ops_PhoneNo} onChange={(e) => setops_PhoneNo(e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="ops_Email">Email</label>
                                            <input type="text" className="mb-2 inputbox" name="ops_Email" value={ops_Email} onChange={(e) => setops_Email(e.target.value)} />
                                        </div>
                                    </div></> : ""}
                                {colls_ContactName && colls_Designation && colls_PhoneNo && colls_Email ? <>
                                    <p><b>Collection Spoc</b></p>
                                    <div className="row" >
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="country">Contact Name</label>
                                            <input type="text" className="mb-2 inputbox" name="colls_ContactName" value={colls_ContactName} onChange={(e) => setcolls_ContactName(e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="country">Designation</label>
                                            <input type="text" className="mb-2 inputbox" name="colls_Designation" value={colls_Designation} onChange={(e) => setcolls_Designation(e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="country">Phone no</label>
                                            <input type="text" className="mb-2 inputbox" name="colls_PhoneNo" value={colls_PhoneNo} onChange={(e) => setcolls_PhoneNo(e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="country">Email</label>
                                            <input type="text" className="mb-2 inputbox" name="colls_Email" value={colls_Email} onChange={(e) => setcolls_Email(e.target.value)} />
                                        </div>
                                    </div></> : ""}


                                <p><b>Management Spoc</b></p>
                                <div className="row" >
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="mngs_ContactName">Contact Name</label>
                                        <input type="text" className="mb-2 inputbox" name="mngs_ContactName" value={mngs_ContactName} onChange={(e) => validatemngs_ContactName(e)} />
                                        <span className="formError">{mngs_ContactNameErr}</span>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="mngs_Designation">Designation</label>
                                        <input type="text" className="mb-2 inputbox" name="mngs_Designation" value={mngs_Designation} onChange={(e) => validatemngs_Designation(e)} />
                                        <span className="formError">{mngs_DesignationErr}</span>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="mngs_PhoneNo">Phone no</label>
                                        <input type="text" className="mb-2 inputbox" name="mngs_PhoneNo" value={mngs_PhoneNo} onChange={(e) => validatemngs_PhoneNo(e)} />
                                        <span className="formError">{mngs_PhoneNoErr}</span>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="mngs_Email">Email</label>
                                        <input type="text" className="mb-2 inputbox" name="mngs_Email" value={mngs_Email} onChange={(e) => validatemngs_Email(e)} />
                                        <span className="formError">{mngs_EmailErr}</span>
                                    </div>
                                </div>
                                {others_ContactName && others_Designation && others_PhoneNo && others_Email ? <>
                                    <p><b>Others</b></p>
                                    <div className="row" >
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="others_ContactName">Contact Name</label>
                                            <input type="text" className="mb-2 inputbox" name="others_ContactName" value={others_ContactName} onChange={(e) => setothers_ContactName(e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="others_Designation">Designation</label>
                                            <input type="text" className="mb-2 inputbox" name="others_Designation" value={others_Designation} onChange={(e) => setothers_Designation(e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="others_PhoneNo">Phone no</label>
                                            <input type="text" className="mb-2 inputbox" name="others_PhoneNo" value={others_PhoneNo} onChange={(e) => setothers_PhoneNo(e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                            <label htmlFor="others_Email">Email</label>
                                            <input type="text" className="mb-2 inputbox" name="others_Email" value={others_Email} onChange={(e) => setothers_Email(e.target.value)} />
                                        </div>
                                    </div></> : ""}
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="pinCode">Master vendor email id*</label>
                                    <input type="text" className="mb-2 inputbox" name="mastervendor_email" value={mastervendor_email} onChange={(e) => validatemastervendor_email(e)} />
                                    <span className="formError">{mastervendor_emailErr}</span>
                                </div>
                            </div>

                            <div className="row px-3" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Statutary Details</b></h5>
                                <div className="row" >
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                                        <div className="row">
                                            <label>Vendor GST Type*</label>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="GST_type" id="flexRadioDefault1" value={"Registered"} checked={GST_type === "Registered"} onChange={(e) => validateGST_type(e)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Registered
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="GST_type" id="flexRadioDefault2" value={"UnRegistered"} checked={GST_type === "UnRegistered"} onChange={(e) => validateGST_type(e)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                        UnRegistered
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="GST_type" id="flexRadioDefault3" value={"Import"} checked={GST_type === "Import"} onChange={(e) => validateGST_type(e)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
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
                                                    <input className="form-check-input" type="radio" name="MSME_status" id="MSME_status1" value={"Registered"} checked={MSME_status === "Registered"} onChange={(e) => validateMSME_status(e)} />
                                                    <label className="form-check-label" htmlFor="MSME_status1">
                                                        Registered
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="MSME_status" id="MSME_status2" value={"UnRegistered"} checked={MSME_status === "UnRegistered"} onChange={(e) => validateMSME_status(e)} />
                                                    <label className="form-check-label" htmlFor="MSME_status2">
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
                                                <label htmlFor="GST_No">GST no*</label>
                                                <input type="text" className="mb-2 inputbox" name="GST_No" value={GST_No} onChange={(e) => validateGST_No(e)} />
                                                <span className="formError">{GST_NoErr}</span>
                                            </div>

                                            <div className="col-sm-12 col-lg-4 m-auto">
                                                {style === "cont2" ? <>
                                                    <button type="button" onClick={(e) => handleEditPopup("GST")} className="btn bankbtn btn-primary btn-md mt-3">View File</button>
                                                </>
                                                    : <button type="button" onClick={(e) => handleView(GST_Doc)} className="btn bankbtn btn-primary btn-md mt-3">View File</button>}
                                                <p className="formError">{GST_DocErr}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-2">
                                        <div className="row">
                                            <div className="col-sm-12 col-lg-8">
                                                <label htmlFor="MSME_No">MSME no*</label>
                                                <input type="text" className="mb-2 inputbox" name="MSME_No" value={MSME_No} onChange={(e) => validateMSME_No(e)} />
                                                <span className="formError">{MSME_NoErr}</span>
                                            </div>
                                            <div className="col-sm-12 col-lg-4 m-auto">
                                                {style === "cont2" ?
                                                    <button type="button" onClick={(e) => handleEditPopup("MSME")} className="btn bankbtn btn-primary btn-md mt-3">View File</button>
                                                    : <button type="button" onClick={(e) => handleView(MSME_Doc)} className="btn bankbtn btn-primary btn-md mt-3">View File</button>}
                                                <p className="formError">{MSME_DocErr}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                                        <div className="row">
                                            <div className="col-sm-12 col-lg-8">
                                                <label htmlFor="PAN_No">PAN no*</label>
                                                <input type="text" className="mb-2 inputbox" name="PAN_No" value={PAN_No} onChange={(e) => validatePAN_No(e)} />
                                                <span className="formError">{PAN_NoErr}</span>
                                            </div>
                                            <div className="col-sm-12 col-lg-4 m-auto">
                                                {style === "cont2" ?
                                                    <button type="button" onClick={(e) => handleEditPopup("PAN")} className="btn bankbtn btn-primary btn-md mt-3">View File</button>
                                                    : <button type="button" onClick={(e) => handleView(PAN_Doc)} className="btn bankbtn btn-primary btn-md mt-3">View File</button>}
                                                <p className="formError">{PAN_DocErr}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                                        <div className="row">
                                            <label>MSME Type*</label>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="MSME_Type" id="MSME_Type1" value={"Micro"} checked={MSME_Type === "Micro"} onChange={(e) => validateMSME_Type(e)} />
                                                    <label className="form-check-label" htmlFor="MSME_Type1">
                                                        Micro
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="MSME_Type" id="MSME_Type2" value={"Small"} checked={MSME_Type === "Small"} onChange={(e) => validateMSME_Type(e)} />
                                                    <label className="form-check-label" htmlFor="MSME_Type2">
                                                        Small
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="MSME_Type" id="MSME_Type3" value={"Macro"} checked={MSME_Type === "Macro"} onChange={(e) => validateMSME_Type(e)} />
                                                    <label className="form-check-label" htmlFor="MSME_Type3">
                                                        Macro
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
                                        <input type="text" className="mb-2 inputbox" name="CIN_No" value={CIN_No} onChange={(e) => validateCIN_No(e)} />
                                        {/* </div> */}
                                        {/* </div> */}
                                        <span className="formError">{CIN_NoErr}</span>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12">
                                        <div className="row">
                                            <div className="col-sm-12 col-lg-8">
                                                <label htmlFor="TAN_No">TAN no*</label>
                                                <input type="text" className="mb-2 inputbox" name="TAN_No" value={TAN_No} onChange={(e) => validateTAN_No(e)} />
                                                <span className="formError">{TAN_NoErr}</span>
                                            </div>
                                            <div className="col-sm-12 col-lg-4 m-auto ">
                                                {style === "cont2" ?
                                                    <button type="button" onClick={(e) => handleEditPopup("TAN")} className="btn bankbtn btn-primary btn-md mt-3">View File</button>
                                                    : <button type="button" onClick={(e) => handleView(TAN_Doc)} className="btn bankbtn btn-primary btn-md mt-3">View File</button>}
                                                <p className="formError">{TAN_DocErr}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {form_10f ? <>
                                        <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                                            <div className="row text-center" >
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                                                    <label className="banklabel mt-2">Form 10F*</label>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                                                    {style === "cont2" ?
                                                        <button type="button" onClick={(e) => handleEditPopup("Form 10F")} className="btn bankbtn btn-primary btn-md mt-3">View File</button>
                                                        : <button type="button" onClick={(e) => handleView(form_10f)} className="btn bankbtn btn-primary btn-md mt-3">View File</button>}
                                                </div>
                                            </div>

                                            {/* <label htmlFor="form_10f">Form 10F*</label>
                                        <input type="text" className="mb-2 inputbox" name="form_10f" value={form_10f} onChange={(e) => validateform_10f(e)}   /> */}

                                            <span className="formError">{form_10fErr}</span>
                                        </div></> : <></>}
                                    {Tax_residency ? <>
                                        <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                                            <div className="row text-center" >
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                                                    <label className="banklabel mt-2">Tax Residency certificate*</label>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                                                    {style === "cont2" ?
                                                        <button type="button" onClick={(e) => handleEditPopup("Tax Residency")} className="btn bankbtn btn-primary btn-md mt-3">View File</button>
                                                        : <button type="button" onClick={(e) => handleView(Tax_residency)} className="btn bankbtn btn-primary btn-md mt-3">View File</button>}
                                                </div>
                                            </div>
                                            {/* <label htmlFor="Tax_residency">Tax Residency certificate*</label>
                                        <input type="text" className="mb-2 inputbox" name="Tax_residency" value={Tax_residency} onChange={(e) => validateTax_residency(e)}  /> */}
                                            <span className="formError">{Tax_residencyErr}</span>

                                        </div></> : <></>}
                                    {pe_declaration ? <>
                                        <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                                            <div className="row text-center" >
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                                                    <label className="banklabel mt-2">No PE declaration*</label>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                                                    {style === "cont2" ?
                                                        <button type="button" onClick={(e) => handleEditPopup("No PE declaration")} className="btn bankbtn btn-primary btn-md mt-3">View File</button>
                                                        : <button type="button" onClick={(e) => handleView(pe_declaration)} className="btn bankbtn btn-primary btn-md mt-3">View File</button>}
                                                </div>
                                            </div>
                                            {/* <label htmlFor="pe_declaration">No PE declaration*</label>
                                        <input type="text" className="mb-2 inputbox" name="pe_declaration" value={pe_declaration} onChange={(e) => validatepe_declaration(e)}  /> */}
                                            <span className="formError">{pe_declarationErr}</span>

                                        </div></> : <></>}
                                </div>
                            </div>
                            <div className="row px-3 pt-2" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Compliance Details</b></h5>
                                <div className="row text-center" >
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                                        <div className="row text-center" >
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <label className="banklabel">Related party disclosure*</label>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                {style === "cont2" ?
                                                    <button type="button" onClick={(e) => handleEditPopup("RPD")} className="btn bankbtn btn-primary btn-md  m-1">View File</button>
                                                    : <button type="button" onClick={(e) => handleView(RPD_Doc)} className="btn bankbtn btn-primary btn-md mt-1">View File</button>}
                                                {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button> */}
                                            </div>
                                            <span className="formError">{RPD_DocErr}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                                        <div className="row text-center" >
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <label className="banklabel">COC for services support/ installation*</label>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                {style === "cont2" ?
                                                    <button type="button" onClick={(e) => handleEditPopup("COC")} className="btn bankbtn btn-primary btn-md m-1">View File</button>
                                                    : <button type="button" onClick={(e) => handleView(COC_Doc)} className="btn bankbtn btn-primary btn-md mt-1">View File</button>}
                                                {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button> */}
                                            </div>
                                            <span className="formError">{COC_DocErr}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                                        <div className="row text-center" >
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                <label className="banklabel">Non disclosure agreement*</label>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                {style === "cont2" ?
                                                    <button type="button" onClick={(e) => handleEditPopup("NDA")} className="btn bankbtn btn-primary btn-md m-1">View File</button>
                                                    : <button type="button" onClick={(e) => handleView(NDA_Doc)} className="btn bankbtn btn-primary btn-md mt-1">View File</button>}
                                                {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button> */}
                                            </div>
                                            <span className="formError">{NDA_DocErr}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row px-3 pt-2" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Bank Details</b></h5>
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        <label className="banklabel">Name as per Bank A/c</label>
                                        <input type="text" className="mb-2 inputbox" name="bankAccountName" value={bankAccountName} onChange={(e) => validatebankAccountName(e)} />
                                        <span className="formError">{bankAccountNameErr}</span>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        <label className="banklabel">IFSC code*</label>
                                        <input type="text" className="mb-2 inputbox" name="ifscCode" value={ifscCode} onChange={(e) => validateifscCode(e)} />
                                        <span className="formError">{ifscCodeErr}</span>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        <label className="banklabel">Bank name*</label>
                                        <input type="text" className="mb-2 inputbox" name="bankName" value={bankName} onChange={(e) => validatebankName(e)} />
                                        <span className="formError">{bankNameErr}</span>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        <label className="banklabel">MICR code/ Swift code*</label>
                                        <input type="text" className="mb-2 inputbox" name="MICRcode" value={MICRcode} onChange={(e) => validateMICRcode(e)} />
                                        <span className="formError">{MICRcodeErr}</span>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        <label className="banklabel">Bank A/C no*</label>
                                        <input type="text" className="mb-2 inputbox" name="bankAccountNumber" value={bankAccountNumber} onChange={(e) => validatebankAccountNumber(e)} />
                                        <span className="formError">{bankAccountNumberErr}</span>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        <label className="banklabel">Branch address*</label>
                                        <input type="text" className="mb-2 inputbox" name="branchAddress" value={branchAddress} onChange={(e) => validatebranchAddress(e)} />
                                        <span className="formError">{branchAddressErr}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-2">
                                        <div className="d-flex" >
                                            <div className="p-2 ">
                                                <label className="banklabel mt-2">Copy of cancel Cheque/Bank detail duly certified from bank*</label>
                                            </div>
                                            <div className="p-2 justify-content-start my-auto">
                                                {style === "cont2" ?
                                                    <button type="button" onClick={(e) => handleEditPopup("bank Details")} className="btn bankbtn btn-primary btn-md ">View File</button>
                                                    : <button type="button" onClick={(e) => handleView(bankdetailDoc)} className="btn bankbtn btn-primary btn-md ">View File</button>}
                                                <p className="formError">{bankdetailDocErr}</p>
                                            </div>

                                        </div>

                                        {/* {style === "cont2" ?
                                            <button type="button" onClick={handleRegject} className="btn bankbtn btn-primary btn-md m-2">View File</button>
                                            : <button type="button" className="btn bankbtn btn-primary btn-md m-2">View File</button>} */}
                                    </div>
                                </div>
                            </div>
                            {yearOfAuditedFinancial || Revenue || Profit || netWorth || currentAssets || directorDetails || financial_data || financial_data2 ? <>
                                <div className="row px-3 pt-2" style={{ backgroundColor: '#fff' }}>
                                    <h5 className="headlines"><b>Financial Details</b></h5>
                                    <div className="row" >
                                        {yearOfAuditedFinancial ?
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                <label className="banklabel">Year of audited financials</label>
                                                <input type="text" className="mb-2 inputbox" name="yearOfAuditedFinancial" value={yearOfAuditedFinancial} onChange={(e) => setyearOfAuditedFinancial(e.target.value)} />
                                            </div> : ""}
                                        {Revenue ?
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                <label className="banklabel">Revenue</label>
                                                <input type="text" className="mb-2 inputbox" name="Revenue" value={Revenue} onChange={(e) => setRevenue(e.target.value)} />
                                            </div> : ""}
                                        {Profit ?
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                <label className="banklabel">Profit</label>
                                                <input type="text" className="mb-2 inputbox" name="Profit" value={Profit} onChange={(e) => setProfit(e.target.value)} />
                                            </div> : ""}
                                        {netWorth ?
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                <label className="banklabel">Networth</label>
                                                <input type="text" className="mb-2 inputbox" name="netWorth" value={netWorth} onChange={(e) => setnetWorth(e.target.value)} />
                                            </div> : ""}
                                        {currentAssets ?
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                <label className="banklabel">Current Assets</label>
                                                <input type="text" className="mb-2 inputbox" name="currentAssets" value={currentAssets} onChange={(e) => setcurrentAssets(e.target.value)} />
                                            </div> : ""}
                                        {directorDetails ?
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                <label className="banklabel">Director detail</label>
                                                <input type="text" className="mb-2 inputbox" name="directorDetails" value={directorDetails} onChange={(e) => setdirectorDetails(e.target.value)} />
                                            </div> : ""}
                                        {financial_data ?
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">

                                                {style === "cont2" ?
                                                    <button type="button" onClick={(e) => handleEditPopup("Financials Data1")} className="btn bankbtn btn-primary btn-md m-1">Financials data</button>
                                                    : <button type="button" onClick={(e) => handleView(financial_data)} className="btn bankbtn btn-primary btn-md mt-1">Financials data</button>}
                                                {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">Financials data</button> */}
                                            </div> : ""}
                                        {financial_data2 ?
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                                {style === "cont2" ?
                                                    <button type="button" onClick={(e) => handleEditPopup("Financials Data2")} className="btn bankbtn btn-primary btn-md m-1">Financials data 2</button>
                                                    : <button type="button" onClick={(e) => handleView(financial_data2)} className="btn bankbtn btn-primary btn-md mt-1">Financials data 2</button>}
                                                {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">Financials data 2</button> */}
                                            </div> : ""}
                                    </div>
                                </div></> : ""}

                            <div className="row px-3 pt-2" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Hitachi Contact Team</b></h5>
                                <div className="row" >
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        <label className="banklabel">Name*</label>
                                        <input type="text" className="mb-2 inputbox" name="name" value={name} onChange={(e) => validatename(e)} />
                                        <span className="formError">{nameErr}</span>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        <label className="banklabel">Email*</label>
                                        <input type="text" className="mb-2 inputbox" name="email" value={email} onChange={(e) => validateemail(e)} />
                                        <span className="formError">{emailErr}</span>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        <label className="banklabel">Contact number*</label>
                                        <input type="text" className="mb-2 inputbox" name="contactNumber" value={contactNumber} onChange={(e) => validatecontactNumber(e)} />
                                        <span className="formError">{contactNumberErr}</span>
                                    </div>
                                </div>
                                {name2 && email2 && contactNumber2 ? <>
                                    <div className="row" >
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <label className="banklabel">Name*</label>
                                            <input type="text" className="mb-2 inputbox" name="name2" value={name2} onChange={(e) => setname2(e.target.value)} />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <label className="banklabel">Email*</label>
                                            <input type="text" className="mb-2 inputbox" name="email2" value={email2} onChange={(e) => setemail2(e.target.value)} />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <label className="banklabel">Contact Number*</label>
                                            <input type="text" className="mb-2 inputbox" name="contactNumber2" value={contactNumber2} onChange={(e) => setcontactNumber2(e.target.value)} />
                                        </div>
                                    </div></> : ""}
                                {name3 && email3 && contactNumber3 ? <>
                                    <div className="row" >
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <label className="banklabel">Name*</label>
                                            <input type="text" className="mb-2 inputbox" name="name3" value={name3} onChange={(e) => setname3(e.target.value)} />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <label className="banklabel">Email*</label>
                                            <input type="text" className="mb-2 inputbox" name="email3" value={email3} onChange={(e) => setemail3(e.target.value)} />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <label className="banklabel">Contact Number*</label>
                                            <input type="text" className="mb-2 inputbox" name="contactNumber3" value={contactNumber3} onChange={(e) => setcontactNumber3(e.target.value)} />
                                        </div>
                                    </div></> : ""}
                            </div>
                        </div>

                        {props.japan === 'JapanTeam' || props.MRT === 'MRTteam' ? <></> : <>
                            <div className="section2" >
                                <div className="row px-3 pt-2" >
                                    <div className="col-lg-4 col-sm-6 col-xs-12 mb-3">
                                        <label htmlFor="Distributors">Vendor Type</label>
                                        <select className="form-select" id="Distributors" name="vendorType" aria-label="Disabled select example" value={vendorType} onChange={(e) => validatevendorType(e)}>
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
                                                    <input className="form-check-input" type="radio" name="acManager" id="acManager1" value={"Rajender San"} checked={acManager === "Rajender San"} onChange={(e) => validateacManager(e)} />
                                                    <label className="form-check-label" htmlFor="acManager1">
                                                        Rajender San
                                                    </label>
                                                </div>

                                            </div>
                                            <div className="col-lg-3 col-sm-12 col-xs-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="acManager" id="acManager2" value={"Keshav San"} checked={acManager === "Keshav San"} onChange={(e) => validateacManager(e)} />
                                                    <label className="form-check-label" htmlFor="acManager2">
                                                        Keshav San
                                                    </label>
                                                </div>
                                                <span className="formError">{acManagerErr}</span>
                                            </div>
                                            <div className="col-lg-3 col-sm-12 col-xs-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="mkcheck1" name="mkcheck" checked={mkcheck} onChange={(e) => validatemkcheck(e)} />
                                                    <label className="form-check-label" htmlFor="mkcheck1">
                                                        MK Denial Check
                                                    </label>
                                                </div>
                                                <span className="formError">{mkcheckErr}</span>
                                            </div>

                                            <div className="approvalManagerfile col-lg-3 col-sm-12 col-xs-12">
                                                <label htmlFor="approverFile1">Select File</label>
                                                <input type="file" id="approverFile1" name="approverFile" onChange={onApproverFileChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></>}

                    </div>

                    {props.japan ? <>
                        <div className="float-end my-2" >
                            <button type="button" onClick={(e) => handleConcernFound(props.userid)} className="btn bankbtn btn-primary btn-md m-2">Concern found</button>
                            <button type="button" onClick={(e) => handleNoConcernFound(props.userid)} className="btn bankbtn btn-primary btn-md m-2">No Concern found</button>
                        </div>
                    </> :
                        props.MRT ?
                            <>
                                <div className="float-end" >
                                    <button type="button" onClick={handleEdit} className="btn bankbtn btn-primary btn-md m-2">Edit</button>
                                    <button type="button" className="btn bankbtn btn-primary btn-md m-2">Save</button>
                                    <button type="button" onClick={handleRegject} className="btn bankbtn btn-primary btn-md m-2">Reject</button>
                                    <button type="button" className="btn bankbtn btn-primary btn-md m-2">Approve</button>
                                </div></> : <>
                                <div className="float-end" >
                                    <button type="button" onClick={handleEdit} className="btn bankbtn btn-primary btn-md m-2">Edit</button>
                                    <button type="submit" className="btn bankbtn btn-primary btn-md m-2">Save</button>
                                    <button type="button" onClick={(e) => handleRegject(props.userid)} className="btn bankbtn btn-primary btn-md m-2">Reject</button>
                                    <button type="button" onClick={(e) => handleApprove(props.userid)} className="btn bankbtn btn-primary btn-md m-2">Approve</button>
                                </div></>
                    }

                    {/* </div> */}
                </form>
            </div >
        </Box >
    )
}

export default ApprovalFields
