import "../css/StatutoryDetails.css";
import information from "../img/information.jpg";
import Navbar1 from "../common/navbar.js";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import apiService from "../services/api.service";
import { useNavigate } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
export default function Statutory(props) {
  const navigate = useNavigate();
  const [GST_type, setGST_type] = useState("Registered");
  const [MSME, setMSME] = useState("Micro");
  const [MSME_status, setMSME_status] = useState("Registered");
  const [GST_Doc, setFile] = useState();
  const [PAN_Doc, setPAN_Doc] = useState();
  const [PE_Declaration_Doc, setPE_Declaration_Doc] = useState();
  const [form_10f_Doc, setform_10f_Doc] = useState();
  const [TAN_Doc, setTAN_Doc] = useState();
  const [MSME_Doc, setMSME_Doc] = useState();
  const [Tax_residency_Doc, setTax_residency_Doc] = useState();
  const [submit, setSubmit] = useState(null);
  const params = useParams();
  const [fileRPD, setfileRPD] = useState();
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    GST_type: '',
    GST_No: '',
    GST_Doc: '',
    PAN_No: '',
    PAN_Doc: '',
    TAN_Doc: '',
    PE_DeclarationNo: '',
    MSME_Doc: '',
    CIN_No: '',
    form_10f: '',
    MSME_status: '',
    MSME_No: '',
    MSME_Type: '',
    TAN_No: '',
    Tax_residency_No: '',
  });
  function onChangeValue(event) {
    setGST_type(event.target.value);
  }
  function onChangeValueMSME(event) {
    setMSME(event.target.value);
  }
  function onChangeValueMSME_status(event) {
    setMSME_status(event.target.value);
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
    setSubmit(true)
  }
  const onFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0])
  }

  function onFileChangeTax_residency_Doc(e) {
    setTax_residency_Doc(e)
  }
  function onFileChangeform_10f_Doc(e) {
    setform_10f_Doc(e)
  }
  function onFileChangePAN_Doc(e) {
    setPAN_Doc(e.target.files[0])
  }
  function onFileChangePE_Declaration_Doc(e) {
    setPE_Declaration_Doc(e)
  }
  function onFileChangeTAN_Doc(e) {
    setTAN_Doc(e.target.files[0])
  }
  function onFileChangeMSME_Doc(e) {
    setMSME_Doc(e.target.files[0])
  }
  function next(e) {
    navigate('/ComplianceDetail');
  }


  useEffect(() => {

  })
  const saveStatutoryDetail = (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append('GST_Doc', GST_Doc);
    data.append('GST_type', GST_type);
    data.append('GST_No', values.GST_No);
    data.append('PAN_No', values.PAN_No);
    data.append('PAN_Doc', PAN_Doc);
    data.append('form_10f_Doc', form_10f_Doc);
    data.append('TAN_Doc', TAN_Doc);
    data.append('PE_DeclarationNo', values.PE_DeclarationNo);
    data.append('PE_Declaration_Doc', PE_Declaration_Doc);
    data.append('MSME_Doc', MSME_Doc);
    data.append('Tax_residency_Doc', Tax_residency_Doc);
    data.append('CIN_No', values.CIN_No);
    data.append('form_10f', values.form_10f);
    data.append('MSME_status', MSME_status);
    data.append('MSME_No', values.MSME_No);
    data.append('MSME_Type', MSME);
    data.append('TAN_No', values.TAN_No);
    data.append('userId', values.userId);
    data.append('Tax_residency_No', values.Tax_residency_No);
    apiService.saveStatutoryDetail(data)
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
    <div>
      <Navbar1 />
      <Container fluid="md">
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
                              <input onChange={onChangeValue} type="radio" value="Registered" name="GST_type" checked={GST_type === "Registered"} /> Registered
                            </Col>
                            <Col sm={4}>
                              <input onChange={onChangeValue} type="radio" value="UnRegistered" name="GST_type" checked={GST_type === "UnRegistered"} /> UnRegistered
                            </Col>
                            <Col sm={4}>
                              <input onChange={onChangeValue} type="radio" value="Import" name="GST_type" checked={GST_type === "Import"} /> Import
                            </Col>
                          </Row>
                        </Form.Group>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>GST no*</Form.Label>
                            <Form.Control className="statutoryInput" type="text" value={values.GST_No} onChange={handleChange('GST_No')} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <div className="frame-input">
                            <label for="fileupload">Upload GST</label>
                            <input type="file" id="fileupload" value={values.GST_Doc} onChange={onFileChange} required />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>PAN no*</Form.Label>
                            <Form.Control className="statutoryInput" type="text" value={values.PAN_No} onChange={handleChange('PAN_No')} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <div className="frame-input">
                            <label for="fileuploadPan">Upload PAN</label>
                            <input type="file" id="fileuploadPan" value={values.PAN_Doc} onChange={onFileChangePAN_Doc} required />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>CIN no*</Form.Label>
                            <Form.Control className="statutoryInput" type="text" value={values.CIN_No} onChange={handleChange('CIN_No')} />
                          </Form.Group>
                        </Col>
                        <Col>

                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Form 10F*</Form.Label>
                            <FileUploader className="financial_fileupload"
                              handleChange={onFileChangeform_10f_Doc}
                              required
                              type="file"
                              name="fileFD"
                            />
                            <span>{form_10f_Doc ? `File name: ${form_10f_Doc.name}` : "No File Chosen"}</span>

                          </Form.Group>
                        </Col>

                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>No PE declaration*</Form.Label>
                            <FileUploader className="financial_fileupload"
                              handleChange={onFileChangePE_Declaration_Doc}
                              required
                              type="file"
                              name="fileFD"
                            /> </Form.Group>
                          <span>{PE_Declaration_Doc ? `File name: ${PE_Declaration_Doc.name}` : "No File Chosen"}</span>
                        </Col>

                      </Row>

                    </Form></Col>
                  <Col>
                    <Form>

                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>MSME status*</Form.Label>
                            <Row>
                              <Col sm={4}>  <input onChange={onChangeValueMSME_status} type="radio" value="Registered" name="Registered" checked={MSME_status === "Registered"} /> Registered
                              </Col>
                              <Col sm={4}>
                                <input onChange={onChangeValueMSME_status} type="radio" value="UnRegistered" name="UnRegistered" checked={MSME_status === "UnRegistered"} /> UnRegistered
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>MSME no*</Form.Label>
                            <Form.Control className="statutoryInput" type="text" value={values.MSME_No} onChange={handleChange('MSME_No')} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <div className="frame-input">
                            <label for="fileuploadMSME">Upload MSME</label>
                            <input type="file" id="fileuploadMSME" value={values.MSME_Doc} onChange={onFileChangeMSME_Doc} required />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>MSME type*</Form.Label>
                            <Row>
                              <Col sm={4}>
                                <input onChange={onChangeValueMSME} type="radio" value="Micro" name="Micro" checked={MSME === "Micro"} /> Micro
                              </Col>
                              <Col sm={4}>
                                <input onChange={onChangeValueMSME} type="radio" value="Small" name="Small" checked={MSME === "Small"} /> Small
                              </Col>
                              <Col sm={4}>
                                <input onChange={onChangeValueMSME} type="radio" value="Macro" name="Macro" checked={MSME === "Macro"} /> Micro
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>TAN no*</Form.Label>
                            <Form.Control className="statutoryInput" type="text" value={values.TAN_No} onChange={handleChange('TAN_No')} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <div className="frame-input">
                            <label for="fileuploadTAN">Upload TAN</label>
                            <input type="file" id="fileuploadTAN" value={values.TAN_Doc} onChange={onFileChangeTAN_Doc} required />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tax Residency Certificate*</Form.Label>
                            <FileUploader className="financial_fileupload"
                              handleChange={onFileChangeTax_residency_Doc}
                              required
                              type="file"
                              name="fileFD"
                            />
                            <span>{Tax_residency_Doc ? `File name: ${Tax_residency_Doc.name}` : "No File Chosen"}</span>

                          </Form.Group>
                        </Col>

                      </Row>
                    </Form>
                  </Col>
                </Row>

              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="statutory-Note">NOTE: If the vendor is not registered with the above compliance, they can mention it as “Non-Registered” in that column and they will upload the discloser for the same on the document upload option.</p>
          </Col>
        </Row>
        <Row className="sbtn">
          <div className="float-end mt-2" >
            <button type="button" className="btn statutorybtn btn-primary btn-md m-1">Cancel</button>
            <button type="button" onClick={saveStatutoryDetail} className="btn statutorybtn btn-primary btn-md m-1">Save</button>
            <button type="button" onClick={next} className="btn statutorybtn btn-primary btn-md m-1">Next</button>
          </div>
        </Row>
      </Container>
    </div>
  )
}


