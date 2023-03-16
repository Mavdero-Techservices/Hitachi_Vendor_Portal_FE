import "../css/StatutoryDetails.css";
import pdf from "../pdf/Declaration of GST Non Enrollment Format.pdf";
import Navbar1 from "../common/navbar.js";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import apiService from "../services/api.service";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation } from "react-router-dom";
const GSTValidation = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
const PANValidation = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
export default function Statutory(props) {
  const location = useLocation();
  const [HideImport, setHideImport] = useState(true);
  const [url, seturl] = useState();
  const [fileDisclosure, setfileDisclosure] = useState();
  const [showLoginTab, setshowLoginTab] = useState(true);
  const [editTab, seteditTab] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [hideMSMEunRegisteredField, sethideMSMEunRegisteredField] =
    useState(true);
  const [hideunRegisteredField, sethideunRegisteredField] = useState(true);
  const [GST_type, setGST_type] = useState("Registered");
  const [MSME, setMSME] = useState("Micro");
  const [MSME_status, setMSME_status] = useState("Registered");
  const [GST_Doc, setFile] = useState();
  const [PAN_Doc, setPAN_Doc] = useState();
  const [PE_Declaration_Doc, setPE_Declaration_Doc] = useState();
  const [EditPE_Declaration_Doc, setEditPE_Declaration_Doc] = useState();
  const [form_10f_Doc, setform_10f_Doc] = useState();
  const [Editform_10f_Doc, setEditform_10f_Doc] = useState();
  const [TAN_Doc, setTAN_Doc] = useState();
  const [MSME_Doc, setMSME_Doc] = useState();
  const [Tax_residency_Doc, setTax_residency_Doc] = useState();
  const [editTax_residency_Doc, seteditTax_residency_Doc] = useState();
  const [submit, setSubmit] = useState(null);
  const params = useParams();
  const [fileRPD, setfileRPD] = useState();
  const [country, setcountry] = useState({});
  const [style, setStyle] = useState("editable");
  const [deleteform_10fUploadedFile, setdeleteform_10fUploadedFile] =
    useState(false);
  const [
    deletePE_DeclarationUploadedFile,
    setdeletePE_DeclarationUploadedFile,
  ] = useState(false);
  const [deleteTax_residencyUploadedFile, setdeleteTax_residencyUploadedFile] =
    useState(false);
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    GST_type: "",
    GST_No: "",
    GST_Doc: "",
    PAN_No: "",
    PAN_Doc: "",
    TAN_Doc: "",
    PE_DeclarationNo: "",
    MSME_Doc: "",
    CIN_No: "",
    form_10f: "",
    MSME_status: "",
    MSME_No: "",
    MSME_Type: "",
    TAN_No: "",
    Tax_residency_No: "",
  });
  function onChangeValue(event) {
    setGST_type(event.target.value);
    if (event.target.value === "UnRegistered") {
      sethideunRegisteredField(false);
    } else {
      sethideunRegisteredField(true);
    }
    if (event.target.value === "Import") {
      setHideImport(false);
    } else {
      setHideImport(true);
    }
  }
  function onFileDisclosurechange(e) {
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    } else {
      setfileDisclosure(e);
    }
  }
  function onChangeValueMSME(event) {
    setMSME(event.target.value);
  }
  function onChangeValueMSME_status(event) {
    setMSME_status(event.target.value);
    if (event.target.value === "UnRegistered") {
      sethideMSMEunRegisteredField(false);
    } else {
      sethideMSMEunRegisteredField(true);
    }
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setErrors(event);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
    setSubmit(true);
  };
  const onFileChange = (event) => {
    event.preventDefault();
    if (event.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    } else {
      setFile(event.target.files[0]);
      setValues({
        GST_Doc:event.target.files[0]
      });
    }
  };

  function onFileChangeTax_residency_Doc(e) {
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    } else {
      setTax_residency_Doc(e);
      setdeleteTax_residencyUploadedFile(true);
    }
  }
  function onFileChangeform_10f_Doc(e) {
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    } else {
      setform_10f_Doc(e);
      setdeleteform_10fUploadedFile(true);
    }
  }
  function onFileChangePAN_Doc(e) {
    if (e.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    } else {
      setPAN_Doc(e.target.files[0]);
      setValues({
        PAN_Doc:e.target.files[0]
      })
    }
  }
  function onFileChangePE_Declaration_Doc(e) {
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    } else {
      setPE_Declaration_Doc(e);
      setdeletePE_DeclarationUploadedFile(true);
    }
  }
  function onFileChangeTAN_Doc(e) {
    if (e.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    } else {
      setTAN_Doc(e.target.files[0]);
      setValues({
        TAN_Doc:e.target.files[0]
      })
    }
  }
  function onFileChangeMSME_Doc(e) {
    if (e.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    } else {
      setMSME_Doc(e.target.files[0]);
      setValues({
        MSME_Doc:e.target.files[0]
      })
    }
  }
  function next(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("GST_Doc", GST_Doc);
    data.append("GST_type", GST_type);
    data.append("GST_No", values.GST_No);
    data.append("PAN_No", values.PAN_No);
    data.append("PAN_Doc", PAN_Doc);
    data.append("form_10f_Doc", form_10f_Doc);
    data.append("TAN_Doc", TAN_Doc);
    data.append("PE_DeclarationNo", values.PE_DeclarationNo);
    data.append("PE_Declaration_Doc", PE_Declaration_Doc);
    data.append("MSME_Doc", MSME_Doc);
    data.append("Tax_residency_Doc", Tax_residency_Doc);
    data.append("CIN_No", values.CIN_No);
    data.append("form_10f", values.form_10f);
    data.append("MSME_status", MSME_status);
    data.append("MSME_No", values.MSME_No);
    data.append("MSME_Type", MSME);
    data.append("TAN_No", values.TAN_No);
    data.append(
      "userId",
      JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
    );
    data.append("Tax_residency_No", values.Tax_residency_No);
    data.append("fileDisclosure", fileDisclosure);
    if (params.userId) {
      apiService.updateStatutoryDetail(params.userId, data).then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((res) => {
            if (res.isConfirmed) {
              navigate(`/ComplianceDetail/${params.userId}`);
            }
          })
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      });
    } else {
      apiService.saveStatutoryDetail(data).then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((res) => {
            if (res.isConfirmed) {
              navigate("/ComplianceDetail");
            }
          })
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      });
    }
  }
  
  const validateForm = () => {
    const { GST_No, PAN_No } = values;

    const newErrors = {};

    if (!GSTValidation.test(GST_No)) {
      newErrors.GST_No = "Please enter a valid GST No";
    }
    if (!PANValidation.test(PAN_No)) {
      newErrors.PAN_No = "Please enter a valid PAN No";
    }
    return newErrors;
  };

  function DeleteForm10FDoc(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to Delete?",
      icon: "success",
      confirmButtonText: "OK",
      showCloseButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((ClearData) => {
      setform_10f_Doc("");
      setdeleteform_10fUploadedFile(false);
      setEditform_10f_Doc("");
    });
  }
  function DeletePEDeclaration(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "OK",
      showCloseButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((ClearData) => {
      setPE_Declaration_Doc("");
      setdeletePE_DeclarationUploadedFile(false);
      setEditPE_Declaration_Doc("");
    });
  }
  function DeleteTax_residency(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "OK",
      showCloseButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((ClearData) => {
      setTax_residency_Doc("");
      setdeleteTax_residencyUploadedFile(false);
      seteditTax_residency_Doc("");
    });
  }
  function cancel(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "Yes",
      showCloseButton: true,
      cancelButtonText: "No",
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        setValues({
          GST_No: "",
          GST_type: "",
          MSME_No: "",
          MSME_Type: "",
          MSME_status: "",
          PAN_No: "",
          CIN_No: "",
          TAN_No: "",
          Tax_residency_No: "",
        });
        setFile(" ");
        setPAN_Doc(" ");
        setPE_Declaration_Doc(" ");
        setMSME_Doc(" ");
        setTax_residency_Doc(" ");
        setdeleteTax_residencyUploadedFile(false);
        setdeletePE_DeclarationUploadedFile(false);
        seteditTax_residency_Doc(" ");
        setform_10f_Doc("");
        setdeleteform_10fUploadedFile(false);
        setEditform_10f_Doc("");
        setEditPE_Declaration_Doc(" ");
      }
    });
  }
  useEffect(() => {  
    if (params.userId) {
      let finalstatus = ""
      apiService.signupFindByUserId(params.userId).then((res) => {
        finalstatus = res.data.result.finalStatus
      })
      apiService.getAllCollection(params.userId).then((res) => {
        if (res.data.basicInfo[0].submitStatus === "Submitted" && finalstatus !== 'Approved') {
          setStyle('notEditable');
        }
        Object.entries(res.data.Statutory).map(([key, value]) => {
          var form_10fUrl = res.data.Statutory[0].form_10f_Doc;
          var replaceform10fValue = form_10fUrl.replace("uploads/", "");
          var PE_Declaration_DocUrl = res.data.Statutory[0].PE_Declaration_Doc;
          var replacePE_Declaration_DocValue = PE_Declaration_DocUrl.replace(
            "uploads/",
            ""
          );
          var Tax_residency_DocUrl = res.data.Statutory[0].Tax_residency_Doc;
          var replaceTax_residency_DocValue = Tax_residency_DocUrl.replace(
            "uploads/",
            ""
          );
          setValues({
            GST_No: value.GST_No,
            GST_type: value.GST_type,
            MSME_No: value.MSME_No,
            MSME_Type: value.MSME_Type,
            MSME_status: value.MSME_status,
            PAN_No: value.PAN_No,
            CIN_No: value.CIN_No,
            TAN_No: value.TAN_No,
            Tax_residency_No: value.Tax_residency_No,
            GST_Doc: value.GST_Doc,
            PAN_Doc: value.PAN_Doc,
            TAN_Doc: value.TAN_Doc,
            MSME_Doc: value.MSME_Doc,
            Tax_residency_Doc: value.Tax_residency_Doc,
          });

          setform_10f_Doc(value.form_10f_Doc);

          setFile(value.GST_Doc);
          setPAN_Doc(value.PAN_Doc);
          setTAN_Doc(value.TAN_Doc);
          setPE_Declaration_Doc(value.PE_Declaration_Doc);
          setMSME_Doc(value.MSME_Doc);
          setTax_residency_Doc(value.Tax_residency_Doc);
          seteditTax_residency_Doc(replaceTax_residency_DocValue);
          setEditform_10f_Doc(replaceform10fValue);
          setEditPE_Declaration_Doc(replacePE_Declaration_DocValue);
        });
      });
    }
    apiService.getvendorDetail(values.userId).then((res) => {
      setcountry(res.data.country);
      if (res.data.country === "IN") {
        setshowLoginTab(false);
      }
    });
    seturl(pdf);
  }, []);
  const saveStatutoryDetail = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("GST_Doc", GST_Doc);
    data.append("GST_type", GST_type);
    data.append("GST_No", values.GST_No);
    data.append("PAN_No", values.PAN_No);
    data.append("PAN_Doc", PAN_Doc);
    data.append("form_10f_Doc", form_10f_Doc);
    data.append("TAN_Doc", TAN_Doc);
    data.append("PE_DeclarationNo", values.PE_DeclarationNo);
    data.append("PE_Declaration_Doc", PE_Declaration_Doc);
    data.append("MSME_Doc", MSME_Doc);
    data.append("Tax_residency_Doc", Tax_residency_Doc);
    data.append("CIN_No", values.CIN_No);
    data.append("form_10f", values.form_10f);
    data.append("MSME_status", MSME_status);
    data.append("MSME_No", values.MSME_No);
    data.append("MSME_Type", MSME);
    data.append("TAN_No", values.TAN_No);
    data.append(
      "userId",
      JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
    );
    data.append("Tax_residency_No", values.Tax_residency_No);
    data.append("fileDisclosure", fileDisclosure);
    if (params.userId) {
      apiService.updateStatutoryDetail(params.userId, data).then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      });
    } else {
      apiService.saveStatutoryDetail(data).then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      });
    }
  };

  const deleteFile = (event) => {
    if ((event === 'GST_Doc' && GST_Doc) || (event === 'PAN_Doc' && PAN_Doc) || 
        (event === 'MSME_Doc' && MSME_Doc) || (event === 'TAN_Doc' && TAN_Doc))
      {
        let title = event;
        Swal.fire({
          heightAuto: true,
          title: 'Delete Existing File',
          html: `<div class="rejectstyle">
            <div> <lablel> ${title}</label>
        
          </div>
            `,
          confirmButtonText: 'Delete',
          confirmButtonColor: '#B1000E',
          showCancelButton: true,
          focusConfirm: false,
          customClass: 'swal-wide',

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
              },
            }).then((result) => {
              if (result.isConfirmed) {
                if (event === 'GST_Doc') {
                  setFile("");
                  setValues({
                    GST_Doc:""
                  });
                } else if (event === 'PAN_Doc') {
                  setPAN_Doc("");
                  setValues({
                    PAN_Doc:""
                  });
                }else if (event === 'MSME_Doc') {
                  setMSME_Doc("");
                  setValues({
                    MSME_Doc:""
                  });
                }else if (event === 'TAN_Doc') {
                  setTAN_Doc("");
                  setValues({
                    TAN_Doc:""
                  });
                }
                Swal.fire('Deleted!', '', 'success');
              } else if (result.isDenied) {
                Swal.fire('File not deleted', '', 'info');
              }
            });
          },
        });
    }else{
      Swal.fire('File not deleted', '', 'info');
    }
  }

  return (
    <div>
      <Navbar1 />
      <Container fluid="md" className={style}>
        <Row>
          <Col>
            <h2 className="statutory-details-name">Statutory Details</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Form>
                      <Row>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Vendor GST Type*</Form.Label>
                          <Row>
                            <Col sm={4}>
                              <input
                                onChange={onChangeValue}
                                type="radio"
                                value="Registered"
                                name="GST_type"
                                checked={GST_type === "Registered"}
                              />{" "}
                              Registered
                            </Col>
                            <Col sm={4}>
                              <input
                                onChange={onChangeValue}
                                type="radio"
                                value="UnRegistered"
                                name="GST_type"
                                checked={GST_type === "UnRegistered"}
                              />{" "}
                              UnRegistered
                            </Col>
                            <Col sm={4}>
                              <input
                                onChange={onChangeValue}
                                type="radio"
                                value="Import"
                                name="GST_type"
                                checked={GST_type === "Import"}
                              />{" "}
                              Import
                            </Col>
                          </Row>
                        </Form.Group>

                        {HideImport && hideunRegisteredField ? (
                          <Row>
                            <Col>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>GST no*</Form.Label>
                                <Form.Control
                                  className="statutoryInput"
                                  type="text"
                                  value={values.GST_No}
                                  onChange={handleChange("GST_No")}
                                />
                                {errors.GST_No ? (
                                  <p className="text text-danger small">
                                    {errors.GST_No}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </Form.Group>
                            </Col>
                            <Col>
                            {/* {values.GST_Doc!='' ? (
                                <div className="frame-input">
                                <label htmlFor="fileupload">GST Uploaded</label>
                                <input
                                  type="file"
                                  id="fileupload"
                                  value={values.GST_Doc}
                                  onChange={onFileChange}
                                  required
                                  disabled={style==='notEditable'? true:false}
                                />
                                
                                </div>
                            ):(
                              <div className="frame-input">
                              <label htmlFor="fileupload">Upload GST</label>
                              <input
                                type="file"
                                id="fileupload"
                                value={values.GST_Doc}
                                onChange={onFileChange}
                                required
                              />
                            </div>
                            )} */}

                            {(((GST_Doc !=='') && (GST_Doc !=='null') && (GST_Doc !== undefined))) ? (
                              <div className="frame-input">
                                <button type="button" className="deleteFile" onClick={()=>{deleteFile('GST_Doc')}}>Delete GST</button>
                              </div>
                            ):(
                              <div className="frame-input">
                              <label htmlFor="fileupload">Upload GST</label>
                              <input
                                type="file"
                                id="fileupload"
                                value={values.GST_Doc}
                                onChange={onFileChange}
                                required
                                disabled={style === 'notEditable' ? true : false}
                              />
                            </div>
                            )}
                             
                            </Col>
                          </Row>
                        ) : (
                          <Row>
                            <Col>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>GST no*</Form.Label>
                                <Form.Control
                                  className="statutoryInput"
                                  type="text"
                                  value="N/A"
                                  onChange={handleChange("GST_No")}
                                  disabled="true"
                                />
                                {errors.GST_No ? (
                                  <p className="text text-danger small">
                                    {errors.GST_No}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </Form.Group>
                            </Col>
                            <Col>
                              {!HideImport && hideunRegisteredField ? (
                                <Row></Row>
                              ) : (
                                <Row>
                                  {/* <div className="frame-input">
                                    <label htmlFor="fileupload">
                                      Upload UnRegister Gst
                                    </label>
                                    <input
                                      type="file"
                                      id="fileupload"
                                      handleChange={onFileDisclosurechange}
                                      name="fileDisclosure"
                                      required
                                    />
                                  </div>{" "} */}

                                {(((GST_Doc !=='') && (GST_Doc !=='null') && (GST_Doc !== undefined))) ? (
                                  <div className="frame-input">
                                    <button type="button" className="deleteFile" onClick={()=>{deleteFile('GST_Doc')}}>Delete UnRegister Gst</button>
                                  </div>
                                  ):(
                                    <div className="frame-input">
                                    <label htmlFor="fileupload">
                                      Upload UnRegister Gst
                                    </label>
                                    <input
                                      type="file"
                                      id="fileupload"
                                      handleChange={onFileDisclosurechange}
                                      name="fileDisclosure"
                                      required
                                    />
                                  </div>
                                  )}

                                </Row>
                              )}
                            </Col>
                          </Row>
                        )}
                        {/* {hideunRegisteredField ?
                          <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>GST no*</Form.Label>
                              <Form.Control className="statutoryInput" type="text" value={values.GST_No} onChange={handleChange('GST_No')} />
                              {errors.GST_No ? <p className="text text-danger small">{errors.GST_No}</p> : ""}
                            </Form.Group>
                          </Col>
                          : null}
                        {hideunRegisteredField ?
                          <Col>
                            <div className="frame-input">
                              <label for="fileupload">Upload GST</label>
                              <input type="file" id="fileupload" value={values.GST_Doc} onChange={onFileChange} required />
                            </div>
                          </Col>
                          : null} */}
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>PAN no*</Form.Label>
                            <Form.Control
                              className="statutoryInput"
                              type="text"
                              value={values.PAN_No}
                              onChange={handleChange("PAN_No")}
                            />
                            {errors.PAN_No ? (
                              <p className="text text-danger small">
                                {errors.PAN_No}
                              </p>
                            ) : (
                              ""
                            )}
                          </Form.Group>
                        </Col>
                        <Col>
                        {/* {values.PAN_Doc!='' ? (
                          <div className="frame-input">
                          <label htmlFor="fileuploadPan">PAN Uploaded</label>
                          <input
                            type="file"
                            id="fileuploadPan"
                            value={values.PAN_Doc}
                            onChange={onFileChangePAN_Doc}
                            required
                            disabled={style==='notEditable'? true:false}
                          />
                        </div>
                        ):(
                          <div className="frame-input">
                          <label htmlFor="fileuploadPan">Upload PAN</label>
                          <input
                            type="file"
                            id="fileuploadPan"
                            value={values.PAN_Doc}
                            onChange={onFileChangePAN_Doc}
                            required
                          />
                        </div>
                        )} */}

                        {(((PAN_Doc !=='') && (PAN_Doc !=='null') && (PAN_Doc !== undefined))) ? (
                          <div className="frame-input">
                            <button type="button" className="deleteFile" onClick={()=>{deleteFile('PAN_Doc')}}>Delete PAN</button>
                          </div>
                        ):(
                          <div className="frame-input">
                          <label htmlFor="fileuploadPan">Upload PAN</label>
                          <input
                            type="file"
                            id="fileuploadPan"
                            value={values.PAN_Doc}
                            onChange={onFileChangePAN_Doc}
                            required
                          />
                        </div>
                        )}

                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>CIN no*</Form.Label>
                            <Form.Control
                              className="statutoryInput"
                              type="text"
                              value={values.CIN_No}
                              onChange={handleChange("CIN_No")}
                            />
                          </Form.Group>
                        </Col>
                        <Col></Col>
                      </Row>
                      {/* {!hideunRegisteredField ?
                        <Row>
                          <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Declaration Form for Non-Registered in GST*</Form.Label>
                              <FileUploader className="financial_fileupload"
                                required
                                type="file"
                                handleChange={onFileDisclosurechange}
                                name="fileDisclosure"
                              />
                              <span>{fileDisclosure ? `File name: ${fileDisclosure.name}` : "No File Chosen"}</span>
                            </Form.Group>
                          </Col>
                          <Col sm={2}>
                            <a href={url} download>
                              <Button className="DownloadDisclosure">Download</Button>
                            </a>
                          </Col>
                        </Row>
                        : null} */}
                      <Row>
                        <Col>
                          {showLoginTab ? (
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Form 10F*</Form.Label>
                              <br />
                              {params.userId ? (
                                <div>
                                  {Editform_10f_Doc != "" ||
                                  undefined ||
                                  null ? (
                                    <div>
                                      <span>File name:{Editform_10f_Doc}</span>
                                     
                                        <ClearIcon style={{ color: 'red' }} onClick={DeleteForm10FDoc} />
                                    
                                    </div>
                                  ) : (
                                    <div>
                                      <FileUploader
                                        className="financial_fileupload"
                                        handleChange={onFileChangeform_10f_Doc}
                                        required
                                        type="file"
                                        name="fileFD"
                                        fileOrFiles={deleteform_10fUploadedFile}
                                      />
                                      <span>
                                        {form_10f_Doc
                                          ? `File name: ${form_10f_Doc.name}`
                                          : "No File Chosen"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div>
                                  <FileUploader
                                    className="financial_fileupload"
                                    handleChange={onFileChangeform_10f_Doc}
                                    required
                                    type="file"
                                    name="fileFD"
                                    fileOrFiles={deleteform_10fUploadedFile}
                                  />
                                  <span>
                                    {form_10f_Doc
                                      ? `File name: ${form_10f_Doc.name}`
                                      : "No File Chosen"}
                                  </span>
                                </div>
                              )}
                            </Form.Group>
                          ) : null}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {showLoginTab ? (
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>No PE declaration*</Form.Label>
                              {(params.userId &&
                                EditPE_Declaration_Doc != "") ||
                              undefined ||
                              null ? (
                                <div>
                                  <span>
                                    File name:{EditPE_Declaration_Doc}
                                  </span>
                                  <ClearIcon style={{ color: 'red' }} onClick={DeletePEDeclaration} />
                                </div>
                              ) : (
                                <div>
                                  <FileUploader
                                    className="financial_fileupload"
                                    handleChange={
                                      onFileChangePE_Declaration_Doc
                                    }
                                    required
                                    type="file"
                                    name="fileFD"
                                    fileOrFiles={
                                      deletePE_DeclarationUploadedFile
                                    }
                                  />
                                  <span>
                                    {PE_Declaration_Doc
                                      ? `File name: ${PE_Declaration_Doc.name}`
                                      : "No File Chosen"}
                                  </span>
                                </div>
                              )}
                            </Form.Group>
                          ) : null}
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col>
                    <Form>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>MSME status*</Form.Label>
                            <Row>
                              <Col sm={4}>
                                {" "}
                                <input
                                  onChange={onChangeValueMSME_status}
                                  type="radio"
                                  value="Registered"
                                  name="Registered"
                                  checked={MSME_status === "Registered"}
                                />{" "}
                                Registered
                              </Col>
                              <Col sm={4}>
                                <input
                                  onChange={onChangeValueMSME_status}
                                  type="radio"
                                  value="UnRegistered"
                                  name="UnRegistered"
                                  checked={MSME_status === "UnRegistered"}
                                />{" "}
                                UnRegistered
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
                      {hideMSMEunRegisteredField ? (
                        <Row>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>MSME no*</Form.Label>
                              <Form.Control
                                className="statutoryInput"
                                type="text"
                                value={values.MSME_No}
                                onChange={handleChange("MSME_No")}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                          {/* {values.MSME_Doc!='' ? (
                             <div className="frame-input">
                             <label htmlFor="fileuploadMSME">
                               Upload MSME
                             </label>
                             <input
                               type="file"
                               id="fileuploadMSME"
                               value={values.MSME_Doc}
                               onChange={onFileChangeMSME_Doc}
                               required
                               disabled={style==='notEditable'? true:false}
                             />
                           </div>
                          ):(
                            <div className="frame-input">
                            <label htmlFor="fileuploadMSME">
                               MSME Uploaded
                            </label>
                            <input
                              type="file"
                              id="fileuploadMSME"
                              value={values.MSME_Doc}
                              onChange={onFileChangeMSME_Doc}
                              required
                            />
                          </div>
                          )} */}

                        {(((MSME_Doc !=='') && (MSME_Doc !=='null') && (MSME_Doc !== undefined))) ? (
                              <div className="frame-input">
                                <button type="button" className="deleteFile" onClick={()=>{deleteFile('MSME_Doc')}}>Delete MSME</button>
                              </div>
                          ):(
                            <div className="frame-input">
                            <label htmlFor="fileuploadMSME">
                            Upload MSME
                            </label>
                            <input
                              type="file"
                              id="fileuploadMSME"
                              value={values.MSME_Doc}
                              onChange={onFileChangeMSME_Doc}
                              required
                              disabled={style === 'notEditable' ? true : false}
                            />
                          </div>
                          )}
                           
                          </Col>
                        </Row>
                      ) : (
                        <Row>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>MSME no*</Form.Label>
                              <Form.Control
                                className="statutoryInput"
                                type="text"
                                value="N/A"
                                disabled="true"
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                          {(((MSME_Doc !=='') && (MSME_Doc !=='null') && (MSME_Doc !== undefined))) ? (
                              <div className="frame-input">
                                <button type="button" className="deleteFile" onClick={()=>{deleteFile('MSME_Doc')}}>Delete MSME</button>
                              </div>
                          ):(
                            <div className="frame-input">
                              <label htmlFor="fileuploadMSME">
                                Upload MSME
                              </label>
                              <input
                                type="file"
                                id="fileuploadMSME"
                                value={values.MSME_Doc}
                                onChange={onFileChangeMSME_Doc}
                                disabled="true"
                              />
                            </div>
                          )}
                          </Col>
                        </Row>
                      )}

                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>MSME type*</Form.Label>
                            <Row>
                              <Col sm={4}>
                                <input
                                  onChange={onChangeValueMSME}
                                  type="radio"
                                  value="Micro"
                                  name="Micro"
                                  checked={MSME === "Micro"}
                                  disabled={MSME_status === "UnRegistered" ? true : false}
                                />{" "}
                                Micro1
                              </Col>
                              <Col sm={4}>
                                <input
                                  onChange={onChangeValueMSME}
                                  type="radio"
                                  value="Small"
                                  name="Small"
                                  checked={MSME === "Small"}
                                  disabled={MSME_status === "UnRegistered" ? true : false}
                                />{" "}
                                Small
                              </Col>
                              <Col sm={4}>
                                <input
                                  onChange={onChangeValueMSME}
                                  type="radio"
                                  value="Macro"
                                  name="Macro"
                                  checked={MSME === "Macro"}
                                  disabled={MSME_status === "UnRegistered" ? true : false}
                                />{" "}
                                Medium
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>TAN no*</Form.Label>
                            <Form.Control
                              className="statutoryInput"
                              type="text"
                              value={values.TAN_No}
                              onChange={handleChange("TAN_No")}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          {/* <div className="frame-input">
                            <label htmlFor="fileuploadTAN">Upload TAN</label>
                            <input
                              type="file"
                              id="fileuploadTAN"
                              value={values.TAN_Doc}
                              onChange={onFileChangeTAN_Doc}
                              required
                              disabled={style==='notEditable'? true:false}
                            />
                          </div> */}

                            {(((TAN_Doc !=='') && (TAN_Doc !=='null') && (TAN_Doc !== undefined))) ? (
                              <div className="frame-input">
                                <button type="button" className="deleteFile" onClick={()=>{deleteFile('TAN_Doc')}}>Delete TAN</button>
                              </div>
                        ):(
                          <div className="frame-input">
                            <label htmlFor="fileuploadTAN">Upload TAN</label>
                            <input
                              type="file"
                              id="fileuploadTAN"
                              value={values.TAN_Doc}
                              onChange={onFileChangeTAN_Doc}
                              required
                            />
                          </div>
                        )}
                        </Col>
                      </Row>
                      {showLoginTab ? (
                        <Row>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>
                                Tax Residency Certificate*
                              </Form.Label>
                              {params.userId ? (
                                <div>
                                  {editTax_residency_Doc != "" ||
                                  undefined ||
                                  null ? (
                                    <div>
                                      <span>File name:{Tax_residency_Doc}</span>
                                      <ClearIcon style={{ color: 'red' }} onClick={DeleteTax_residency} />
                                    </div>
                                  ) : (
                                    <div>
                                      <FileUploader
                                        className="financial_fileupload"
                                        handleChange={
                                          onFileChangeTax_residency_Doc
                                        }
                                        required
                                        type="file"
                                        name="fileFD"
                                        fileOrFiles={
                                          deleteTax_residencyUploadedFile
                                        }
                                      />
                                      <span>
                                        {Tax_residency_Doc
                                          ? `File name: ${Tax_residency_Doc.name}`
                                          : "No File Chosen"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div>
                                  <FileUploader
                                    className="financial_fileupload"
                                    handleChange={onFileChangeTax_residency_Doc}
                                    required
                                    type="file"
                                    name="fileFD"
                                    fileOrFiles={
                                      deleteTax_residencyUploadedFile
                                    }
                                  />
                                  <span>
                                    {Tax_residency_Doc
                                      ? `File name: ${Tax_residency_Doc.name}`
                                      : "No File Chosen"}
                                  </span>
                                </div>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                      ) : null}
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {!hideunRegisteredField ? (
          <Row>
            <Col>
              <a href={url} download>
                <Button className="DownloadDisclosure">
                  Download Declaration under non-registered GST
                </Button>
              </a>
            </Col>
          </Row>
        ) : null}
        <br />
        <Row>
          <Col>
            <p className="statutory-Note">
              NOTE: If the vendor is not registered with the above compliance,
              they can mention it as “Non-Registered” in that column and they
              will upload the discloser for the same on the document upload
              option.
            </p>
          </Col>
        </Row>
        <Row className="sbtn">
          <div className="float-end mt-2">
            <button
              type="button"
              onClick={cancel}
              className="btn statutorybtn btn-md m-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveStatutoryDetail}
              className="btn statutorybtn btn-md m-1"
            >
              Save
            </button>
            <button
              type="button"
              onClick={next}
              className="btn statutorybtn btn-md m-1"
            >
              Next
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
}
