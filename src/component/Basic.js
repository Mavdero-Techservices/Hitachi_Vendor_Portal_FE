import React from "react";
import "../css/Basic.css";
import uploa from "../img/upload.png";
import Navbar1 from "../common/navbar.js";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
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
    //   this.stateCommu = {
    // financeSpoccontactName:'',
    // financeSpocdesignation:'',
    // financeSpocphoneNo:'',
    // financeSpocemail:'',
    // operationSpoccontactName:'',
    // operationSpocdesignation:'',
    // operationSpocphoneNo:'',
    // operationSpocemail:'',
    // collectionSpoccontactName:'',
    // collectionSpocdesignation:'',
    // collectionSpocphoneNo:'',
    // collectionSpocemail:'',
    // managementSpoccontactName:'',
    // managementSpocdesignation:'',
    // managementSpocphoneNo:'', 
    // managementSpocemail:'',
    // ocontactName:'',
    // designation:'', 
    // phoneNo:'',
    // email: '',
    //     open: true,
    //     commu:false
    // }
    this.togglebutton = this.togglebutton.bind(this);
    this.togglebuttonCommu = this.togglebuttonCommu.bind(this);
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
            title: "data submitted successfully",
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
            title: "data submitted successfully",
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
  componentDidMount() {
  }
  render() {
    const { vendorId, address1, address2, city, state, country, pinCode, contactName, companyName, image, open, commu } = this.state;
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
        {/* <div className="basicinformation-div9">
      <div class="ribbon basic-information-label left" onClick={this.togglebutton}><label className='labelName'>Basic information</label></div>
      <div class="ribbon basic-information-label right" onClick={this.togglebuttonCommu}><label className='labelName'>communication Details</label></div>
      </div> */}
        <div className="vendor-det">
          <Navbar1 />
          <div class="container-fluid ribbonMain">
            <div class="ribbon basic-information-label left" onClick={this.togglebutton}> <div class="container-fluid"> <span className={open ? 'dotActive' : 'dotInActive'}></span><label className='labelName'>Basic information</label></div></div>
            <div class="ribbon basic-information-label right" onClick={this.togglebuttonCommu}><div class="container-fluid"><span className={commu ? 'dotActive' : 'dotInActive'}></span><label className='labelName'>communication Details</label></div></div>
          </div>
          <div class="container-fluid">
            <div className="mx-auto mt-5" >
              {open && (
                <div class="container-fluid">
                  <MDBTypography tag="h5" className="mb-0">Basic information</MDBTypography>
                  <br />
                  <MDBRow>
                    <MDBCol md="12" className="mb-12">
                      <MDBCard className="mb-12">
                        <div class="container-fluid">
                          <MDBRow>
                            <MDBCol md="8" className="mb-4">
                              <MDBCard className="mb-4 basic">
                                <MDBCardBody>
                                  <form>
                                    <label htmlFor="companyName">Company Name*</label>
                                    <input type="text" className="mb-4" name="companyName" id="companyName" onChange={this.formValChange} value={companyName} />
                                    <label htmlFor="address1">Address line - 1*</label>
                                    <input type="text" className="mb-4" name="address1" id="address1" onChange={this.formValChange} value={address1} />
                                    <label htmlFor="address2">Address line - 2*</label>
                                    <input type="text" className="mb-4" name="address2" id="address2" onChange={this.formValChange} value={address2} />
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <label htmlFor="country">Country*</label>
                                        <input type="text" className="mb-4" name="country" id="country" onChange={this.formValChange} value={country} />
                                      </MDBCol>
                                      <MDBCol>
                                        <label htmlFor="state">State*</label>
                                        <input type="text" className="mb-4" name="state" id="state" onChange={this.formValChange} value={state} />
                                      </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <label htmlFor="city">City*</label>
                                        <input type="text" className="mb-4" name="city" id="city" onChange={this.formValChange} value={city} />
                                      </MDBCol>
                                      <MDBCol>
                                        <label htmlFor="pinCode">Pincode*</label>
                                        <input type="text" className="mb-4" name="pinCode" id="pinCode" onChange={this.formValChange} value={pinCode} />
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
                                  </form>
                                </MDBCardBody>
                              </MDBCard>
                            </MDBCol>
                            <MDBCol md="4" className="mb-4">
                              <MDBCard className="mb-4 imageUpload">
                                <label htmlFor="file-input">
                                  <img src={uploa} alt="" />
                                </label>

                                <MDBInput type="file" name="image" accept=".jpeg, .png, .jpg" className="mb-4" value={image} />
                                <MDBCardHeader className="py-3">
                                  <MDBTypography tag="h5" className="mb-0">Company's Upload logo</MDBTypography>
                                </MDBCardHeader>
                              </MDBCard>
                            </MDBCol>
                          </MDBRow>
                        </div>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
              {commu && (
                <div class="container-fluid">
                  <MDBTypography tag="h5" className="mb-0">Communication Detail</MDBTypography>
                  <br />
                  <MDBRow>
                    <MDBCol md="12" className="mb-12">
                      <MDBCard className="mb-12">
                        <div class="container-fluid">
                          <form>
                            <label >Finance Spoc</label>
                            <MDBRow className="mb-4">
                              <MDBCol>
                                <label >Contact name*</label>
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
                                <label >Contact name*</label>
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
                                <label >Contact name*</label>
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
                                <label >Contact name*</label>
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
                                <label >Contact name*</label>
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