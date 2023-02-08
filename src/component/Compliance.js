import React, { useState, useEffect } from 'react';
import "../css/Compliance.css";
import Navbar1 from "../common/navbar.js";
import { FileUploader } from "react-drag-drop-files";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import hisys from "../img/HISYSVendorPortal.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ComplianceDetails = () => {
  const navigate = useNavigate();
  const [fileRPD, setfileRPD] = useState();
  const [urlRPD, seturlRPD] = useState();
  const [urlCoc, seturlCoc] = useState();
  const [urlNDA, seturlNDA] = useState();
  const [fileCOC, setfileCOC] = useState();
  const [fileNDA, setfileNDA] = useState();
  const [financialYearEnd, setfinancialYearEnd] = useState();
  const [pdfValues, setpdfValues] = useState({
    companyName: JSON.parse(window.sessionStorage.getItem("jwt")).result.companyName,
    userName: JSON.parse(window.sessionStorage.getItem("jwt")).result.userName,
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
  });
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    NDA_Doc: '',
    COC_Doc: '',
    RPD_Doc: '',
  });
  function onFileChangeRPD(e) {
    setfileRPD(e);
  }
  function onFileChangeCOC(e) {
    setfileCOC(e)
  }
  function onFileChangeNDA(e) {
    setfileNDA(e)
  }
  const downloadPdf = (e) => {
    const user = {
      companyName: pdfValues.companyName || undefined,
      userName: pdfValues.userName || undefined,
    }
    e.preventDefault();
    apiService.downloadPdf(user)
      .then(response => {

      })
  }
  function next(e) {
    navigate('/bank');
  }
  useEffect(() => {
    const user = {
      companyName: pdfValues.companyName || undefined,
      userName: pdfValues.userName || undefined,
      userId: pdfValues.userId || undefined,
    }
    apiService.createRelatedDisclosurePdf(user).then(res => {

    })
    apiService.createCocPdf(user).then(res => {

    })
    apiService.createNDAPdf(user).then(res => {

    })
    apiService.getFinancialDate().then(res => {

      setfinancialYearEnd(res.data.endDate);
    })
    seturlRPD(`http://localhost:12707/downloadPdf/${pdfValues.companyName}Rpd.pdf`);
    seturlCoc(`http://localhost:12707/downloadPdf/${pdfValues.companyName}COC.pdf`);
    seturlNDA(`http://localhost:12707/downloadPdf/${pdfValues.companyName}NDA.pdf`);
  }, [])
  const saveComplianceDetail = (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append('RPD_Doc', fileRPD);
    data.append('NDA_Doc', fileNDA);
    data.append('COC_Doc', fileCOC);
    data.append('userId', values.userId);

    apiService.saveComplianceDetail(data).then(res => {
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
    <div className="Compliance-details">
      <Navbar1 />
      <div className="container-fluid  py-5" style={{ backgroundColor: '#f3f4f7' }}>
        <Container fluid="md">
          <Row>
            <Col>
              <div className="container" >
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
                        <a href={urlRPD} download="Related_Party_Declaration">
                          <Button className="ViewBtn">Download</Button>
                        </a>
                      </Col>
                      <Col sm={6} >

                        <FileUploader
                          handleChange={onFileChangeRPD}
                          required
                          type="file"
                          name="fileRPD"
                        />
                        <span>{fileRPD ? `File name: ${fileRPD.name}` : "No File Chosen"}</span>


                      </Col>
                      <Col>
                        <Button className="UploadBtn">Upload files</Button>

                      </Col>
                      {fileRPD ?
                        <Col>
                          <p className='ValidityofDeclaration'>Validity of Declaration</p>
                          <p className='financialYearEnd'>{financialYearEnd}</p>
                        </Col>
                        : null}
                    </Row>
                    <Row>
                      <Form.Label>COC for services support/installation*</Form.Label>
                      <Col>
                        <a href={urlCoc} download="Related_Party_Declaration">
                          <Button className="ViewBtn">Download</Button>
                        </a>
                      </Col>
                      <Col sm={6}>
                        <FileUploader
                          handleChange={onFileChangeCOC}
                          required
                          type="file"
                          name="fileCOC"
                        />
                        <span>{fileCOC ? `File name: ${fileCOC.name}` : "No File Chosen"}</span>


                      </Col>
                      <Col>
                        <Button className="UploadBtn">Upload files</Button>

                      </Col>
                      {fileCOC ?
                        <Col>
                          <p className='ValidityofDeclaration'>Validity of Declaration</p>
                          <p className='financialYearEnd'>{financialYearEnd}</p>
                        </Col>
                        : null}
                    </Row>
                    <Row>
                      <Form.Label>Non-disclosure agreement*</Form.Label>
                      <Col>
                        <a href={urlNDA} download="Related_Party_Declaration">
                          <Button className="ViewBtn">Download</Button>
                        </a>
                      </Col>
                      <Col sm={6} >
                        <FileUploader
                          handleChange={onFileChangeNDA}
                          required
                          type="file"
                          name="fileNDA"
                        />
                        <span>{fileNDA ? `File name: ${fileNDA.name}` : "No File Chosen"}</span>
                      </Col>
                      <Col>
                        <Button className="UploadBtn">Upload files</Button>
                      </Col>
                      {fileNDA ?
                        <Col>
                          <p className='ValidityofDeclaration'>Validity of Declaration</p>
                          <p className='financialYearEnd'>{financialYearEnd}</p>
                        </Col>
                        : null}
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

          </Row>
          <Row>
            <Col>
              <p className='ComplianceNote'>Note: Download the documents and fill necessary details and upload the filled document</p>
            </Col>
          </Row>
          <Row className="sbtn">
            <div className="float-end mt-2" >
              <button type="button" className="btn bankbtn btn-primary btn-md m-1">Cancel</button>
              <button type="button" onClick={saveComplianceDetail} className="btn bankbtn btn-primary btn-md m-1">Save</button>
              <button type="button" onClick={next} className="btn bankbtn btn-primary btn-md m-1">Next</button>
            </div>
          </Row>
        </Container>
      </div>
      <div>
      </div>
    </div>
  );
};

export default ComplianceDetails;
