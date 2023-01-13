import React, { useState } from 'react';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ComplianceDetails = () => {
  const navigate = useNavigate();
  const [fileRPD, setfileRPD] = useState();
  const [fileCOC, setfileCOC] = useState();
  const [fileNDA, setfileNDA] = useState();
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
    e.preventDefault();
    apiService.downloadPdf()
      .then(response => {

      })
  }
  function next(e) {
    navigate('/bank');
  }
  const saveComplianceDetail = (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append('RPD_Doc', fileRPD);
    data.append('NDA_Doc', fileNDA);
    data.append('COC_Doc', fileCOC);
    data.append('userId', values.userId);
    axios.post("http://localhost:12707/saveComplianceDetail", data)
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
    <div className="Compliance-details">
      <Navbar1 />
      <Container fluid="md">
        <Row>
          <Col>
            <h2 className="statutory-details-name">Compliance Details</h2>
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

                      <Button className="ViewBtn" onClick={downloadPdf}>Download</Button>
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
                  </Row>
                  <Row>
                    <Form.Label>COC for services support/installation*</Form.Label>
                    <Col>
                      <Button className="ViewBtn">Download</Button>
                    </Col>
                    <Col sm={6} >

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
                  </Row>
                  <Row>
                    <Form.Label>Non-disclosure agreement*</Form.Label>
                    <Col>
                      <Button className="ViewBtn">Download</Button>
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
          <Col sm={4}>
            <Button className="statutoryButton">cancel</Button>
          </Col>
          <Col sm={4}><Button className="statutoryButton" onClick={saveComplianceDetail}>save</Button></Col>
          <Col sm={4}><Button onClick={next} className="statutoryButton">next</Button></Col>
        </Row>
      </Container>
      <div>
      </div>
    </div>
  );
};

export default ComplianceDetails;
