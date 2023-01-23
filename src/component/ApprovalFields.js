import React, { useState } from 'react';
import { Box } from '@mui/material'
import "../css/ApprovalFields.css";
// import apiService from "../services/api.service";
import Swal from "sweetalert2";

function ApprovalFields(props) {
    // const [company_logo, setcompany_logo] = useState("");
    const [address1, setaddress1] = useState("");
    const [address2, setaddress2] = useState("");
    const [companyName, setcompanyName] = useState("Hitachi");
    const [country, setcountry] = useState("");
    const [state, setstate] = useState("");
    const [city, setcity] = useState();
    const [pinCode, setpinCode] = useState();

    const [fs_ContactName, setfs_ContactName] = useState("");
    const [fs_Designation, setfs_Designation] = useState("");
    const [fs_PhoneNo, setfs_PhoneNo] = useState("");
    const [fs_Email, setfs_Email] = useState("");
    const [ops_ContactName, setops_ContactName] = useState("");
    const [ops_Designation, setops_Designation] = useState("");
    const [ops_PhoneNo, setops_PhoneNo] = useState();
    const [ops_Email, setops_Email] = useState("");
    const [mngs_ContactName, setmngs_ContactName] = useState("");
    const [mngs_Designation, setmngs_Designation] = useState("");
    const [mngs_PhoneNo, setmngs_PhoneNo] = useState("");
    const [mngs_Email, setmngs_Email] = useState("");
    const [others_ContactName, setothers_ContactName] = useState("");
    const [others_Designation, setothers_Designation] = useState();
    const [others_PhoneNo, setothers_PhoneNo] = useState("");
    const [others_Email, setothers_Email] = useState("");
    // const [mastervendor_email, setmastervendor_email] = useState();

    const [GST_type, setGST_type] = useState("");
    const [GST_No, setGST_No] = useState("");
    const [GST_Doc, setGST_Doc] = useState("");
    const [PAN_No, setPAN_No] = useState("");
    const [PAN_Doc, setPAN_Doc] = useState("");
    const [CIN_No, setCIN_No] = useState("");
    const [form_10f, setform_10f] = useState("");
    const [pe_declaration, setpe_declaration] = useState();
    const [MSME_status, setMSME_status] = useState("");
    const [MSME_No, setMSME_No] = useState("");
    const [MSME_Doc, setMSME_Doc] = useState("");
    const [MSME_Type, setMSME_Type] = useState("");
    const [TAN_No, setTAN_No] = useState("");
    const [TAN_Doc, setTAN_Doc] = useState("");
    const [Tax_residency, setTax_residency] = useState();

    // const [RPD_Doc, setRPD_Doc] = useState("");
    // const [COC_Doc, setCOC_Doc] = useState("");
    // const [NDA_Doc, setNDA_Doc] = useState("");

    const [yearOfAuditedFinancial, setyearOfAuditedFinancial] = useState("");
    const [Revenue, setRevenue] = useState("");
    const [Profit, setProfit] = useState("");
    const [netWorth, setnetWorth] = useState("");
    const [currentAssets, setcurrentAssets] = useState("");
    const [directorDetails, setdirectorDetails] = useState("");
    // const [financial_data, setfinancial_data] = useState();
    // const [financial_data2, setfinancial_data2] = useState();

    const [bankAccountName, setbankAccountName] = useState("");
    const [bankName, setbankName] = useState("");
    const [bankAccountNumber, setbankAccountNumber] = useState("");
    const [ifscCode, setifscCode] = useState("");
    const [MICRcode, setMICRcode] = useState("");
    const [branchAddress, setbranchAddress] = useState();
    // const [bankdetailDoc, setbankdetailDoc] = useState();

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

    const [formdata, setformdata] = useState();
    const onApproverFileChange = (event) => {
        setapproverFile(event.target.files[0])
    }

    const handleEdit = (event) => {
        setStyle("cont2");
        console.log("edit", style)
    }

    const handleRegject = (event) => {
        event.preventDefault();
        console.log("handleRegject", "handleRegject")
        // apiService.savebankdetail(data)
        //   .then(response => {
        //     if (response) {
        // const { value: text } = Swal.fire({
        //     input: 'textarea',
        //     inputLabel: 'Comment',
        //     inputPlaceholder: 'Type your comments here...',
        //     inputAttributes: {
        //         'aria-label': 'Type your comments here'
        //     },
        //     showCancelButton: true,
        // })
        Swal.fire({
            heightAuto: true,
            title: 'Review vendor details',
            html: `<div class="rejectstyle">
            <textarea rows="10" cols="30" id="comment" class="swal2-input" placeholder="Comments "></textarea>
            <input type="file" id="rejectdoc" class="swal2-input" placeholder="Select file">
       </div> `,
            confirmButtonText: 'Reject',
            showCancelButton: true,
            focusConfirm: false,
            customClass: 'swal-wide',
            preConfirm: () => {

                const comment = Swal.getPopup().querySelector('#comment').value
                const rejectdoc = Swal.getPopup().querySelector('#rejectdoc').files[0]
                if (!comment || !rejectdoc) {
                    Swal.showValidationMessage(`Please enter comments and file`)
                } else {
                    const reject = {
                        "comment": comment,
                        "rejectdoc": rejectdoc
                    }
                    console.log("reject---------->>", reject)
                }
            }
        })

    }
    const handleSubmit = (event) => {
        event.preventDefault();

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
            "pinCode": pinCode
        }
        const communicationDetails =
        {
            "userid": 1,
            "fs_ContactName": fs_ContactName,
            "fs_Designation": fs_Designation,
            "fs_PhoneNo": fs_PhoneNo,
            "fs_Email": fs_Email,
            "ops_ContactName": ops_ContactName,
            "ops_Designation": ops_Designation,
            "ops_PhoneNo": ops_PhoneNo,
            "ops_Email": ops_Email,
            "mngs_ContactName": mngs_ContactName,
            "mngs_Designation": mngs_Designation,
            "mngs_PhoneNo": mngs_PhoneNo,
            "mngs_Email": mngs_Email,
            "others_ContactName": others_ContactName,
            "others_Designation": others_Designation,
            "others_PhoneNo": others_PhoneNo,
            "others_Email": others_Email,
            // "mastervendor_email": mastervendor_email
        }
        const statutoryDetails =
        {
            "userid": 1,
            "GST_type": GST_type,
            "GST_No": GST_No,
            "GST_Doc": GST_Doc,
            "PAN_No": PAN_No,
            "PAN_Doc": PAN_Doc,
            "CIN_No": CIN_No,
            "form_10f": form_10f,
            "pe_declaration": pe_declaration,
            "MSME_status": MSME_status,
            "MSME_No": MSME_No,
            "MSME_Doc": MSME_Doc,
            "MSME_Type": MSME_Type,
            "TAN_No": TAN_No,
            "TAN_Doc": TAN_Doc,
            "Tax_residency": Tax_residency
        }
        const complianceDetails =
        {
            "userid": 1,
            "RPD_Doc": "RPD_Doc",
            "COC_Doc": "COC_Doc",
            "NDA_Doc": "NDA_Doc"
        }
        const financeDetails =
        {
            "userid": 1,
            "yearOfAuditedFinancial": yearOfAuditedFinancial,
            "Revenue": Revenue,
            "Profit": Profit,
            "netWorth": netWorth,
            "currentAssets": currentAssets,
            "directorDetails": directorDetails,
            // "financial_data": financial_data,
            // "financial_data2": financial_data2
        }
        const bankDetails =
        {
            "userid": 1,
            "bankAccountName": bankAccountName,
            "bankName": bankName,
            "bankAccountNumber": bankAccountNumber,
            "ifscCode": ifscCode,
            "MICRcode": MICRcode,
            "branchAddress": branchAddress,
            // "bankdetailDoc": bankdetailDoc
        }
        const contactDetails =
        {
            "userid": 1,
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
        const ApproverDetails = {
            "vendorType": vendorType,
            "acManager": acManager,
            "mkcheck": mkcheck,
            "approverFile": approverFile
        }
        // apiService.savebankdetail(data)
        //   .then(response => {
        //     if (response) {
        //       Swal.fire({
        //         title: "Data saved",
        //         icon: "success",
        //         confirmButtonText: "OK",
        //       });
        //     }
        //     else {
        //       Swal.fire({
        //         title: "Error While Fetching",
        //         icon: "error",
        //         confirmButtonText: "OK",
        //       });
        //     }
        //   })
    }

    return (
        <Box>
            <div className="container-fluid  py-2" style={{ backgroundColor: '#f3f4f7' }}>
                <form className={style} style={{ marginBottom: '3em' }} onSubmit={handleSubmit} disabled>
                    {/* <div > */}
                    <div className={style}>
                        <div style={{ overflowY: 'scroll', height: '300px' }}>

                            <div className="row px-5  pt-2" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Vendor Details Basic Informations</b></h5>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="companyName*">Company Name</label>
                                    <input type="text" className="mb-4 inputbox" name="companyName" value={companyName} onChange={(e) => setcompanyName(e.target.value)} />
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="address1">Address 1</label>
                                    <input type="text" className="mb-4 inputbox" name="address1" value={address1} onChange={(e) => setaddress1(e.target.value)} />
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="address2">Address 2</label>
                                    <input type="text" className="mb-4 inputbox" name="address2" value={address2} onChange={(e) => setaddress2(e.target.value)} />

                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" className="mb-4 inputbox" name="country" value={country} onChange={(e) => setcountry(e.target.value)} />
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="state">State</label>
                                    <input type="text" className="mb-4 inputbox" name="state" value={state} onChange={(e) => setstate(e.target.value)} />

                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="mb-4 inputbox" name="city" value={city} onChange={(e) => setcity(e.target.value)} />
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="pinCode">PinCode</label>
                                    <input type="text" className="mb-4 inputbox" name="pinCode" value={pinCode} onChange={(e) => setpinCode(e.target.value)} />
                                </div>
                                {/* <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Phone No.</label>
                                    <input type="text" className="mb-4 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Vendor Payment Term</label>
                                    <input type="text" className="mb-4 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Contact Name</label>
                                    <input type="text" className="mb-4 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Email</label>
                                    <input type="text" className="mb-4 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div> */}
                                {/* <div className="col-lg-4 col-sm-6 col-xs-12 mt-2">
                                    <button type="button" className="btn bankbtn btn-primary btn-md m-2">View logo</button>
                                </div> */}

                            </div>

                            <div className="row px-5" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Communication Details</b></h5>
                                <p><b>Finance Spoc</b></p>
                                <div className="row">
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="fs_ContactName">Contact Name</label>
                                        <input type="text" className="mb-4 inputbox" name="fs_ContactName" value={fs_ContactName} onChange={(e) => setfs_ContactName(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="fs_Designation">Designation</label>
                                        <input type="text" className="mb-4 inputbox" name="fs_Designation" value={fs_Designation} onChange={(e) => setfs_Designation(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="fs_PhoneNo">Phone no</label>
                                        <input type="text" className="mb-4 inputbox" name="fs_PhoneNo" value={fs_PhoneNo} onChange={(e) => setfs_PhoneNo(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="fs_Email">Email</label>
                                        <input type="text" className="mb-4 inputbox" name="fs_Email" value={fs_Email} onChange={(e) => setfs_Email(e.target.value)} />
                                    </div>
                                </div>

                                <p><b>Operation Spoc</b></p>
                                <div className="row" >
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="ops_ContactName">Contact Name</label>
                                        <input type="text" className="mb-4 inputbox" name="ops_ContactName" value={ops_ContactName} onChange={(e) => setops_ContactName(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="ops_Designation">Designation</label>
                                        <input type="text" className="mb-4 inputbox" name="ops_Designation" value={ops_Designation} onChange={(e) => setops_Designation(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="ops_PhoneNo">Phone no</label>
                                        <input type="text" className="mb-4 inputbox" name="ops_PhoneNo" value={ops_PhoneNo} onChange={(e) => setops_PhoneNo(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="ops_Email">Email</label>
                                        <input type="text" className="mb-4 inputbox" name="ops_Email" value={ops_Email} onChange={(e) => setops_Email(e.target.value)} />
                                    </div>
                                </div>

                                {/* <p><b>Collection Spoc</b></p> */}
                                {/* <div className="row" >
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="country">Contact Name</label>
                                        <input type="text" className="mb-4 inputbox" name="branchAdd" value={""}  onChange={(e) => setfs_Email(e.target.value)}/>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="country">Designation</label>
                                        <input type="text" className="mb-4 inputbox" name="branchAdd" value={""}  onChange={(e) => setfs_Email(e.target.value)}/>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="country">Phone no</label>
                                        <input type="text" className="mb-4 inputbox" name="branchAdd" value={""}  onChange={(e) => setfs_Email(e.target.value)}/>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="country">Email</label>
                                        <input type="text" className="mb-4 inputbox" name="branchAdd" value={""}  onChange={(e) => setfs_Email(e.target.value)}/>
                                    </div>
                                </div> */}


                                <p><b>Management Spoc</b></p>
                                <div className="row" >
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="mngs_ContactName">Contact Name</label>
                                        <input type="text" className="mb-4 inputbox" name="branchAdd" value={mngs_ContactName} onChange={(e) => setmngs_ContactName(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="mngs_Designation">Designation</label>
                                        <input type="text" className="mb-4 inputbox" name="mngs_Designation" value={mngs_Designation} onChange={(e) => setmngs_Designation(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="mngs_PhoneNo">Phone no</label>
                                        <input type="text" className="mb-4 inputbox" name="mngs_PhoneNo" value={mngs_PhoneNo} onChange={(e) => setmngs_PhoneNo(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="mngs_Email">Email</label>
                                        <input type="text" className="mb-4 inputbox" name="mngs_Email" value={mngs_Email} onChange={(e) => setmngs_Email(e.target.value)} />
                                    </div>
                                </div>

                                <p><b>Others</b></p>
                                <div className="row" >
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="others_ContactName">Contact Name</label>
                                        <input type="text" className="mb-4 inputbox" name="others_ContactName" value={others_ContactName} onChange={(e) => setothers_ContactName(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="others_Designation">Designation</label>
                                        <input type="text" className="mb-4 inputbox" name="others_Designation" value={others_Designation} onChange={(e) => setothers_Designation(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="others_PhoneNo">Phone no</label>
                                        <input type="text" className="mb-4 inputbox" name="others_PhoneNo" value={others_PhoneNo} onChange={(e) => setothers_PhoneNo(e.target.value)} />
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                        <label htmlFor="others_Email">Email</label>
                                        <input type="text" className="mb-4 inputbox" name="others_Email" value={others_Email} onChange={(e) => setothers_Email(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="pinCode">Master vendor email id*</label>
                                    <input type="text" className="mb-4 inputbox" name="pinCode" value={pinCode} onChange={(e) => setpinCode(e.target.value)} />
                                </div>
                            </div>

                            <div className="row px-5" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Statutary Details</b></h5>
                                <div className="row" >
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                                        <div className="row">
                                            <label>Vendor GST Type*</label>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="GST_type" id="flexRadioDefault1" value={"Registered"} checked={GST_type === "Registered"} onChange={(e) => setGST_type(e.target.value)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Registered
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="GST_type" id="flexRadioDefault2" value={"UnRegistered"} checked={GST_type === "UnRegistered"} onChange={(e) => setGST_type(e.target.value)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                        UnRegistered
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="GST_type" id="flexRadioDefault3" value={"Import"} checked={GST_type === "Import"} onChange={(e) => setGST_type(e.target.value)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                        Import
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                                        <div className="row">
                                            <label>MSME status*</label>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="MSME_status" id="MSME_status1" value={"Registered"} checked={MSME_status === "Registered"} onChange={(e) => setMSME_status(e.target.value)} />
                                                    <label className="form-check-label" htmlFor="MSME_status1">
                                                        Registered
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="MSME_status" id="MSME_status2" value={"UnRegistered"} checked={MSME_status === "UnRegistered"} onChange={(e) => setMSME_status(e.target.value)} />
                                                    <label className="form-check-label" htmlFor="MSME_status2">
                                                        UnRegistered
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-2">
                                        <div className="row">
                                            <div className="col-sm-12 col-lg-8">
                                                <label htmlFor="GST_No">GST no*</label>
                                                <input type="text" className="mb-4 inputbox" name="GST_No" value={GST_No} onChange={(e) => setGST_No(e.target.value)} />
                                            </div>
                                            <div className="col-sm-12 col-lg-4 m-auto">
                                                <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button>
                                                {/* <label htmlFor="GST_Doc1">UPLOAD GST</label>
                                                <input type="file" id="GST_Doc1" name="GST_Doc" value={GST_Doc} onChange={(e) => setGST_Doc(e.target.value)} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-2">
                                        <div className="row">
                                            <div className="col-sm-12 col-lg-8">
                                                <label htmlFor="MSME_No">MSME no*</label>
                                                <input type="text" className="mb-4 inputbox" name="MSME_No" value={MSME_No} onChange={(e) => setMSME_No(e.target.value)} />
                                            </div>
                                            <div className="col-sm-12 col-lg-4 m-auto">
                                                <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button>
                                                {/* <label htmlFor="MSME_Doc1">UPLOAD MSME</label>
                                                <input type="file" id="MSME_Doc1" name="MSME_Doc" value={MSME_Doc} onChange={(e) => setMSME_Doc(e.target.value)} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                                        <div className="row">
                                            <div className="col-sm-12 col-lg-8">
                                                <label htmlFor="PAN_No">PAN no*</label>
                                                <input type="text" className="mb-4 inputbox" name="PAN_No" value={PAN_No} onChange={(e) => setPAN_No(e.target.value)} />
                                            </div>
                                            <div className="col-sm-12 col-lg-4 m-auto">
                                                <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button>
                                                {/* <label htmlFor="PAN_Doc1">UPLOAD PAN</label>
                                                <input type="file" id="PAN_Doc1" value={PAN_Doc} onChange={(e) => setPAN_Doc(e.target.value)} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                                        <div className="row">
                                            <label>MSME Type*</label>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="MSME_Type" id="MSME_Type1" value={"Micro"} checked={MSME_Type === "Micro"} onChange={(e) => setMSME_Type(e.target.value)} />
                                                    <label className="form-check-label" htmlFor="MSME_Type1">
                                                        Micro
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="MSME_Type" id="MSME_Type2" value={"Small"} checked={MSME_Type === "Small"} onChange={(e) => setMSME_Type(e.target.value)} />
                                                    <label className="form-check-label" htmlFor="MSME_Type2">
                                                        Small
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="MSME_Type" id="MSME_Type3" value={"Macro"} checked={MSME_Type === "Macro"} onChange={(e) => setMSME_Type(e.target.value)} />
                                                    <label className="form-check-label" htmlFor="MSME_Type3">
                                                        Macro
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                                        {/* <div className="row">
                                            <div className="col-sm-12 col-md-8"> */}
                                                <label htmlFor="CIN_No">CIN no*</label>
                                                <input type="text" className="mb-4 inputbox" name="CIN_No" value={CIN_No} onChange={(e) => setCIN_No(e.target.value)} />
                                            {/* </div> */}
                                        {/* </div> */}
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12">
                                        <div className="row">
                                            <div className="col-sm-12 col-lg-8">
                                                <label htmlFor="TAN_No">TAN no*</label>
                                                <input type="text" className="mb-4 inputbox" name="TAN_No" value={TAN_No} onChange={(e) => setTAN_No(e.target.value)} />
                                            </div>
                                            <div className="col-sm-12 col-lg-4 m-auto">
                                                <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button>
                                                {/* <label htmlFor="TAN_Doc1">UPLOAD TAN</label>
                                                <input type="file" id="TAN_Doc1" value={TAN_Doc} onChange={(e) => setTAN_Doc(e.target.value)} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                                        {/* <div className="row">
                                            <div className="col-sm-12 col-md-8"> */}
                                                <label htmlFor="form_10f">Form 10F*</label>
                                                <input type="text" className="mb-4 inputbox" name="form_10f" value={form_10f} onChange={(e) => setform_10f(e.target.value)} />
                                            {/* </div> */}
                                            {/* <div className="col-sm-12 col-md-4 approvalManagerfile mt-4">
                                                <label htmlFor="fileupload">UPLOAD FORM 10F</label>
                                                <input type="file" id="fileupload" />
                                            </div> */}
                                        {/* </div> */}
                                    </div>
                                    <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                                        {/* <div className="row">
                                            <div className="col-sm-12 col-md-8"> */}
                                                <label htmlFor="Tax_residency">Tax Residency certificate*</label>
                                                <input type="text" className="mb-4 inputbox" name="Tax_residency" value={Tax_residency} onChange={(e) => setTax_residency(e.target.value)} />
                                            {/* </div> */}
                                            {/* <div className="col-sm-12 col-md-4 approvalManagerfile mt-4">
                                                <label htmlFor="fileupload">UPLOAD TRC</label>
                                                <input type="file" id="fileupload" />
                                            </div> */}
                                        {/* </div> */}
                                    </div>
                                    <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                                        {/* <div className="row">
                                            <div className="col-sm-12 col-md-8"> */}
                                                <label htmlFor="pe_declaration">No PE declaration*</label>
                                                <input type="text" className="mb-4 inputbox" name="pe_declaration" value={pe_declaration} onChange={(e) => setpe_declaration(e.target.value)} />
                                            {/* </div> */}
                                            {/* <div className="col-sm-12 col-md-4 approvalManagerfile mt-4">
                                                <label htmlFor="fileupload">UPLOAD GST</label>
                                                <input type="file" id="fileupload" />
                                            </div> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row px-5" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Compliance Details</b></h5>
                                <div className="row text-center" >
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                                        <div className="row text-center" >
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <label className="banklabel">Related party disclosure*</label>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                                        <div className="row text-center" >
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <label className="banklabel">COC for services support/ installation*</label>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                                        <div className="row text-center" >
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                <label className="banklabel">Non disclosure agreement*</label>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row px-5 pt-2" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Bank Details</b></h5>
                                <div className="row" >
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Name as per Bank A/c</label>
                                        <input type="text" className="mb-4 inputbox" name="bankAccountName" value={bankAccountName} onChange={(e) => setbankAccountName(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">IFSC code*</label>
                                        <input type="text" className="mb-4 inputbox" name="ifscCode" value={ifscCode} onChange={(e) => setifscCode(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Bank name*</label>
                                        <input type="text" className="mb-4 inputbox" name="bankName" value={bankName} onChange={(e) => setbankName(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">MICR code/ Swift code*</label>
                                        <input type="text" className="mb-4 inputbox" name="MICRcode" value={MICRcode} onChange={(e) => setMICRcode(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Bank A/C no*</label>
                                        <input type="text" className="mb-4 inputbox" name="bankAccountNumber" value={bankAccountNumber} onChange={(e) => setbankAccountNumber(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Branch address*</label>
                                        <input type="text" className="mb-4 inputbox" name="branchAddress" value={branchAddress} onChange={(e) => setbranchAddress(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <button type="button" className="btn bankbtn btn-primary btn-md m-2">View File</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row px-5 pt-2" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Financial Details</b></h5>
                                <div className="row" >
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Year of audited financials</label>
                                        <input type="text" className="mb-4 inputbox" name="yearOfAuditedFinancial" value={yearOfAuditedFinancial} onChange={(e) => setyearOfAuditedFinancial(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Revenue</label>
                                        <input type="text" className="mb-4 inputbox" name="Revenue" value={Revenue} onChange={(e) => setRevenue(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Profit</label>
                                        <input type="text" className="mb-4 inputbox" name="Profit" value={Profit} onChange={(e) => setProfit(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Networth</label>
                                        <input type="text" className="mb-4 inputbox" name="netWorth" value={netWorth} onChange={(e) => setnetWorth(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Current Assets</label>
                                        <input type="text" className="mb-4 inputbox" name="currentAssets" value={currentAssets} onChange={(e) => setcurrentAssets(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Director detail</label>
                                        <input type="text" className="mb-4 inputbox" name="directorDetails" value={directorDetails} onChange={(e) => setdirectorDetails(e.target.value)} />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                        <button type="button" className="btn bankbtn btn-primary btn-md m-1">Financials data</button>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                        <button type="button" className="btn bankbtn btn-primary btn-md m-1">Financials data 2</button>
                                    </div>
                                </div>
                            </div>

                            <div className="row px-5 pt-2" style={{ backgroundColor: '#fff' }}>
                                <h5 className="headlines"><b>Hitachi Contact Team</b></h5>
                                <div className="row" >
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Name*</label>
                                        <input type="text" className="mb-4 inputbox" name="name" value={name} onChange={(e) => setname(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Email*</label>
                                        <input type="text" className="mb-4 inputbox" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Contact number*</label>
                                        <input type="text" className="mb-4 inputbox" name="contactNumber" value={contactNumber} onChange={(e) => setcontactNumber(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Name*</label>
                                        <input type="text" className="mb-4 inputbox" name="name2" value={name2} onChange={(e) => setname2(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Email*</label>
                                        <input type="text" className="mb-4 inputbox" name="email2" value={email2} onChange={(e) => setemail2(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Contact Number*</label>
                                        <input type="text" className="mb-4 inputbox" name="contactNumber2" value={contactNumber2} onChange={(e) => setcontactNumber2(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Name*</label>
                                        <input type="text" className="mb-4 inputbox" name="name3" value={name3} onChange={(e) => setname3(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Email*</label>
                                        <input type="text" className="mb-4 inputbox" name="email3" value={email3} onChange={(e) => setemail3(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <label className="banklabel">Contact Number*</label>
                                        <input type="text" className="mb-4 inputbox" name="contactNumber3" value={contactNumber3} onChange={(e) => setcontactNumber3(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="section2" >
                            <div className="row px-5 pt-2" >
                                <div className="col-lg-4 col-sm-6 col-xs-12 mb-3">
                                    <label htmlFor="Distributors">Vendor Type</label>
                                    <select className="form-select" id="Distributors" name="vendorType" aria-label="Disabled select example" value={vendorType} onChange={(e) => setvendorType(e.target.value)}>
                                        {/* <option selected>Open this select menu</option> */}
                                        <option value="Distributor">Distributor</option>
                                        <option value="import">import</option>
                                        <option value="OEM">OEM</option>
                                        <option value="local vendor">local vendor</option>
                                        <option value="others">others</option>
                                    </select>
                                </div>
                                <div className="col-lg-8 col-sm-6 col-xs-12 pt-1">
                                    <span>Vendor A/C Manager</span>
                                    <div className="row">
                                        <div className="col-lg-3 col-sm-12 col-xs-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="acManager" id="acManager1" value={"Rajender San"} checked={acManager === "Rajender San"} onChange={(e) => setacManager(e.target.value)} />
                                                <label className="form-check-label" htmlFor="acManager1">
                                                    Rajender San
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-12 col-xs-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="acManager" id="acManager2" value={"Keshav San"} checked={acManager === "Keshav San"} onChange={(e) => setacManager(e.target.value)} />
                                                <label className="form-check-label" htmlFor="acManager2">
                                                    Keshav San
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-12 col-xs-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="mkcheck1" name="mkcheck" checked={mkcheck} onChange={(e) => setmkcheck(!mkcheck)} />
                                                <label className="form-check-label" htmlFor="mkcheck1">
                                                    MK Denial Check
                                                </label>
                                            </div>
                                        </div>
                                        <div className="approvalManagerfile col-lg-2 col-sm-12 col-xs-12">
                                            <label htmlFor="approverFile1">Select File</label>
                                            <input type="file" id="approverFile1" onChange={onApproverFileChange} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="float-end" >
                        <button type="button" onClick={handleEdit} className="btn bankbtn btn-primary btn-md m-2">Edit</button>
                        <button type="submit" className="btn bankbtn btn-primary btn-md m-2">Save</button>
                        <button type="button" onClick={handleRegject} className="btn bankbtn btn-primary btn-md m-2">Reject</button>
                        <button type="button" className="btn bankbtn btn-primary btn-md m-2">Approve</button>
                    </div>
                    {/* </div> */}
                </form>
            </div >
        </Box >
    )
}

export default ApprovalFields
