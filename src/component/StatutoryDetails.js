import "../css/StatutoryDetails.css";
import information from "../img/information.jpg";
import Navbar1 from "../common/navbar.js";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export default function Statutory(props) {
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
  const [values, setValues] = useState({
    userId: '',
    GST_type: '',
    GST_No: '',
    GST_Doc: '',
    PAN_No: '',
    PAN_Doc: '',
    form_10f_Doc: '',
    TAN_Doc: '',
    PE_DeclarationNo: '',
    PE_Declaration_Doc: '',
    MSME_Doc: '',
    Tax_residency_Doc: '',
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
    setTax_residency_Doc(e.target.files[0])
  }
  function onFileChangeform_10f_Doc(e) {
    setform_10f_Doc(e.target.files[0])
  }
  function onFileChangePAN_Doc(e) {
    setPAN_Doc(e.target.files[0])
  }
  function onFileChangePE_Declaration_Doc(e) {
    setPE_Declaration_Doc(e.target.files[0])
  }
  function onFileChangeTAN_Doc(e) {
    setTAN_Doc(e.target.files[0])
  }
  function onFileChangeMSME_Doc(e) {
    setMSME_Doc(e.target.files[0])
  }

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
    data.append('Tax_residency_No', values.Tax_residency_No);
    axios.post("http://localhost:12707/saveStatutoryDetail", data)
      .then(res => {


      })

    const user = {
      GST_type: GST_type || undefined,
      GST_No: values.GST_No || undefined,
      GST_Doc: GST_Doc || undefined,
      PAN_No: values.PAN_No || undefined,
      PAN_Doc: values.PAN_Doc || undefined,
      form_10f_Doc: values.form_10f_Doc || undefined,
      TAN_Doc: values.TAN_Doc || undefined,
      PE_DeclarationNo: values.PE_DeclarationNo || undefined,
      PE_Declaration_Doc: values.PE_Declaration_Doc || undefined,
      MSME_Doc: values.MSME_Doc || undefined,
      Tax_residency_Doc: values.Tax_residency_Doc || undefined,
      CIN_No: values.CIN_No || undefined,
      form_10f: values.form_10f || undefined,
      MSME_status: values.MSME_status || undefined,
      MSME_No: values.MSME_No || undefined,
      MSME_Type: MSME || undefined,
      TAN_No: values.TAN_No || undefined,
      Tax_residency_No: values.Tax_residency_No || undefined,
    }
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
                            <Form.Control className="statutoryInput" type="text" value={values.form_10f} onChange={handleChange('form_10f')} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <div className="frame-input">
                            <label for="fileuploadForm10F">Upload Form 10F</label>
                            <input type="file" id="fileuploadForm10F" value={values.form_10f_Doc} onChange={onFileChangeform_10f_Doc} required />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>No PE declaration*</Form.Label>
                            <Form.Control className="statutoryInput" type="text" value={values.PE_DeclarationNo} onChange={handleChange('PE_DeclarationNo')} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <div className="frame-input">
                            <label for="fileuploadPED">Upload PED</label>
                            <input type="file" id="fileuploadPED" value={values.PE_Declaration_Doc} onChange={onFileChangePE_Declaration_Doc} required />
                          </div>
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
                            <Form.Control className="statutoryInput" type="text" value={values.Tax_residency_No} onChange={handleChange('Tax_residency_No')} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <div className="frame-input">
                            <label for="fileuploadTRC">Upload TRC</label>
                            <input type="file" id="fileuploadTRC" value={values.Tax_residency_Doc} onChange={onFileChangeTax_residency_Doc} required />
                          </div>
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
          <Col sm={4}>
            <Button className="statutoryButton">cancel</Button>
          </Col>
          <Col sm={4}><Button className="statutoryButton" onClick={saveStatutoryDetail}>save</Button></Col>
          <Col sm={4}><Button className="statutoryButton">next</Button></Col>
        </Row>
      </Container>
    </div>
  )
}


