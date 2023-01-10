import React, { useState } from 'react';
import "../css/BankDetails.css";
import Navbar1 from "../common/navbar.js";
import { FileUploader } from "react-drag-drop-files";

const BankDetails = () => {
  const [acName, setAcName] = useState("");
  const [bankname, setBankname] = useState("");
  const [acno, setAcno] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [micr, setMicr] = useState("");
  const [branchAdd, setbranchAdd] = useState("");
  const [fileBank, setfileBank] = useState("");

  function onFileChange(file) {
    setfileBank(file);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="bank-details">
      <Navbar1 />
      <div className="container-fluid  py-5" style={{ backgroundColor: '#f3f4f7' }}>
        <form onSubmit={handleSubmit}>
          <div className="container" >
            <span className="bank_title">Bank Details</span>
            <div className="row p-5" style={{ backgroundColor: '#fff' }}>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="Bank A/C name*">Bank A/C name</label>
                <input type="text" className="mb-4 inputbox" name="acName" value={acName} onChange={(e) => setAcName(e.target.value)} />
                <label htmlFor="country">IFSC code*</label>
                <input type="text" className="mb-4 inputbox" name="ifsc" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="country">Bank name*</label>
                <input type="text" className="mb-4 inputbox" name="bankname" value={bankname} onChange={(e) => setBankname(e.target.value)} />
                <label htmlFor="country">MICR code/ Swift code*</label>
                <input type="text" className="mb-4 inputbox" name="micr" value={micr} onChange={(e) => setMicr(e.target.value)} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="country">Bank A/C no*</label>
                <input type="text" className="mb-4 inputbox" name="acno" value={acno} onChange={(e) => setAcno(e.target.value)} />
                <label htmlFor="country">Branch address*</label>
                <input type="text" className="mb-4 inputbox" name="branchAdd" value={branchAdd} onChange={(e) => setbranchAdd(e.target.value)} />
              </div>
            </div>
            <div className="payment-will-be-processed-base" style={{ color: 'red', fontSize: '12px' }}>
              **Payment will be processed based on the mentioned detail only,
              HISYS will not be responsible for the incorrect detail hence bank
              detail should be entered carefully.
            </div>
          </div>
          <div className="container mt-5" >
            <span className="bank_title">Upload Files</span><br />
            <span className="bank_subtitle">Upload your files here for verification.</span>
            <div className="row p-5" style={{ backgroundColor: '#fff' }}>
              <div className="col-sm-6 col-xs-12 my-auto">
                Copy of cancel Cheque/Bank detail duly certified from bank*
                <FileUploader className="bank_fileupload"
                  handleChange={onFileChange}
                  required
                  type="file"
                  name="fileBank"
                />
                <span>{fileBank ? `File name: ${fileBank.name}` : "no files uploaded yet"}</span>
              </div>
              <div className="col-sm-4 col-xs-12 my-auto" >
                <button type="button" className="btn  m-2 uploadFile" style={{ fontSize: '12px' }}>Upload files</button>
              </div>
              <div className="col-sm-2 col-xs-12">
              </div>
            </div>
            <div className="  float-end" >
              <button type="button" className="btn bankbtn btn-primary btn-md m-3">Cancel</button>
              <button type="submit" className="btn bankbtn btn-primary btn-md m-3">Save</button>
              <button type="button" className="btn bankbtn btn-primary btn-md m-3">Next</button>
            </div>
          </div>
        </form>
      </div>
      <div>
      </div>
    </div>
  );
};

export default BankDetails;
