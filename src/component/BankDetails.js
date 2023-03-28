import React, { useState, useEffect } from "react";
import "../css/BankDetails.css";
import Navbar1 from "../common/navbar.js";
import { FileUploader } from "react-drag-drop-files";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const ifscValidation = "^[A-Z]{4}0[A-Z0-9]{6}$";
const BankDetails = (props) => {
  const [EditBank, setEditBank] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [acName, setAcName] = useState("");
  const [bankname, setBankname] = useState("");
  const [acno, setAcno] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [micr, setMicr] = useState("");
  const [branchAdd, setbranchAdd] = useState("");
  const [fileBank, setfileBank] = useState();
  const [editValuefileBank, seteditValuefileBank] = useState("");
  const [deleteUploadedFile, setdeleteUploadedFile] = useState(false);
  const [style, setStyle] = useState("editable");

  const [saveButton, setSaveButton] = useState(true);


  const onFileChange = (file) => {
    if (file.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } else {
      setfileBank(file);
      setdeleteUploadedFile(true);
    }
  };

  function deleteFile(e) {
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
    }).then((ClearData) => {
      if (ClearData.isConfirmed) {
        setfileBank("");
        seteditValuefileBank("");
        setdeleteUploadedFile(false);
      }
    });
  }
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
        setAcName("");
        setBankname("");
        setAcno("");
        setIfsc("");
        setMicr("");
        setbranchAdd("");
        setfileBank("");
        setdeleteUploadedFile(false);
      }
    });
  }
  function next(e) {
    if (params.userId) {
      navigate(`/FinancialDetail/${params.userId}`);
    } else {
      navigate("/FinancialDetail");
    }
  }

  const saveBankDetail = (e) => {
    // e.preventDefault();
    const data = new FormData();
    data.append(
      "userId",
      JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
    );
    data.append("Account_Holder_Name", acName);
    data.append("Bank_Name", bankname);
    data.append("Account_No", acno);
    data.append("IFSC_Code", ifsc);
    data.append("MICRcode", micr);
    data.append("Bank_Address", branchAdd);
    data.append("bankdetailDoc", fileBank);
    if (params.userId) {
      apiService.updateBankDetail(params.userId, data).then((response) => {
        if (response) {
          Swal.fire({
            title: "Data updated",
            icon: "success",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((res) => {
            navigate(`/FinancialDetail/${params.userId}`);
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
      let newuser = JSON.parse(window.sessionStorage.getItem("newregUser"))?.newregUser
      if (newuser) {
        const bankdata = new FormData();
        bankdata.append("userId", newuser);
        bankdata.append("Account_Holder_Name", acName);
        bankdata.append("Bank_Name", bankname);
        bankdata.append("Account_No", acno);
        bankdata.append("IFSC_Code", ifsc);
        bankdata.append("MICRcode", micr);
        bankdata.append("Bank_Address", branchAdd);
        bankdata.append("bankdetailDoc", fileBank);
        apiService.savebankdetail(bankdata).then((response) => {
          setSaveButton(true);
          if (response) {
            Swal.fire({
              title: "Data saved",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,

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
        apiService.savebankdetail(data).then((response) => {
          if (response) {
            Swal.fire({
              title: "Data saved",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((res) => {
              navigate(`/FinancialDetail`);
            });
          } else {
            Swal.fire({
              title: "Error While Fetching",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });
      }
    }
  };

  const updatehandle = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("userId", params.userId);
    data.append("Account_Holder_Name", acName);
    data.append("Bank_Name", bankname);
    data.append("Account_No", acno);
    data.append("IFSC_Code", ifsc);
    data.append("MICRcode", micr);
    data.append("Bank_Address", branchAdd);
    data.append("bankdetailDoc", fileBank);
    if (params.userId) {
      apiService.updateBankDetail(params.userId, data).then((response) => {
        if (response) {
          Swal.fire({
            title: "Data updated",
            icon: "success",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
          });
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
        console.log("res.data.basicInfo[0].submitStatus----------->>>>>", res.data)
        if (
          res.data.basicInfo[0].submitStatus === "Submitted" &&
          finalstatus !== "Approved"
        ) {
          setStyle("notEditable");
        }
        Object.entries(res.data.Bankdetail).map(([key, value]) => {
          var initialUrlbankDoc = res.data.Bankdetail[0].bankdetailDoc;
          var ret = initialUrlbankDoc.replace("uploads/", "");
          var bankdetailDoc = ret;
          setAcName(value.Account_Holder_Name);
          setBankname(value.Bank_Name);
          setAcno(value.Account_No);
          setIfsc(value.IFSC_Code);
          setMicr(value.MICRcode);
          setbranchAdd(value.Bank_Address);
          setfileBank(initialUrlbankDoc);
          seteditValuefileBank(bankdetailDoc);
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
        Object.entries(res.data.Bankdetail).map(([key, value]) => {
          var initialUrlbankDoc = res.data.Bankdetail[0].bankdetailDoc;
          var ret = initialUrlbankDoc.replace("uploads/", "");
          var bankdetailDoc = ret;
          setAcName(value.Account_Holder_Name);
          setBankname(value.Bank_Name);
          setAcno(value.Account_No);
          setIfsc(value.IFSC_Code);
          setMicr(value.MICRcode);
          setbranchAdd(value.Bank_Address);
          setfileBank(initialUrlbankDoc);
          seteditValuefileBank(bankdetailDoc);
        });
      });
    }
    else {
      setEditBank(false);
    }
  }, []);
  return (
    <div className="bank-details">
      <Navbar1 />
      <div className="container-fluid  py-5 pagebg">
        <form style={{ mt: 5 }} className={style}>
          <div className="container">
            <span className="bank_title">Bank Details</span>
            <div className="row p-3 sectionbg">
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">Name as per Bank A/c</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="Account_Holder_Name"
                  value={acName}
                  onChange={(e) => setAcName(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">IFSC code*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="ifsc"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">Bank name*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="Bank_Name"
                  value={bankname}
                  onChange={(e) => setBankname(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">MICR code/ Swift code*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="micr"
                  value={micr}
                  onChange={(e) => setMicr(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">Bank A/C no*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="acno"
                  value={acno}
                  onChange={(e) => setAcno(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">Branch address*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="branchAdd"
                  value={branchAdd}
                  onChange={(e) => setbranchAdd(e.target.value)}
                />
              </div>
            </div>
            <div className="payment-will-be-processed-base">
              **Payment will be processed based on the mentioned detail only,
              HISYS will not be responsible for the incorrect detail hence bank
              detail should be entered carefully.
            </div>
          </div>
          <div className="container mt-3">
            <span className="bank_title">Upload Files</span>
            <br />
            <span className="bank_subtitle">
              Upload your files here for verification.
            </span>
            <div className="row p-3 ml-2 sectionbg">
              <div className="row">
                {" "}
                <span className="ml-2">
                  Copy of cancel Cheque/Bank detail duly certified from bank*
                </span>{" "}
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12 my-auto">
                {EditBank ? (
                  <div>
                    {editValuefileBank != "" ? (
                      <div>
                        <span>File name:{editValuefileBank}</span>
                      </div>
                    ) : (
                      <div>
                        <FileUploader
                          className="bank_fileupload"
                          handleChange={onFileChange}
                          required
                          type="file"
                          name="fileBank"
                          fileOrFiles={deleteUploadedFile}
                          disabled={style === "notEditable" ? true : false}
                        />
                        <span>
                          {fileBank
                            ? `File name: ${fileBank.name}`
                            : "No File Chosen"}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <FileUploader
                      className="bank_fileupload"
                      handleChange={onFileChange}
                      required
                      type="file"
                      name="fileBank"
                      fileOrFiles={deleteUploadedFile}
                    />
                    <span>
                      {fileBank
                        ? `File name: ${fileBank.name}`
                        : "No File Chosen"}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 my-auto">
                {EditBank && editValuefileBank != "" ? (
                  <button
                    type="button"
                    onClick={deleteFile}
                    className="btn m-2 uploadFile"
                  >
                    Delete files
                  </button>
                ) : (
                  <button type="button" className="btn m-2 uploadFile">
                    Upload files
                  </button>
                )}
              </div>
              <div className="col-md-2 col-sm-12 col-xs-12"></div>
            </div>
            <div className="float-end mt-2">
              <button
                type="button"
                onClick={cancel}
                className="btn bankbtn btn-md m-1"
              >
                Cancel
              </button>
              {params.userId ? (
                <>
                  <button
                    type="submit"
                    className="btn bankbtn btn-md m-1"
                    onClick={updatehandle}
                  >
                    update
                  </button>
                </>
              ) : (
                <>
                  {saveButton === true ? (
                    <button
                      type="button"
                      className="btn bankbtn btn-md m-1"
                      onClick={() => {
                        saveBankDetail();
                        setSaveButton(false);
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn bankbtn btn-md m-1"
                      disabled
                    >
                      Save
                    </button>
                  )}
                </>
              )}

              <button
                type="button"
                onClick={next}
                className="btn bankbtn btn-md m-1"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankDetails;
