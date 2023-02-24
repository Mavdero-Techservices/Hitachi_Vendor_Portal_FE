import React, { useState, useEffect } from "react";
import "../css/Compliance.css";
import Navbar1 from "../common/navbar.js";
import { FileUploader } from "react-drag-drop-files";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ComplianceDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [EditCompliance, setEditCompliance] = useState(true);
  const [showEditUploadsField, setshowEditUploadsField] = useState(true);
  const [fileRPD, setfileRPD] = useState();
  const [editVlauefileRPD, seteditVlauefileRPD] = useState();
  const [editVlauefileCOC, seteditVlauefileCOC] = useState();
  const [editVlauefileNDA, seteditVlauefileNDA] = useState();
  const [editfileRPD, seteditfileRPD] = useState();
  const [urlRPD, seturlRPD] = useState();
  const [urlCoc, seturlCoc] = useState();
  const [urlNDA, seturlNDA] = useState();
  const [fileCOC, setfileCOC] = useState();
  const [fileNDA, setfileNDA] = useState();
  const [financialYearEnd, setfinancialYearEnd] = useState();
  const [deleteUploadedFile, setdeleteUploadedFile] = useState(false);
  const [deleteCocFile, setdeleteCocFile] = useState(false);
  const [deleteNdaFile, setdeleteNdaFile] = useState(false);
  const [pdfValues, setpdfValues] = useState({
    companyName: JSON.parse(window.sessionStorage.getItem("jwt")).result
      .companyName,
    userName: JSON.parse(window.sessionStorage.getItem("jwt")).result.userName,
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
  });
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    NDA_Doc: "",
    COC_Doc: "",
    RPD_Doc: "",
  });
  function onFileChangeRPD(e) {
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      setfileRPD(e);
      setdeleteUploadedFile(true);
    }
  }
  function onFileChangeCOC(e) {
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      setfileCOC(e);
      setdeleteCocFile(true);
    }
  }
  function onFileChangeNDA(e) {
    if (e.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      setfileNDA(e);
      setdeleteNdaFile(true);
    }
  }
  function deleteRpd(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to delete?",
      icon: "success",
      confirmButtonText: "OK",
    }).then((ClearData) => {
      setfileRPD("");
      seteditVlauefileRPD("");
      setdeleteUploadedFile(false);
    });
  }
  function deleteCOC(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to delete?",
      icon: "success",
      confirmButtonText: "OK",
    }).then((ClearData) => {
      setfileCOC("");
      seteditVlauefileCOC("");
      setdeleteCocFile(false);
    });
  }
  function deleteNDA(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to delete?",
      icon: "success",
      confirmButtonText: "OK",
    }).then((ClearData) => {
      setfileNDA("");
      seteditVlauefileNDA("");
      setdeleteNdaFile(false);
    });
  }
  function cancel(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "OK",
    }).then((ClearData) => {
      setfileRPD("");
      setfileCOC("");
      setfileNDA("");
      setdeleteUploadedFile(false);
      setdeleteCocFile(false);
      setdeleteNdaFile(false);
      seteditVlauefileRPD("");
    });
  }
  const downloadPdf = (e) => {
    const user = {
      companyName: pdfValues.companyName || undefined,
      userName: pdfValues.userName || undefined,
    };
    e.preventDefault();
    apiService.downloadPdf(user).then((response) => {});
  };
  function next(e) {
    saveComplianceDetail(e);
    navigate("/bank");
  }
  useEffect(() => {
    if (params.userId) {
      apiService.getAllCollection(params.userId).then((res) => {
        Object.entries(res.data.ComplianceDetail).map(([key, value]) => {
          var initialUrlRPD_Doc = res.data.ComplianceDetail[0].RPD_Doc;
          var RPD_Doc = initialUrlRPD_Doc.replace("uploads/", "");
          var initialUrlCOC_Doc = res.data.ComplianceDetail[0].COC_Doc;
          var COC_Doc = initialUrlCOC_Doc.replace("uploads/", "");
          var initialUrlNDA_Doc = res.data.ComplianceDetail[0].NDA_Doc;
          var NDA_Doc = initialUrlNDA_Doc.replace("uploads/", "");
          setfileRPD(initialUrlRPD_Doc);
          seteditVlauefileRPD(RPD_Doc);
          setfileCOC(initialUrlCOC_Doc);
          seteditVlauefileCOC(COC_Doc);
          setfileNDA(initialUrlNDA_Doc);
          seteditVlauefileNDA(NDA_Doc);
          setEditCompliance(true);
        });
      });
    } else {
      setEditCompliance(false);
    }
    const user = {
      companyName: pdfValues.companyName || undefined,
      userName: pdfValues.userName || undefined,
      userId: pdfValues.userId || undefined,
    };
    setshowEditUploadsField(true);
    apiService.createRelatedDisclosurePdf(user).then((res) => {});
    apiService.createCocPdf(user).then((res) => {});
    apiService.createNDAPdf(user).then((res) => {});
    apiService.getFinancialDate().then((res) => {
      setfinancialYearEnd(res.data.endDate);
    });
    seturlRPD(
      `http://localhost:12707/downloadPdf/${pdfValues.companyName}Rpd.pdf`
    );
    seturlCoc(
      `http://localhost:12707/downloadPdf/${pdfValues.companyName}COC.pdf`
    );
    seturlNDA(
      `http://localhost:12707/downloadPdf/${pdfValues.companyName}NDA.pdf`
    );
  }, []);
  const saveComplianceDetail = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("RPD_Doc", fileRPD);
    data.append("NDA_Doc", fileNDA);
    data.append("COC_Doc", fileCOC);
    data.append(
      "userId",
      JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
    );
    if (params.userId) {
      apiService.updateComplianceDetail(params.userId, data).then((res) => {
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
      apiService.saveComplianceDetail(data).then((res) => {
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
  return (
    <div className="Compliance-details">
      <Navbar1 />
      <div
        className="container-fluid  py-5"
        style={{ backgroundColor: "#f3f4f7" }}
      >
        <Container fluid="md">
          <Row>
            <Col>
              <div className="container">
                <h2 className="Compliance_title">Compliance Details</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Form>
                    <Row>
                      <Form.Label>Related Party Disclosure*</Form.Label>
                      <Col>
                        <a href={urlRPD} download>
                          <Button className="ViewBtn">Download</Button>
                        </a>
                      </Col>
                      <Col sm={6}>
                        {EditCompliance ? (
                          <div>
                            {editVlauefileRPD != "" ? (
                              <div>
                                <span>File name:{editVlauefileRPD}</span>
                              </div>
                            ) : (
                              <div>
                                <FileUploader
                                  handleChange={onFileChangeRPD}
                                  required
                                  type="file"
                                  name="fileRPD"
                                  fileOrFiles={deleteUploadedFile}
                                />
                                <span>
                                  {fileRPD
                                    ? `File name:${fileRPD.name}`
                                    : "No File Chosen"}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <FileUploader
                              handleChange={onFileChangeRPD}
                              required
                              type="file"
                              name="fileRPD"
                              fileOrFiles={deleteUploadedFile}
                            />
                            <span>
                              {fileRPD
                                ? `File name:${fileRPD.name}`
                                : "No File Chosen"}
                            </span>
                          </div>
                        )}
                      </Col>
                      <Col>
                        {EditCompliance && fileRPD != "" ? (
                          <Button className="UploadBtn" onClick={deleteRpd}>
                            Delete files
                          </Button>
                        ) : (
                          <Button className="UploadBtn">Upload files</Button>
                        )}{" "}
                      </Col>
                      {fileRPD != "" ? (
                        <Col>
                          <p className="ValidityofDeclaration">
                            Validity of Declaration
                          </p>
                          <p className="financialYearEnd">{financialYearEnd}</p>
                        </Col>
                      ) : null}
                    </Row>
                    <Row>
                      <Form.Label>
                        COC for services support/installation*
                      </Form.Label>
                      <Col>
                        <a href={urlCoc} download="Related_Party_Declaration">
                          <Button className="ViewBtn">Download</Button>
                        </a>
                      </Col>
                      <Col sm={6}>
                        {EditCompliance && editVlauefileCOC != "" ? (
                          <span>File name:{editVlauefileCOC}</span>
                        ) : (
                          <div>
                            <FileUploader
                              handleChange={onFileChangeCOC}
                              required
                              type="file"
                              name="fileCOC"
                              fileOrFiles={deleteCocFile}
                            />
                            <span>
                              {fileCOC
                                ? `File name: ${fileCOC.name}`
                                : "No File Chosen"}
                            </span>
                          </div>
                        )}
                      </Col>
                      <Col>
                        {EditCompliance && fileCOC != "" ? (
                          <Button onClick={deleteCOC} className="UploadBtn">
                            Delete files
                          </Button>
                        ) : (
                          <Button className="UploadBtn">Upload files</Button>
                        )}
                      </Col>
                      {fileCOC ? (
                        <Col>
                          <p className="ValidityofDeclaration">
                            Validity of Declaration
                          </p>
                          <p className="financialYearEnd">{financialYearEnd}</p>
                        </Col>
                      ) : null}
                    </Row>
                    <Row>
                      <Form.Label>Non-disclosure agreement*</Form.Label>
                      <Col>
                        <a href={urlNDA} download="Related_Party_Declaration">
                          <Button className="ViewBtn">Download</Button>
                        </a>
                      </Col>
                      <Col sm={6}>
                        {EditCompliance && editVlauefileNDA != "" ? (
                          <span>File name:{editVlauefileNDA}</span>
                        ) : (
                          <div>
                            <FileUploader
                              handleChange={onFileChangeNDA}
                              required
                              type="file"
                              name="fileNDA"
                              fileOrFiles={deleteNdaFile}
                            />
                            <span>
                              {fileNDA
                                ? `File name:${fileNDA.name}`
                                : "No File Chosen"}
                            </span>
                          </div>
                        )}
                      </Col>
                      <Col>
                        {EditCompliance && fileNDA != "" ? (
                          <Button onClick={deleteNDA} className="UploadBtn">
                            Delete files
                          </Button>
                        ) : (
                          <Button className="UploadBtn">Upload files</Button>
                        )}
                      </Col>
                      {fileNDA ? (
                        <Col>
                          <p className="ValidityofDeclaration">
                            Validity of Declaration
                          </p>
                          <p className="financialYearEnd">{financialYearEnd}</p>
                        </Col>
                      ) : null}
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="ComplianceNote">
                Note: Download the documents and fill necessary details and
                upload the filled document
              </p>
            </Col>
          </Row>
          <Row className="sbtn">
            <div className="float-end mt-2">
              <button
                type="button"
                onClick={cancel}
                className="btn bankbtn btn-primary btn-md m-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveComplianceDetail}
                className="btn bankbtn btn-primary btn-md m-1"
              >
                Save
              </button>
              <button
                type="button"
                onClick={next}
                className="btn bankbtn btn-primary btn-md m-1"
              >
                Next
              </button>
            </div>
          </Row>
        </Container>
      </div>
      <div></div>
    </div>
  );
};

export default ComplianceDetails;
