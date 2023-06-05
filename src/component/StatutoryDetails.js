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
import InfoIcon from "@mui/icons-material/Info";
import InputGroup from "react-bootstrap/InputGroup";
import Tooltip from "@material-ui/core/Tooltip";
const GSTValidation = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
const PANValidation = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const gstNo = `Goods and Service Tax`;
const panNo = `Permanent Account Number (PAN)`;
const cinNo = `Corporate Identification Number`;
const msmeNo = `Ministry of Micro, small & Medium Enterprises`;
const tanNo = `Tax Deduction Account Number`;

export default function Statutory(props) {
  const location = useLocation();
  const [countryName, setCountryName] = useState(null);
  const [HideImport, setHideImport] = useState(true);
  const [url, seturl] = useState();
  const [redirectUrl, setredirectUrl] = useState();
  const [fileDisclosure, setfileDisclosure] = useState();
  const [showLoginTab, setshowLoginTab] = useState(true);
  const [editTab, seteditTab] = useState(true);
  const [statRes, setstatRes] = useState(0);
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
    PAN_No: "",
    PE_DeclarationNo: "",
    CIN_No: "",
    form_10f: "",
    // MSME_status: "",
    MSME_No: "",
    MSME_Type: "",
    TAN_No: "",
    Tax_residency_No: "",
  });
  const [isNewValueEntered, setIsNewValueEntered] = useState(false);
  function onChangeValue(event) {
    setIsNewValueEntered(true);
    setGST_type(event.target.value);
    if (event.target.value === "UnRegistered") {
      if (values.PAN_No === "N/A" && countryName === "IN") {
        setValues({ PAN_No: "" });
      }
      sethideunRegisteredField(false);
    } else {
      sethideunRegisteredField(true);
    }
    if (event.target.value === "Import") {
      setValues({ PAN_No: "N/A" });
      setHideImport(false);
    } else {
      setHideImport(true);
    }
    if (event.target.value === "Registered") {
      if (values.PAN_No === "N/A" && countryName === "IN") {
        setValues({ PAN_No: "" });
      }
    }
    if (event.target.value === "UnRegistered") {
      if (values.GST_Registration_No === "N/A") {
        setValues({ GST_Registration_No: "N/A" });
      }
    }
  }
  function onFileDisclosurechange(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    const selectedFile = e.target.files[0];

    if (e.target.files[0]?.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      e.target.value = "";
    } else {
      setfileDisclosure(e.target.files[0]);
    }
  }
  function onChangeValueMSME(event) {
    setIsNewValueEntered(true);
    setMSME(event.target.value);
  }
  function onChangeValueMSME_status(event) {
    setIsNewValueEntered(true);
    setMSME_status(event.target.value);
    if (event.target.value === "UnRegistered") {
      sethideMSMEunRegisteredField(false);
    } else {
      sethideMSMEunRegisteredField(true);
    }
  }
  const handleChange = (name) => (event) => {
    setIsNewValueEntered(true);
    event.preventDefault();

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
    setIsNewValueEntered(true);
    event.preventDefault();
    if (event.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      event.target.value = "";
    } else {
      setFile(event.target.files[0]);
      // setValues({
      //   GST_Doc: event.target.files[0],
      // });
    }
  };

  function onFileChangeTax_residency_Doc(e) {
    setIsNewValueEntered(true);
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } else {
      setTax_residency_Doc(e);
      setdeleteTax_residencyUploadedFile(true);
    }
  }
  function onFileChangeform_10f_Doc(e) {
    setIsNewValueEntered(true);
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } else {
      setform_10f_Doc(e);
      setdeleteform_10fUploadedFile(true);
    }
  }
  function onFileChangePAN_Doc(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    if (e.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      e.target.value = "";
    } else {
      setPAN_Doc(e.target.files[0]);
      // setValues({
      //   PAN_Doc: e.target.files[0],
      // });
    }
  }
  function onFileChangePE_Declaration_Doc(e) {
    setIsNewValueEntered(true);
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } else {
      setPE_Declaration_Doc(e);
      setdeletePE_DeclarationUploadedFile(true);
    }
  }
  function onFileChangeTAN_Doc(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    if (e.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      e.target.value = "";
    } else {
      setTAN_Doc(e.target.files[0]);
      // setValues({
      //   TAN_Doc: e.target.files[0],
      // });
    }
  }
  function onFileChangeMSME_Doc(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    if (e.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      e.target.value = "";
    } else {
      setMSME_Doc(e.target.files[0]);
      // setValues({
      //   MSME_Doc: e.target.files[0],
      // });
    }
  }
  function next(e) {
    if (isNewValueEntered) {
      Swal.fire({
        title: "Do you want to save?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCloseButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          saveStatutoryDetail(e, () => {
            if (redirectUrl.ComplianceDetail?.length <= 0 || "" || undefined) {
              navigate("/ComplianceDetail");
            } else {
              navigate(`/ComplianceDetail/${params.userId}`);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          if (redirectUrl.ComplianceDetail?.length <= 0 || "" || undefined) {
            navigate("/ComplianceDetail");
          } else {
            navigate(`/ComplianceDetail/${params.userId}`);
          }
        }
      });
    } else {
      if (redirectUrl.ComplianceDetail?.length <= 0 || "" || undefined) {
        navigate("/ComplianceDetail");
      } else {
        navigate(`/ComplianceDetail/${params.userId}`);
      }
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

  function DeleteForm10FDoc(event) {
    if (event === "form_10f_Doc" && form_10f_Doc) {
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
              if (event === "form_10f_Doc") {
                setform_10f_Doc("");
                setdeleteform_10fUploadedFile(false);
                setEditform_10f_Doc("");
              }
              Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("File not deleted", "", "info");
            }
          });
        },
      });
    } else {
      Swal.fire("File not deleted", "", "info");
    }
  }
  function DeletePEDeclaration(event) {
    if (event === "PE_Declaration_Doc" && PE_Declaration_Doc) {
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
              if (event === "PE_Declaration_Doc") {
                setPE_Declaration_Doc("");
                setdeletePE_DeclarationUploadedFile(false);
                setEditPE_Declaration_Doc("");
              }
              Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("File not deleted", "", "info");
            }
          });
        },
      });
    } else {
      Swal.fire("File not deleted", "", "info");
    }
  }

  function DeleteTax_residency(event) {
    if (event === "Tax_residency_Doc" && Tax_residency_Doc) {
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
              if (event === "Tax_residency_Doc") {
                setTax_residency_Doc("");
                setdeleteTax_residencyUploadedFile(false);
                seteditTax_residency_Doc("");
              }
              Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("File not deleted", "", "info");
            }
          });
        },
      });
    } else {
      Swal.fire("File not deleted", "", "info");
    }
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
      allowEscapeKey: false,
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
    (async () => {
      await apiService
        .getAllCollection(
          JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        )
        .then((res) => {
          setredirectUrl(res.data);
          let cName = res.data.basicInfo
            ? res.data.basicInfo[0]?.Country_Region_Code
            : "";
          if (cName !== "IN" && cName !== null && cName !== undefined) {
            setValues({ PAN_No: "N/A" });
          }
          setCountryName(
            res.data.basicInfo ? res.data.basicInfo[0]?.Country_Region_Code : ""
          );
        })
        .then((result) => {});

      let newuser = JSON.parse(
        window.sessionStorage.getItem("newregUser")
      )?.newregUser;
      let id = newuser
        ? newuser
        : params.userId
        ? params.userId
        : values.userId;
      await apiService.getvendorDetail(id).then((res) => {
        setcountry(res.data.country);
        if (res.data.country === "IN") {
          setshowLoginTab(false);
        }
      });
      if (params.userId) {
        let finalstatus = "";
        await apiService.signupFindByUserId(params.userId).then((res) => {
          finalstatus = res.data.result?.finalStatus;
        });
        await apiService.getAllCollection(params.userId).then((res) => {
          setredirectUrl(res.data);
          if (res.data.basicInfo[0]?.submitStatus === "Submitted") {
            setStyle("notEditable");
          }
          Object.entries(res.data.Statutory).map(([key, value]) => {
            var form_10fUrl = res.data.Statutory[0].form_10f_Doc;
            var replaceform10fValue = form_10fUrl.replace("uploads/", "");
            var PE_Declaration_DocUrl =
              res.data.Statutory[0].PE_Declaration_Doc;
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
              GST_No:
                value.GST_Registration_No === "undefined"
                  ? ""
                  : value.GST_Registration_No,
              // GST_type: value.GST_Vendor_Type,
              MSME_No:
                value.MSMED_Number === "undefined" ? "" : value.MSMED_Number,
              // MSME_Type: value.MSMED_Vendor_Type,
              // MSME_status: value.MSMED,
              PAN_No: value.P_A_N_No === "undefined" ? "" : value.P_A_N_No,
              CIN_No: value.CIN_No === "undefined" ? "" : value.CIN_No,
              TAN_No: value.TAN_No === "undefined" ? "" : value.TAN_No,
              Tax_residency_No:
                value.Tax_residency_No === "undefined"
                  ? ""
                  : value.Tax_residency_No,
              // GST_Doc: value.GST_Doc,
              // PAN_Doc: value.PAN_Doc,
              // TAN_Doc: value.TAN_Doc,
              // MSME_Doc: value.MSME_Doc,
              Tax_residency_Doc: value.Tax_residency_Doc,
            });

            setMSME(value.MSMED_Vendor_Type);
            setGST_type(value.GST_Vendor_Type);
            setMSME_status(value.MSMED);
            setform_10f_Doc(value.form_10f_Doc);
            setfileDisclosure(value.fileDisclosure);
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
      } else if (newuser) {
        let finalstatus = "";
        await apiService.signupFindByUserId(newuser).then((res) => {
          finalstatus = res.data.result?.finalStatus;
        });
        await apiService.getAllCollection(newuser).then((res) => {
          setredirectUrl(res.data);
          if (res.data.basicInfo[0]?.submitStatus === "Submitted") {
            setStyle("notEditable");
          }
          Object.entries(res.data.Statutory).map(([key, value]) => {
            var form_10fUrl = res.data.Statutory[0].form_10f_Doc;
            var replaceform10fValue = form_10fUrl.replace("uploads/", "");
            var PE_Declaration_DocUrl =
              res.data.Statutory[0].PE_Declaration_Doc;
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
              GST_No:
                value.GST_Registration_No === "undefined"
                  ? ""
                  : value.GST_Registration_No,
              // GST_type: value.GST_Vendor_Type,
              MSME_No:
                value.MSMED_Number === "undefined" ? "" : value.MSMED_Number,
              // MSME_Type: value.MSMED_Vendor_Type,
              // MSME_status: value.MSMED,
              PAN_No: value.P_A_N_No === "undefined" ? "" : value.P_A_N_No,
              CIN_No: value.CIN_No === "undefined" ? "" : value.CIN_No,
              TAN_No: value.TAN_No === "undefined" ? "" : value.TAN_No,
              Tax_residency_No:
                value.Tax_residency_No === "undefined"
                  ? ""
                  : value.Tax_residency_No,
              // GST_Doc: value.GST_Doc,
              // PAN_Doc: value.PAN_Doc,
              // TAN_Doc: value.TAN_Doc,
              // MSME_Doc: value.MSME_Doc,
              Tax_residency_Doc: value.Tax_residency_Doc,
            });
            setMSME(value.MSMED_Vendor_Type);
            setGST_type(value.GST_Vendor_Type);
            setMSME_status(value.MSMED);
            setform_10f_Doc(value.form_10f_Doc);
            setfileDisclosure(value.fileDisclosure);
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
    })();
    seturl(pdf);
  }, [statRes]);
  const saveStatutoryDetail = (e, callback) => {
    // e.preventDefault();
    setIsNewValueEntered(false);
    const data = new FormData();
    data.append("GST_Vendor_Type", GST_type);
    if (GST_type === "UnRegistered") {
      data.append("GST_Registration_No", "N/A");
    } else {
      data.append("GST_Registration_No", values.GST_No);
    }
    if (countryName !== "IN") {
      data.append("P_A_N_No", "N/A");
      data.append("PAN_Doc", "");
    } else {
      data.append("P_A_N_No", values.PAN_No);
      data.append("PAN_Doc", PAN_Doc);
    }
    if (GST_type === "Registered") {
      data.append("GST_Doc", GST_Doc);
      data.append("fileDisclosure", "");
    } else {
      data.append("GST_Doc", "");
      data.append("fileDisclosure", fileDisclosure);
    }
    data.append("form_10f_Doc", form_10f_Doc);
    data.append("TAN_Doc", TAN_Doc);
    data.append("PE_DeclarationNo", values.PE_DeclarationNo);
    data.append("PE_Declaration_Doc", PE_Declaration_Doc);
    data.append("MSME_Doc", MSME_Doc);
    data.append("Tax_residency_Doc", Tax_residency_Doc);
    data.append("CIN_No", values.CIN_No);
    data.append("form_10f", values.form_10f);
    data.append("MSMED", MSME_status);
    data.append("MSMED_Number", values.MSME_No);
    data.append("MSMED_Vendor_Type", MSME);
    data.append("TAN_No", values.TAN_No);
    data.append(
      "userId",
      JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
    );
    data.append("Tax_residency_No", values.Tax_residency_No);
    if (params.userId) {
      apiService.updateStatutoryDetail(params.userId, data).then((res) => {
        setstatRes(statRes + 1);
        if (res.data.status === "success") {
          Swal.fire({
            title: "Data Updated",
            icon: "success",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              callback();
            }
          });
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        }
      });
    } else {
      let newuser = JSON.parse(
        window.sessionStorage.getItem("newregUser")
      )?.newregUser;
      if (newuser) {
        const statdata = new FormData();
        statdata.append("GST_Vendor_Type", GST_type);
        statdata.append("GST_Registration_No", values.GST_No);
        if (GST_type === "UnRegistered") {
          statdata.append("GST_Registration_No", "N/A");
        } else {
          statdata.append("GST_Registration_No", values.GST_No);
        }
        if (countryName !== "IN") {
          statdata.append("P_A_N_No", values.PAN_No);
          statdata.append("PAN_Doc", PAN_Doc);
        } else {
          statdata.append("P_A_N_No", "N/A");
          statdata.append("PAN_Doc", "");
        }
        if (GST_type === "Registered") {
          statdata.append("GST_Doc", GST_Doc);
          statdata.append("fileDisclosure", "");
        } else {
          statdata.append("GST_Doc", "");
          statdata.append("fileDisclosure", fileDisclosure);
        }
        statdata.append("form_10f_Doc", form_10f_Doc);
        statdata.append("TAN_Doc", TAN_Doc);
        statdata.append("PE_DeclarationNo", values.PE_DeclarationNo);
        statdata.append("PE_Declaration_Doc", PE_Declaration_Doc);
        statdata.append("MSME_Doc", MSME_Doc);
        statdata.append("Tax_residency_Doc", Tax_residency_Doc);
        statdata.append("CIN_No", values.CIN_No);
        statdata.append("form_10f", values.form_10f);
        statdata.append("MSMED", MSME_status);
        statdata.append("MSMED_Number", values.MSME_No);
        statdata.append("MSMED_Vendor_Type", MSME);
        statdata.append("TAN_No", values.TAN_No);
        statdata.append("userId", newuser);
        statdata.append("Tax_residency_No", values.Tax_residency_No);
        apiService.saveStatutoryDetail(statdata).then((res) => {
          setstatRes(res.data.status);
          if (res.data.status === "success") {
            Swal.fire({
              title: "Data saved",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                callback();
              }
            });
          } else {
            Swal.fire({
              title: "Error While Fetching",
              icon: "error",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
          }
        });
      } else {
        apiService.saveStatutoryDetail(data).then((res) => {
          setstatRes(res.data.status);
          if (res.data.status === "success") {
            Swal.fire({
              title: "Data saved",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                callback();
              }
            });
          } else {
            Swal.fire({
              title: "Error While Fetching",
              icon: "error",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
          }
        });
      }
    }
  };
  const updateStatutoryDetail = (e, callback) => {
    e.preventDefault();
    setIsNewValueEntered(false);
    const data = new FormData();
    data.append("GST_Vendor_Type", GST_type);
    if (GST_type === "UnRegistered") {
      data.append("GST_Registration_No", "N/A");
    } else {
      data.append("GST_Registration_No", values.GST_No);
    }
    if (countryName !== "IN") {
      data.append("P_A_N_No", "N/A");
      data.append("PAN_Doc", "");
    } else {
      data.append("P_A_N_No", values.PAN_No);
      data.append("PAN_Doc", PAN_Doc);
    }
    if (GST_type === "Registered") {
      data.append("GST_Doc", GST_Doc);
      data.append("fileDisclosure", "");
    } else {
      data.append("GST_Doc", "");
      data.append("fileDisclosure", fileDisclosure);
    }
    data.append("form_10f_Doc", form_10f_Doc);
    data.append("TAN_Doc", TAN_Doc);
    data.append("PE_DeclarationNo", values.PE_DeclarationNo);
    data.append("PE_Declaration_Doc", PE_Declaration_Doc);
    data.append("MSME_Doc", MSME_Doc);
    data.append("Tax_residency_Doc", Tax_residency_Doc);
    data.append("CIN_No", values.CIN_No);
    data.append("form_10f", values.form_10f);
    data.append("MSMED", MSME_status);
    data.append("MSMED_Number", values.MSMED_Number);
    data.append("MSMED_Vendor_Type", MSME);
    data.append("TAN_No", values.TAN_No);
    data.append("userId", params.userId);
    data.append("Tax_residency_No", values.Tax_residency_No);
    if (params.userId) {
      apiService.updateStatutoryDetail(params.userId, data).then((res) => {
        setstatRes(res.data.status);
        if (res.data.status === "success") {
          Swal.fire({
            title: "Data Updated",
            icon: "success",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              callback();
            }
          });
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        }
      });
    }
  };
  const deleteFile = (event) => {
    if (
      (event === "fileDisclosure" && fileDisclosure) ||
      (event === "GST_Doc" && GST_Doc) ||
      (event === "PAN_Doc" && PAN_Doc) ||
      (event === "MSME_Doc" && MSME_Doc) ||
      (event === "TAN_Doc" && TAN_Doc)
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
                setFile("");
                // setValues({
                //   GST_Doc: "",
                // });
              } else if (event === "fileDisclosure") {
                setfileDisclosure("");
              } else if (event === "PAN_Doc") {
                setPAN_Doc("");
                // setValues({
                //   PAN_Doc: "",
                // });
              } else if (event === "MSME_Doc") {
                setMSME_Doc("");
                // setValues({
                //   MSME_Doc: "",
                // });
              } else if (event === "TAN_Doc") {
                setTAN_Doc("");
                // setValues({
                //   TAN_Doc: "",
                // });
              }
              Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("File not deleted", "", "info");
            }
          });
        },
      });
    } else {
      Swal.fire("File not deleted", "", "info");
    }
  };

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
                          <>
                            {GST_type === "UnRegistered" ? (
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
                                      // onChange={handleChange("GST_No")}
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

                                      {fileDisclosure !== "" &&
                                      fileDisclosure !== "null" &&
                                      fileDisclosure !== undefined ? (
                                        <div className="frame-input">
                                          <button
                                            type="button"
                                            className="deleteFile"
                                            onClick={() => {
                                              deleteFile("fileDisclosure");
                                            }}
                                          >
                                            Delete UnRegister Gst
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="frame-input">
                                          <label htmlFor="fileupload">
                                            Upload UnRegister Gst
                                          </label>
                                          <input
                                            type="file"
                                            id="fileupload"
                                            onChange={onFileDisclosurechange}
                                            name="fileDisclosure"
                                            required
                                          />
                                        </div>
                                      )}
                                    </Row>
                                  )}
                                </Col>
                              </Row>
                            ) : (
                              <>
                                {GST_type === "Import" ? (
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
                                          // onChange={handleChange("GST_No")}
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
                                    <Col></Col>
                                  </Row>
                                ) : (
                                  <>
                                    {GST_type === "Registered" ? (
                                      <>
                                        <Row>
                                          <Col>
                                            <Form.Group
                                              className="mb-3"
                                              controlId="formBasicEmail"
                                            >
                                              <Form.Label>GST no*</Form.Label>
                                              <InputGroup className="statutoryInput">
                                                <Form.Control
                                                  style={{
                                                    border: "none",
                                                    borderRadius: "25px",
                                                    outline: "none",
                                                    outlineOffset: "none",
                                                  }}
                                                  className="statInput"
                                                  type="text"
                                                  value={values.GST_No}
                                                  onChange={handleChange(
                                                    "GST_No"
                                                  )}
                                                />
                                                <InputGroup.Text
                                                  style={{ border: "none" }}
                                                >
                                                  <Tooltip title={gstNo}>
                                                    <InfoIcon />
                                                  </Tooltip>
                                                </InputGroup.Text>
                                              </InputGroup>
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
                                            {GST_Doc !== "" &&
                                            GST_Doc !== "null" &&
                                            GST_Doc !== undefined ? (
                                              <div className="frame-input">
                                                <button
                                                  type="button"
                                                  className="deleteFile"
                                                  onClick={() => {
                                                    deleteFile("GST_Doc");
                                                  }}
                                                >
                                                  Delete GST
                                                </button>
                                              </div>
                                            ) : (
                                              <div className="frame-input">
                                                <label htmlFor="fileupload">
                                                  Upload GST
                                                </label>
                                                <input
                                                  type="file"
                                                  id="fileupload"
                                                  // value={values.GST_Doc}
                                                  onChange={onFileChange}
                                                  required
                                                  disabled={
                                                    style === "notEditable"
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              </div>
                                            )}
                                          </Col>
                                        </Row>
                                      </>
                                    ) : (
                                      <Row>
                                        <Col>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicEmail"
                                          >
                                            <Form.Label>GST no*</Form.Label>
                                            <InputGroup className="statutoryInput">
                                              <Form.Control
                                                style={{
                                                  border: "none",
                                                  borderRadius: "25px",
                                                  outline: "none",
                                                  outlineOffset: "none",
                                                }}
                                                className="statInput"
                                                type="text"
                                                value={values.GST_No}
                                                onChange={handleChange(
                                                  "GST_No"
                                                )}
                                              />
                                              <InputGroup.Text
                                                style={{ border: "none" }}
                                              >
                                                <Tooltip title={gstNo}>
                                                  <InfoIcon />
                                                </Tooltip>
                                              </InputGroup.Text>
                                            </InputGroup>
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
                                          {GST_Doc !== "" &&
                                          GST_Doc !== "null" &&
                                          GST_Doc !== undefined ? (
                                            <div className="frame-input">
                                              <button
                                                type="button"
                                                className="deleteFile"
                                                onClick={() => {
                                                  deleteFile("GST_Doc");
                                                }}
                                              >
                                                Delete GST
                                              </button>
                                            </div>
                                          ) : (
                                            <div className="frame-input">
                                              <label htmlFor="fileupload">
                                                Upload GST
                                              </label>
                                              <input
                                                type="file"
                                                id="fileupload"
                                                // value={values.GST_Doc}
                                                onChange={onFileChange}
                                                required
                                                disabled={
                                                  style === "notEditable"
                                                    ? true
                                                    : false
                                                }
                                              />
                                            </div>
                                          )}
                                        </Col>
                                      </Row>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
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
                                  // onChange={handleChange("GST_No")}
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
                                  {fileDisclosure !== "" &&
                                  fileDisclosure !== "null" &&
                                  fileDisclosure !== undefined ? (
                                    <div className="frame-input">
                                      <button
                                        type="button"
                                        className="deleteFile"
                                        onClick={() => {
                                          deleteFile("fileDisclosure");
                                        }}
                                      >
                                        Delete UnRegister Gst
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="frame-input">
                                      <label htmlFor="fileupload">
                                        Upload UnRegister Gst
                                      </label>
                                      <input
                                        type="file"
                                        id="fileupload"
                                        onChange={onFileDisclosurechange}
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
                      </Row>
                      <Row>
                        {GST_type === "Import" ? (
                          <Col>
                            <Form.Group
                              sx={{ mb: 3 }}
                              controlId="formBasicEmail"
                            >
                              <Form.Label>PAN no*</Form.Label>
                              <InputGroup className="statutoryInput">
                                <Form.Control
                                  style={{
                                    border: "none",
                                    borderRadius: "25px",
                                  }}
                                  type="text"
                                  value="N/A"
                                  disabled="true"
                                  onChange={handleChange("PAN_No")}
                                />
                                <InputGroup.Text style={{ border: "none" }}>
                                  <Tooltip title={panNo}>
                                    <InfoIcon />
                                  </Tooltip>
                                </InputGroup.Text>
                              </InputGroup>
                              {errors.PAN_No ? (
                                <p className="text text-danger small">
                                  {errors.PAN_No}
                                </p>
                              ) : (
                                ""
                              )}
                            </Form.Group>
                          </Col>
                        ) : (
                          <Col>
                            <Form.Group
                              sx={{ mb: 3 }}
                              controlId="formBasicEmail"
                            >
                              <Form.Label>PAN no*</Form.Label>
                              <InputGroup className="statutoryInput">
                                <Form.Control
                                  style={{
                                    border: "none",
                                    borderRadius: "25px",
                                  }}
                                  type="text"
                                  value={
                                    countryName !== "IN" ? "N/A" : values.PAN_No
                                  }
                                  disabled={countryName !== "IN"}
                                  onChange={handleChange("PAN_No")}
                                />
                                <InputGroup.Text style={{ border: "none" }}>
                                  <Tooltip title={panNo}>
                                    <InfoIcon />
                                  </Tooltip>
                                </InputGroup.Text>
                              </InputGroup>
                              {errors.PAN_No ? (
                                <p className="text text-danger small">
                                  {errors.PAN_No}
                                </p>
                              ) : (
                                ""
                              )}
                            </Form.Group>
                          </Col>
                        )}
                        <Col>
                          {countryName === "IN" ? (
                            PAN_Doc !== "" &&
                            PAN_Doc !== "null" &&
                            PAN_Doc !== undefined ? (
                              <div className="frame-input">
                                <button
                                  type="button"
                                  className="deleteFile"
                                  onClick={() => {
                                    deleteFile("PAN_Doc");
                                  }}
                                >
                                  Delete PAN
                                </button>
                              </div>
                            ) : GST_type !== "Import" ? (
                              <div className="frame-input">
                                <label htmlFor="fileuploadPan">
                                  Upload PAN
                                </label>
                                <input
                                  type="file"
                                  id="fileuploadPan"
                                  // value={values.PAN_Doc}
                                  onChange={onFileChangePAN_Doc}
                                  required
                                  disabled={countryName !== "IN"}
                                />
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
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
                            <InputGroup className="statutoryInput">
                              <Form.Control
                                style={{
                                  border: "none",
                                  borderRadius: "25px",
                                }}
                                type="text"
                                value={values.CIN_No}
                                onChange={handleChange("CIN_No")}
                              />
                              <InputGroup.Text style={{ border: "none" }}>
                                <Tooltip title={cinNo}>
                                  <InfoIcon />
                                </Tooltip>
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col></Col>
                      </Row>

                      <Row>
                        <Col>
                          {countryName !== "IN" ? (
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

                                      <ClearIcon
                                        style={{ color: "red" }}
                                        onClick={() => {
                                          DeleteForm10FDoc("form_10f_Doc");
                                        }}
                                      />
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
                          {countryName !== "IN" ? (
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
                                  <ClearIcon
                                    style={{ color: "red" }}
                                    onClick={() => {
                                      DeletePEDeclaration("PE_Declaration_Doc");
                                    }}
                                  />
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
                        <>
                          {MSME_status === "UnRegistered" ? (
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
                                {MSME_Doc !== "" &&
                                MSME_Doc !== "null" &&
                                MSME_Doc !== undefined &&
                                MSME_status === "Registered" ? (
                                  <div className="frame-input">
                                    <button
                                      type="button"
                                      className="deleteFile"
                                      onClick={() => {
                                        deleteFile("MSME_Doc");
                                      }}
                                    >
                                      Delete MSME
                                    </button>
                                  </div>
                                ) : MSME_status === "Registered" ? (
                                  <div className="frame-input">
                                    <label htmlFor="fileuploadMSME">
                                      Upload MSME
                                    </label>
                                    <input
                                      type="file"
                                      id="fileuploadMSME"
                                      // value={values.MSME_Doc}
                                      onChange={onFileChangeMSME_Doc}
                                      disabled="true"
                                    />
                                  </div>
                                ) : (
                                  <></>
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
                                  <InputGroup className="statutoryInput">
                                    <Form.Control
                                      style={{
                                        border: "none",
                                        borderRadius: "25px",
                                      }}
                                      type="text"
                                      value={values.MSME_No}
                                      onChange={handleChange("MSME_No")}
                                    />
                                    <InputGroup.Text style={{ border: "none" }}>
                                      <Tooltip title={msmeNo}>
                                        <InfoIcon />
                                      </Tooltip>
                                    </InputGroup.Text>
                                  </InputGroup>
                                </Form.Group>
                              </Col>
                              <Col>
                                {MSME_Doc !== "" &&
                                MSME_Doc !== "null" &&
                                MSME_Doc !== undefined ? (
                                  <div className="frame-input">
                                    <button
                                      type="button"
                                      className="deleteFile"
                                      onClick={() => {
                                        deleteFile("MSME_Doc");
                                      }}
                                    >
                                      Delete MSME
                                    </button>
                                  </div>
                                ) : MSME_status === "Registered" ? (
                                  <div className="frame-input">
                                    <label htmlFor="fileuploadMSME">
                                      Upload MSME
                                    </label>
                                    <input
                                      type="file"
                                      id="fileuploadMSME"
                                      // value={values.MSME_Doc}
                                      onChange={onFileChangeMSME_Doc}
                                      required
                                      disabled={
                                        style === "notEditable" ? true : false
                                      }
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </Col>
                            </Row>
                          )}
                        </>
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
                            {MSME_Doc !== "" &&
                            MSME_Doc !== "null" &&
                            MSME_Doc !== undefined &&
                            MSME_status === "Registered" ? (
                              <div className="frame-input">
                                <button
                                  type="button"
                                  className="deleteFile"
                                  onClick={() => {
                                    deleteFile("MSME_Doc");
                                  }}
                                >
                                  Delete MSME
                                </button>
                              </div>
                            ) : MSME_status === "Registered" ? (
                              <div className="frame-input">
                                <label htmlFor="fileuploadMSME">
                                  Upload MSME
                                </label>
                                <input
                                  type="file"
                                  id="fileuploadMSME"
                                  // value={values.MSME_Doc}
                                  onChange={onFileChangeMSME_Doc}
                                  disabled="true"
                                />
                              </div>
                            ) : (
                              <></>
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
                                  disabled={
                                    MSME_status === "UnRegistered"
                                      ? true
                                      : false
                                  }
                                />{" "}
                                Micro
                              </Col>
                              <Col sm={4}>
                                <input
                                  onChange={onChangeValueMSME}
                                  type="radio"
                                  value="Small"
                                  name="Small"
                                  checked={MSME === "Small"}
                                  disabled={
                                    MSME_status === "UnRegistered"
                                      ? true
                                      : false
                                  }
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
                                  disabled={
                                    MSME_status === "UnRegistered"
                                      ? true
                                      : false
                                  }
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
                            <InputGroup className="statutoryInput">
                              <Form.Control
                                style={{
                                  border: "none",
                                  borderRadius: "25px",
                                }}
                                type="text"
                                value={values.TAN_No}
                                onChange={handleChange("TAN_No")}
                              />
                              <InputGroup.Text style={{ border: "none" }}>
                                <Tooltip title={tanNo}>
                                  <InfoIcon />
                                </Tooltip>
                              </InputGroup.Text>
                            </InputGroup>
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

                          {TAN_Doc !== "" &&
                          TAN_Doc !== "null" &&
                          TAN_Doc !== undefined ? (
                            <div className="frame-input">
                              <button
                                type="button"
                                className="deleteFile"
                                onClick={() => {
                                  deleteFile("TAN_Doc");
                                }}
                              >
                                Delete TAN
                              </button>
                            </div>
                          ) : (
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
                      {countryName !== "IN" ? (
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
                                      <ClearIcon
                                        style={{ color: "red" }}
                                        onClick={() => {
                                          DeleteTax_residency(
                                            "Tax_residency_Doc"
                                          );
                                        }}
                                      />
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
            {params.userId &&
            JSON.parse(window.sessionStorage.getItem("jwt")).result.role ===
              "Admin" ? (
              <>
                <button
                  type="button"
                  onClick={updateStatutoryDetail}
                  className="btn statutorybtn btn-md m-1"
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    saveStatutoryDetail();
                  }}
                  className="btn bankbtn btn-md m-1"
                >
                  Save
                </button>
              </>
            )}

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
