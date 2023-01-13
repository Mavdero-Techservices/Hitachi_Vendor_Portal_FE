import React, { useState } from 'react';
import "../css/FinancialDetail.css";
import Navbar1 from "../common/navbar.js";
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import apiService from "../services/api.service";
const FinancialDetails = () => {
  const navigate = useNavigate();
  const [fileFD, setfileFD] = useState();
  const [fileFD2, setfileFD2] = useState();
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    yearOfAuditedFinancial: '',
    Revenue: '',
    Profit: '',
    netWorth: '',
    currentAssets: '',
    directorDetails: '',
  });
  function onFileChangeFD(e) {
    setfileFD(e);
  }
  function onFileChangeFD2(e) {
    setfileFD2(e)
  }
  function next(e) {
    navigate('/ContactTeam');
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const saveFinancialDetail = (e) => {

    e.preventDefault()
    const data = new FormData();
    data.append('financial_data', fileFD);
    data.append('financial_data2', fileFD2);
    data.append('yearOfAuditedFinancial', values.yearOfAuditedFinancial);
    data.append('Revenue', values.Revenue);
    data.append('Profit', values.Profit);
    data.append('netWorth', values.netWorth);
    data.append('currentAssets', values.currentAssets);
    data.append('directorDetails', values.directorDetails);
    data.append('userId', values.userId);
    apiService.saveFinacialDetail(data)
      .then(res => {
        if (res.data.status === 'success') {
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
  return (
    <div className="financial-details">
      <Navbar1 />
      <div className="container-fluid  py-5" style={{ backgroundColor: '#f3f4f7' }}>
        <form >
          <div className="container" >
            <span className="financial_title">Financial Detail</span>
            <div className="row p-5" style={{ backgroundColor: '#fff' }}>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="yearOfAuditedFinancial*">Year of audited financial</label>
                <input type="text" className="mb-4 inputbox" name="yearOfAuditedFinancial" value={values.yearOfAuditedFinancial} onChange={handleChange('yearOfAuditedFinancial')} />
                <label htmlFor="netWorth">NetWorth*</label>
                <input type="text" className="mb-4 inputbox" name="netWorth" value={values.netWorth} onChange={handleChange('netWorth')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="Revenue">Revenue*</label>
                <input type="text" className="mb-4 inputbox" name="Revenue" value={values.Revenue} onChange={handleChange('Revenue')} />
                <label htmlFor="currentAssets">Current assets*</label>
                <input type="text" className="mb-4 inputbox" name="currentAssets" value={values.currentAssets} onChange={handleChange('currentAssets')} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="Profit">Profit*</label>
                <input type="text" className="mb-4 inputbox" name="Profit" value={values.Profit} onChange={handleChange('Profit')} />
                <label htmlFor="directorDetails">Director Detail*</label>
                <input type="text" className="mb-4 inputbox" name="directorDetails" value={values.directorDetails} onChange={handleChange('directorDetails')} />
              </div>
            </div>
          </div>
          <div className="container mt-5" >
            <span className="financial_title">Upload Files</span><br />
            <span className="financial_subtitle">Upload your files here for verification.</span>
            <div className="row p-5" style={{ backgroundColor: '#fff' }}>
              <div className="col-sm-6 col-xs-12 my-auto">
                Financial Data
                <FileUploader className="financial_fileupload"
                  handleChange={onFileChangeFD}
                  required
                  type="file"
                  name="fileFD"
                />
                <span>{fileFD ? `File name: ${fileFD.name}` : "No File Chosen"}</span>
              </div>
              <div className="col-sm-4 col-xs-12 my-auto" >
                <button type="button" className="btn  m-2 uploadFile" style={{ fontSize: '12px' }}>Upload files</button>
              </div>
              <div className="col-sm-2 col-xs-12">
              </div>
            </div>
            <div className="row p-5" style={{ backgroundColor: '#fff' }}>
              <div className="col-sm-6 col-xs-12 my-auto">
                Financial Data 2
                <FileUploader className="financial_fileupload"
                  handleChange={onFileChangeFD2}
                  required
                  type="file"
                  name="fileFD2"
                />
                <span>{fileFD2 ? `File name: ${fileFD2.name}` : "No File Chosen"}</span>
              </div>
              <div className="col-sm-4 col-xs-12 my-auto" >
                <button type="button" className="btn  m-2 uploadFile" style={{ fontSize: '12px' }}>Upload files</button>
              </div>
              <div className="col-sm-2 col-xs-12">
              </div>
            </div>
            <div className="float-end" >
              <button type="button" className="btn financialbtn btn-primary btn-md m-3">Cancel</button>
              <button type="submit" onClick={saveFinancialDetail} className="btn financialbtn btn-primary btn-md m-3">Save</button>
              <button type="button" onClick={next} className="btn financialbtn btn-primary btn-md m-3">Next</button>
            </div>
          </div>
        </form>
      </div>
      <div>
      </div>
    </div>
  );
};

export default FinancialDetails;
