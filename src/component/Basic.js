import React from "react";
import "../css/Basic.css";
import uploa from "../img/camera-plus-4784676-3981194.webp";
import Navbar1 from "../common/navbar.js";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCheckbox, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea, MDBTypography } from 'mdb-react-ui-kit';
export class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      pinCode: '',
      companyName: '',
      image: '',
      financeSpoccontactName: '',
      financeSpocdesignation: '',
      financeSpocphoneNo: '',
      financeSpocemail: '',
      operationSpoccontactName: '',
      operationSpocdesignation: '',
      operationSpocphoneNo: '',
      operationSpocemail: '',
      collectionSpoccontactName: '',
      collectionSpocdesignation: '',
      collectionSpocphoneNo: '',
      collectionSpocemail: '',
      managementSpoccontactName: '',
      managementSpocdesignation: '',
      managementSpocphoneNo: '',
      managementSpocemail: '',
      contactName: '',
      designation: '',
      phoneNo: '',
      email: '',
      open: true,
      commu: false
    }
    this.togglebutton = this.togglebutton.bind(this);
    this.togglebuttonCommu = this.togglebuttonCommu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  };
  mouseEnter(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
    this.setState({ pinCode: e.target.value })
  };
  mouseOut(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
    this.setState({ pinCode: e.target.value })
    apiService.getStateAndcityByzipcode(this.state.country, this.state.pinCode)
      .then(response => {
        this.setState({ getCityAndState: response.data.data.postalcodes[0] });
        this.setState({ state: response.data.data.postalcodes[0].adminName1 });
        this.setState({ city: response.data.data.postalcodes[0].adminName3 });
      })
  };
  togglebutton() {
    const { open } = this.state;
    this.setState({
      open: true,
      commu: false,
    });
  }
  togglebuttonCommu() {
    const { commu } = this.state;
    this.setState({
      open: false,
      commu: true,
    });
  }
  handleChange(e) {
    this.setState({ country: e.target.value });
  };
  formValChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
    this.setState({ [e.target.id]: e.target.value })
  };
  handleSubmit = e => {
    e.preventDefault();
    apiService.saveVendordetail(this.state)
      .then(response => {
        if (response) {
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
  handleSubmitComDetail = e => {
    e.preventDefault();
    apiService.SaveVendorCommunication(this.state)
      .then(response => {
        if (response) {
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
  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await this.convertBase64(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = this.onreaderLoad.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  onreaderLoad = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    this.setState({
      image: btoa(binaryString)
    })
  }
  componentDidMount() {
    apiService.getCountry()
      .then(response => {
        this.setState({ countryData: response.data.data });
      })
    apiService.getStateAndcityByzipcode(this.state.country, this.state.pinCode)
      .then(response => {
        this.setState({ getCityAndState: response.data.postalcodes });
      })
  }
  render() {

    const { vendorId, address1, address2, city, state, country, pinCode, contactName, companyName, image, open, commu } = this.state;
    let countriesList = this.state.countryData?.length > 0
      && this.state.countryData?.map((item, i) => {
        return (
          <option className="mb-4" key={i} value={item.code}>{item.name}</option>
        )
      }, this);
    const { financeSpocdesignation, financeSpoccontactName,
      financeSpocphoneNo,
      financeSpocemail,
      operationSpoccontactName,
      operationSpocdesignation,
      operationSpocphoneNo,
      operationSpocemail,
      collectionSpoccontactName,
      collectionSpocdesignation,
      collectionSpocphoneNo,
      collectionSpocemail,
      managementSpoccontactName,
      managementSpocdesignation,
      managementSpocphoneNo,
      managementSpocemail,
      designation,
      phoneNo,
      email } = this.state;
    return (
      <>
        <div className="vendor-det">
          <Navbar1 />
          <div class="container-fluid ribbonMain">
            <div class="ribbon basic-information-label left" onClick={this.togglebutton}>  <span className={open ? 'dotActive' : 'dotInActive'}></span><label className='labelName'>Basic information</label></div>
            <div class="ribbon basic-information-label right" onClick={this.togglebuttonCommu}><span className={commu ? 'dotActive' : 'dotInActive'}></span><label className='labelName'>communication Details</label></div>
          </div>
          <div class="container">
            <div className="mx-auto mt-5" >
              {open && (
                <div class="container-fluid">
                  <MDBTypography tag="h5" className="mb-0 info">Basic information</MDBTypography>
                  <br />
                  <MDBRow>
                    <MDBCol md="12" className="mb-12 g">
                      <MDBCard className="mb-12">
                        <div class="container-fluid">
                          <MDBRow>
                            <MDBCol md="8" className="mb-4">
                              <MDBCard className="mb-4 basic">
                                <MDBCardBody>
                                  <form>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="companyName">Company Name*</label>
                                        </div>
                                        <div>
                                          <input type="text" className="mb-4 VendorInput" name="companyName" id="companyName" onChange={this.formValChange} value={companyName} />
                                        </div>
                                      </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div> <label htmlFor="address1">Address line - 1*</label></div>
                                        <div><input type="text" className="mb-4 VendorInput" name="address1" id="address1" onChange={this.formValChange} value={address1} /></div>
                                      </MDBCol>
                                    </MDBRow>
                                    <div>
                                      <label htmlFor="address2">Address line - 2*</label>
                                    </div>
                                    <div>
                                      <input type="text" className="mb-4 VendorInput" name="address2" id="address2" onChange={this.formValChange} value={address2} />
                                    </div>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="country">Country*</label>
                                        </div>
                                        <div>

                                          <select className="mb-4" name="country" id="country" value={this.state.country} onChange={this.handleChange}>
                                            {countriesList}
                                          </select>
                                        </div>

                                      </MDBCol>
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="pinCode">Pincode*</label>
                                        </div>
                                        <div>
                                          <input type="text" className="mb-4" name="pinCode" id="pinCode" value={pinCode} onMouseLeave={this.mouseOut} onChange={this.mouseEnter} />
                                        </div>

                                      </MDBCol>

                                    </MDBRow>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="state">State*</label>
                                        </div>
                                        <div>
                                          <input type="text" className="mb-4" name="state" id="state" onChange={this.formValChange} value={this.state.state} />
                                        </div>
                                      </MDBCol>
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="city">City*</label>
                                        </div>
                                        <div>
                                          <input type="text" className="mb-4" name="city" id="city" onChange={this.formValChange} value={this.state.city} />
                                        </div>
                                      </MDBCol>
                                    </MDBRow>
                                  </form>
                                </MDBCardBody>
                              </MDBCard>
                            </MDBCol>
                            <MDBCol md="4" className="mb-4">
                              <MDBCard className="mb-4 imageUpload">
                                <MDBCol>
                                  <img className="camera-img" alt="" src={uploa} />
                                </MDBCol>
                                <input
                                  type="file"
                                  label="Image"
                                  name="image"
                                  accept=".jpeg, .png, .jpg"
                                  onChange={(e) => this.handleFileRead(e)}
                                  id="image"
                                  value={this.base64}
                                />
                                <MDBCardHeader className="py-3">
                                  <MDBTypography tag="h5" className="mb-0">Company's Upload logo</MDBTypography>
                                </MDBCardHeader>
                              </MDBCard>
                            </MDBCol>
                          </MDBRow>
                          <div className="d-flex justify-content-center">
                            <MDBRow className="mb-4">
                              <MDBCol>
                                <MDBBtn>cancel</MDBBtn>
                              </MDBCol>
                              <MDBCol>
                                <MDBBtn onClick={this.handleSubmit}>save</MDBBtn>
                              </MDBCol>
                              <MDBCol>
                                <MDBBtn onClick={this.togglebuttonCommu}>next</MDBBtn>
                              </MDBCol>
                            </MDBRow>
                          </div>
                        </div>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
              {commu && (
                <div class="container-fluid">
                  <MDBTypography tag="h5" className="mb-0 info">Communication Detail</MDBTypography>
                  <br />
                  <MDBRow>
                    <MDBCol md="12" className="mb-12">
                      <MDBCard className="mb-12">
                        <div class="container-fluid">
                          <form>
                            <label >FinanceSpoc</label>
                            <MDBRow className="mb-4">
                              <MDBCol>
                                <label >Contactname*</label>
                                <input type="text" className="mb-4" name="financeSpoccontactName" id="financeSpoccontactName" onChange={this.formValChange} value={financeSpoccontactName} />
                              </MDBCol>
                              <MDBCol>
                                <label>Designation*</label>
                                <input type="text" className="mb-4" name="financeSpocdesignation" id="financeSpocdesignation" onChange={this.formValChange} value={financeSpocdesignation} />
                              </MDBCol>
                              <MDBCol>
                                <label >phoneNo*</label>
                                <input type="text" className="mb-4" name="financeSpocphoneNo" id="financeSpocphoneNo" onChange={this.formValChange} value={financeSpocphoneNo} />
                              </MDBCol>
                              <MDBCol>
                                <label >email*</label>
                                <input type="text" className="mb-4" name="financeSpocemail" id="financeSpocemail" onChange={this.formValChange} value={financeSpocemail} />
                              </MDBCol>
                            </MDBRow>
                            <label >Operation Spoc</label>
                            <MDBRow className="mb-4">
                              <MDBCol>
                                <label >Contactname*</label>
                                <input type="text" className="mb-4" name="operationSpoccontactName" id="operationSpoccontactName" onChange={this.formValChange} value={operationSpoccontactName} />
                              </MDBCol>
                              <MDBCol>
                                <label>Designation*</label>
                                <input type="text" className="mb-4" name="operationSpocdesignation" id="operationSpocdesignation" onChange={this.formValChange} value={operationSpocdesignation} />
                              </MDBCol>
                              <MDBCol>
                                <label >phoneNo*</label>
                                <input type="text" className="mb-4" name="operationSpocphoneNo" id="operationSpocphoneNo" onChange={this.formValChange} value={operationSpocphoneNo} />
                              </MDBCol>
                              <MDBCol>
                                <label >email*</label>
                                <input type="text" className="mb-4" name="operationSpocemail" id="operationSpocemail" onChange={this.formValChange} value={operationSpocemail} />
                              </MDBCol>
                            </MDBRow>
                            <label >Collection Spoc</label>
                            <MDBRow className="mb-4">
                              <MDBCol>
                                <label >Contactname*</label>
                                <input type="text" className="mb-4" name="collectionSpoccontactName" id="collectionSpoccontactName" onChange={this.formValChange} value={collectionSpoccontactName} />
                              </MDBCol>
                              <MDBCol>
                                <label>Designation*</label>
                                <input type="text" className="mb-4" name="collectionSpocdesignation" id="collectionSpocdesignation" onChange={this.formValChange} value={collectionSpocdesignation} />
                              </MDBCol>
                              <MDBCol>
                                <label >phoneNo*</label>
                                <input type="text" className="mb-4" name="collectionSpocphoneNo" id="collectionSpocphoneNo" onChange={this.formValChange} value={collectionSpocphoneNo} />
                              </MDBCol>
                              <MDBCol>
                                <label >email*</label>
                                <input type="text" className="mb-4" name="collectionSpocemail" id="collectionSpocemail" onChange={this.formValChange} value={collectionSpocemail} />
                              </MDBCol>
                            </MDBRow>
                            <label >Management Spoc</label>
                            <MDBRow className="mb-4">
                              <MDBCol>
                                <label >Contactname*</label>
                                <input type="text" className="mb-4" name="managementSpoccontactName" id="managementSpoccontactName" onChange={this.formValChange} value={managementSpoccontactName} />
                              </MDBCol>
                              <MDBCol>
                                <label>Designation*</label>
                                <input type="text" className="mb-4" name="managementSpocdesignation" id="managementSpocdesignation" onChange={this.formValChange} value={managementSpocdesignation} />
                              </MDBCol>
                              <MDBCol>
                                <label >phoneNo*</label>
                                <input type="text" className="mb-4" name="managementSpocphoneNo" id="managementSpocphoneNo" onChange={this.formValChange} value={managementSpocphoneNo} />
                              </MDBCol>
                              <MDBCol>
                                <label >email*</label>
                                <input type="text" className="mb-4" name="managementSpocemail" id="managementSpocemail" onChange={this.formValChange} value={managementSpocemail} />
                              </MDBCol>
                            </MDBRow>
                            <label >others</label>
                            <MDBRow className="mb-4">
                              <MDBCol>
                                <label >Contactname*</label>
                                <input type="text" className="mb-4" name="contactName" id="contactName" onChange={this.formValChange} value={contactName} />
                              </MDBCol>
                              <MDBCol>
                                <label>Designation*</label>
                                <input type="text" className="mb-4" name="designation" id="designation" onChange={this.formValChange} value={designation} />
                              </MDBCol>
                              <MDBCol>
                                <label >phoneNo*</label>
                                <input type="text" className="mb-4" name="phoneNo" id="phoneNo" onChange={this.formValChange} value={phoneNo} />
                              </MDBCol>
                              <MDBCol>
                                <label >email*</label>
                                <input type="text" className="mb-4" name="email" id="email" onChange={this.formValChange} value={email} />
                              </MDBCol>
                            </MDBRow>
                            <div className="d-flex justify-content-center">
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <MDBBtn>cancel</MDBBtn>
                                </MDBCol>
                                <MDBCol>
                                  <MDBBtn onClick={this.handleSubmitComDetail}>save</MDBBtn>
                                </MDBCol>
                                <MDBCol>
                                  <MDBBtn>next</MDBBtn>
                                </MDBCol>
                              </MDBRow>
                            </div>
                          </form>
                        </div>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Basic;