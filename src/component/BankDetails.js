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
    e.preventDefault();
    const data = new FormData();
    data.append(
      "userId",
      JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
    );
    data.append("bankAccountName", acName);
    data.append("bankName", bankname);
    data.append("bankAccountNumber", acno);
    data.append("ifscCode", ifsc);
    data.append("MICRcode", micr);
    data.append("branchAddress", branchAdd);
    data.append("bankdetailDoc", fileBank);
    if (params.userId) {
      apiService.updateBankDetail(params.userId, data).then((response) => {
        if (response) {
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((res) => {
            if (res.isConfirmed) {
              navigate("/FinancialDetail");
            }
          })
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
            if (res.isConfirmed) {
              navigate("/FinancialDetail");
            }
          })
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append(
      "userId",
      JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
    );
    data.append("bankAccountName", acName);
    data.append("bankName", bankname);
    data.append("bankAccountNumber", acno);
    data.append("ifscCode", ifsc);
    data.append("MICRcode", micr);
    data.append("branchAddress", branchAdd);
    data.append("bankdetailDoc", fileBank);
    if (params.userId) {
      apiService.updateBankDetail(params.userId, data).then((response) => {
        if (response) {
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((res) => {
            // navigate(`/bank/${JSON.parse(window.sessionStorage.getItem("jwt")).result.userId}`);
          })
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
    if (params.userId) {
      apiService.getAllCollection(params.userId).then((res) => {
        console.log("res.data.basicInfo[0].submitStatus----------->>>>>>", res.data.basicInfo[0].submitStatus)
        if (res.data.basicInfo[0].submitStatus === "Submitted") {
          setStyle('notEditable');
        }
        Object.entries(res.data.Bankdetail).map(([key, value]) => {
          var initialUrlbankDoc = res.data.Bankdetail[0].bankdetailDoc;
          var ret = initialUrlbankDoc.replace("uploads/", "");
          var bankdetailDoc = ret;
          setAcName(value.bankAccountName);
          setBankname(value.bankName);
          setAcno(value.bankAccountNumber);
          setIfsc(value.ifscCode);
          setMicr(value.MICRcode);
          setbranchAdd(value.branchAddress);
          setfileBank(initialUrlbankDoc);
          seteditValuefileBank(bankdetailDoc);
        });
      });
    } else {
      setEditBank(false);
    }
  }, []);
  return (
    <div className="bank-details">
      <Navbar1 />
      <div className="container-fluid  py-5 pagebg">
        <form onSubmit={handleSubmit} style={{mt:5}} className={style}>
          <div className="container">
            <span className="bank_title">Bank Details</span>
            <div className="row p-3 sectionbg">
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">Name as per Bank A/c</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="acName"
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
                  name="bankname"
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
                          disabled={style==='notEditable'? true:false}
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
              <button type="submit" className="btn bankbtn btn-md m-1">
                Save
              </button>
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
