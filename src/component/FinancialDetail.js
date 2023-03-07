import React, { useState, useEffect } from "react";
import "../css/FinancialDetail.css";
import Navbar1 from "../common/navbar.js";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { useParams } from "react-router-dom";
const FinancialDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [EditfinancialDetail, setEditfinancialDetail] = useState(true);
  const [deleteUploadedFile, setdeleteUploadedFile] = useState(false);
  const [deleteUploadedFile2, setdeleteUploadedFile2] = useState(false);
  const [errors, setErrors] = useState({});
  const [fileFD, setfileFD] = useState();
  const [editfileFD, seteditfileFD] = useState();
  const [fileFD2, setfileFD2] = useState();
  const [editfileFD2, seteditfileFD2] = useState();
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    yearOfAuditedFinancial: "",
    Revenue: "",
    Profit: "",
    netWorth: "",
    currentAssets: "",
    directorDetails: "",
  });
  function onFileChangeFD(e) {
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      setfileFD(e);
      setdeleteUploadedFile(true);
    }
  }
  function onFileChangeFD2(e) {
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      setfileFD2(e);
      setdeleteUploadedFile2(true);
    }
  }
  function deleteFile1(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to delete file?",
      icon: "success",
      confirmButtonText: "OK",
    }).then((ClearData) => {
      setfileFD("");
      setdeleteUploadedFile(false);
      seteditfileFD("");
    });
  }
  function deleteFile2(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to delete file?",
      icon: "success",
      confirmButtonText: "OK",
    }).then((ClearData) => {
      setfileFD2("");
      setdeleteUploadedFile2(false);
      seteditfileFD2("");
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
        setValues({
          yearOfAuditedFinancial: "",
          Revenue: "",
          Profit: "",
          netWorth: "",
          currentAssets: "",
          directorDetails: "",
        });
        setfileFD2("");
        setfileFD("");
        setdeleteUploadedFile(false);
        setdeleteUploadedFile2(false);
      }
    });
  }
  function next(e) {
    saveFinancialDetail(e);
    navigate("/ContactTeam");
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
    const { yearOfAuditedFinancial } = values;

    const newErrors = {};

    if (yearOfAuditedFinancial.length < 4) {
      newErrors.yearOfAuditedFinancial = "Please enter valid year";
    }
    return newErrors;
  };
  const saveFinancialDetail = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("financial_data", fileFD);
    data.append("financial_data2", fileFD2);
    data.append("yearOfAuditedFinancial", values.yearOfAuditedFinancial);
    data.append("Revenue", values.Revenue);
    data.append("Profit", values.Profit);
    data.append("netWorth", values.netWorth);
    data.append("currentAssets", values.currentAssets);
    data.append("directorDetails", values.directorDetails);
    data.append(
      "userId",
      JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
    );
    if (params.userId) {
      apiService.updateFinacialDetail(params.userId, data).then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            title: "Data updated",
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
      apiService.saveFinacialDetail(data).then((res) => {
        if (res.data.status === "success") {
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
    }
  };
  useEffect(() => {
    if (params.userId) {
      apiService.getAllCollection(params.userId).then((res) => {
        Object.entries(res.data.FinancialDetail).map(([key, value]) => {
          var initialUrlfinancial_data =
            res.data.FinancialDetail[0].financial_data;
          var replaceUrlFinancialData1 = initialUrlfinancial_data.replace(
            "uploads/",
            ""
          );
          var initialUrlfinancial_data2 =
            res.data.FinancialDetail[0].financial_data2;
          var replaceUrlFinancialData2 = initialUrlfinancial_data2.replace(
            "uploads/",
            ""
          );
          setValues({
            yearOfAuditedFinancial: value.yearOfAuditedFinancial,
            Revenue: value.Revenue,
            Profit: value.Profit,
            netWorth: value.netWorth,
            currentAssets: value.currentAssets,
            directorDetails: value.directorDetails,
          });
          setfileFD2(initialUrlfinancial_data2);
          setfileFD(initialUrlfinancial_data);
          seteditfileFD(replaceUrlFinancialData1);
          seteditfileFD2(replaceUrlFinancialData2);
          setEditfinancialDetail(true);
        });
      });
    } else {
      setEditfinancialDetail(false);
    }
  }, []);
  return (
    <div className="financial-details">
      <Navbar1 />
      <div
        className="container-fluid  py-5"
        style={{ backgroundColor: "#f3f4f7" }}
      >
        <form>
          <div className="container">
            <span className="financial_title">Financial Detail</span>
            <div className="row p-5" style={{ backgroundColor: "#fff" }}>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="yearOfAuditedFinancial">
                  Year of audited financial
                </label>
                <input
                  type="number"
                  className="mb-4 inputbox"
                  name="yearOfAuditedFinancial"
                  value={values.yearOfAuditedFinancial}
                  onChange={handleChange("yearOfAuditedFinancial")}
                />
                {errors.yearOfAuditedFinancial ? (
                  <p className="text text-danger small">
                    {errors.yearOfAuditedFinancial}
                  </p>
                ) : (
                  ""
                )}
                <label htmlFor="netWorth">NetWorth</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="netWorth"
                  value={values.netWorth}
                  onChange={handleChange("netWorth")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="Revenue">Revenue</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="Revenue"
                  value={values.Revenue}
                  onChange={handleChange("Revenue")}
                />
                <label htmlFor="currentAssets">Current assets</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="currentAssets"
                  value={values.currentAssets}
                  onChange={handleChange("currentAssets")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="Profit">Profit</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="Profit"
                  value={values.Profit}
                  onChange={handleChange("Profit")}
                />
                <label htmlFor="directorDetails">Director Detail</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="directorDetails"
                  value={values.directorDetails}
                  onChange={handleChange("directorDetails")}
                />
              </div>
            </div>
          </div>
          <div className="container mt-5">
            <span className="financial_title">Upload Files</span>
            <br />
            <span className="financial_subtitle">
              Upload your files here for verification.
            </span>
            <div className="row p-5" style={{ backgroundColor: "#fff" }}>
              <div className="col-sm-6 col-xs-12 my-auto">
                Financial Data
                {EditfinancialDetail ? (
                  <div>
                    {editfileFD != "" ? (
                      <div>
                        <span>File name:{editfileFD}</span>
                      </div>
                    ) : (
                      <div>
                        <FileUploader
                          className="financial_fileupload"
                          handleChange={onFileChangeFD}
                          required
                          type="file"
                          name="fileFD"
                          fileOrFiles={deleteUploadedFile}
                        />
                        <span>
                          {fileFD
                            ? `File name: ${fileFD.name}`
                            : "No File Chosen"}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <FileUploader
                      className="financial_fileupload"
                      handleChange={onFileChangeFD}
                      required
                      type="file"
                      name="fileFD"
                      fileOrFiles={deleteUploadedFile}
                    />
                    <span>
                      {fileFD ? `File name: ${fileFD.name}` : "No File Chosen"}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-sm-4 col-xs-12 my-auto">
                {EditfinancialDetail && editfileFD != "" ? (
                  <button
                    type="button"
                    onClick={deleteFile1}
                    className="btn  m-2 uploadFile"
                    style={{ fontSize: "12px" }}
                  >
                    Delete files
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn  m-2 uploadFile"
                    style={{ fontSize: "12px" }}
                  >
                    Upload files
                  </button>
                )}
              </div>
              <div className="col-sm-2 col-xs-12"></div>
            </div>
            <div className="row p-5" style={{ backgroundColor: "#fff" }}>
              <div className="col-sm-6 col-xs-12 my-auto">
                Financial Data 2
                {EditfinancialDetail ? (
                  <div>
                    {editfileFD2 != "" ? (
                      <div>
                        <span>File name:{editfileFD2}</span>
                      </div>
                    ) : (
                      <div>
                        <FileUploader
                          className="financial_fileupload"
                          handleChange={onFileChangeFD2}
                          required
                          type="file"
                          name="fileFD2"
                          fileOrFiles={deleteUploadedFile2}
                        />
                        <span>
                          {fileFD2
                            ? `File name: ${fileFD2.name}`
                            : "No File Chosen"}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <FileUploader
                      className="financial_fileupload"
                      handleChange={onFileChangeFD2}
                      required
                      type="file"
                      name="fileFD2"
                      fileOrFiles={deleteUploadedFile2}
                    />
                    <span>
                      {fileFD2
                        ? `File name: ${fileFD2.name}`
                        : "No File Chosen"}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-sm-4 col-xs-12 my-auto">
                {EditfinancialDetail && editfileFD2 != "" ? (
                  <button
                    type="button"
                    onClick={deleteFile2}
                    className="btn  m-2 uploadFile"
                    style={{ fontSize: "12px" }}
                  >
                    Delete files
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn  m-2 uploadFile"
                    style={{ fontSize: "12px" }}
                  >
                    Upload files
                  </button>
                )}{" "}
              </div>
              <div className="col-sm-2 col-xs-12"></div>
            </div>
            <div className="float-end">
              <button
                type="button"
                onClick={cancel}
                className="btn financialbtn btn-md m-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={saveFinancialDetail}
                className="btn financialbtn btn-md m-3"
              >
                Save
              </button>
              <button
                type="button"
                onClick={next}
                className="btn financialbtn btn-md m-3"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default FinancialDetails;
