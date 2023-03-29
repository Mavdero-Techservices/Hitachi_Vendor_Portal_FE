import React from "react";
import "../css/Basic.css";
import uploa from "../img/camera-plus.png";
import Navbar1 from "../common/navbar.js";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";
import withRouter from "../component/withRouter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCheckbox,
  MDBCol,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
export class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      companyName: "",
      image: "",
      financeSpoccontactName: "",
      financeSpocdesignation: "",
      financeSpocphoneNo: "",
      financeSpocemail: "",
      operationSpoccontactName: "",
      operationSpocdesignation: "",
      operationSpocphoneNo: "",
      operationSpocemail: "",
      collectionSpoccontactName: "",
      collectionSpocdesignation: "",
      collectionSpocphoneNo: "",
      collectionSpocemail: "",
      managementSpoccontactName: "",
      managementSpocdesignation: "",
      managementSpocphoneNo: "",
      managementSpocemail: "",
      contactName: "",
      designation: "",
      phoneNo: "",
      email: "",
      mastervendor_email: "",
      open: true,
      commu: false,
      edit: true,
      editStatutory: "",
      savebutton: true,
      commuDetail: false,
    };

    console.log("commuDetail------->", this.state.commuDetail);

    this.savebutton = this.savebutton.bind(this);
    this.togglebutton = this.togglebutton.bind(this);
    this.togglebuttonCommu = this.togglebuttonCommu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  savebutton() {
    this.setState({
      savebutton: false,
    });
  }

  mouseEnter(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.setState({ pinCode: e.target.value });
  }
  mouseOut(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.setState({ pinCode: e.target.value });
    apiService
      .getStateAndcityByzipcode(this.state.country, this.state.pinCode)
      .then((response) => {
        this.setState({ getCityAndState: response.data.data.postalcodes[0] });
        this.setState({ state: response.data.data.postalcodes[0].adminName1 });
        this.setState({ city: response.data.data.postalcodes[0].adminName3 });
      });
  }
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
    // this.handleSubmitComDetail();
  }
  next = (e) => {
    e.preventDefault();
    if (this.state.editStatutory.length <= 0 || "" || undefined) {
      this.handleSubmit(e);
      this.props.navigate("/statutory");
    } else {
      this.props.navigate(`/statutory/${this.props.params.userId}`);
    }
  };

  cancelBasicInfo = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "Yes",
      showCloseButton: true,
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({
          address1: "",
          address2: "",
          city: "",
          state: "",
          country: "",
          pinCode: "",
          companyName: "",
          image: "",
        });
      }
    });
  };
  cancelCommunicationInfo = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "OK",
    }).then((ClearData) => {
      this.setState({
        financeSpoccontactName: "",
        financeSpocdesignation: "",
        financeSpocphoneNo: "",
        financeSpocemail: "",
        operationSpoccontactName: "",
        operationSpocdesignation: "",
        operationSpocphoneNo: "",
        operationSpocemail: "",
        collectionSpoccontactName: "",
        collectionSpocdesignation: "",
        collectionSpocphoneNo: "",
        collectionSpocemail: "",
        managementSpoccontactName: "",
        managementSpocdesignation: "",
        managementSpocphoneNo: "",
        managementSpocemail: "",
        contactName: "",
        designation: "",
        phoneNo: "",
        email: "",
        mastervendor_email: "",
      });
    });
  };
  handleChange(e) {
    this.setState({ country: e.target.value });
  }
  formValChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    // e.preventDefault();
    const basicInfo = {
      // id: this.state.id,
      userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      pinCode: this.state.pinCode,
      companyName: this.state.companyName,
      image: this.state.image,
    };
    if (this.props.params.userId) {
      apiService
        .updateVendordetail(this.props.params.userId, basicInfo)
        .then((response) => {
          if (response) {
            Swal.fire({
              title: "Data Updated",
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
      if (this.props.params.newReg) {
        apiService.saveNewRegVendordetail(basicInfo).then((response) => {
          this.setState({
            savebutton: true,
          });
          this.setState({ newUser: response.data.result.userId });
          let data = { newregUser: response.data.result.userId };
          sessionStorage.setItem("newregUser", JSON.stringify(data));
          if (response) {
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
      } else {
        apiService.saveVendordetail(basicInfo).then((response) => {
          this.setState({
            savebutton: true,
          });
          if (response) {
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
    }
  };
  updatehandleSubmit = (e) => {
    e.preventDefault();
    const basicInfo = {
      // id: this.state.id,
      userId: this.props.params.userId,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      pinCode: this.state.pinCode,
      companyName: this.state.companyName,
      image: this.state.image,
    };
    if (this.props.params.userId) {
      apiService
        .updateVendordetail(this.props.params.userId, basicInfo)
        .then((response) => {
          if (response) {
            Swal.fire({
              title: "Data Updated",
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

  handleSubmitComDetail = (e) => {
    // e.preventDefault();
    const communicationDetails = {
      userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
      financeSpoccontactName: this.state.financeSpoccontactName,
      financeSpocdesignation: this.state.financeSpocdesignation,
      financeSpocphoneNo: this.state.financeSpocphoneNo,
      financeSpocemail: this.state.financeSpocemail,
      operationSpoccontactName: this.state.operationSpoccontactName,
      operationSpocdesignation: this.state.operationSpocdesignation,
      operationSpocphoneNo: this.state.operationSpocphoneNo,
      operationSpocemail: this.state.operationSpocemail,
      collectionSpoccontactName: this.state.collectionSpoccontactName,
      collectionSpocdesignation: this.state.collectionSpocdesignation,
      collectionSpocphoneNo: this.state.collectionSpocphoneNo,
      collectionSpocemail: this.state.collectionSpocemail,
      managementSpoccontactName: this.state.managementSpoccontactName,
      managementSpocdesignation: this.state.managementSpocdesignation,
      managementSpocphoneNo: this.state.managementSpocphoneNo,
      managementSpocemail: this.state.managementSpocemail,
      contactName: this.state.contactName,
      designation: this.state.designation,
      phoneNo: this.state.phoneNo,
      email: this.state.email,
      mastervendor_email: this.state.mastervendor_email,
    };
    if (this.props.params.userId) {
      if (this.state.commuDetail) {
        apiService
          .updateCommunicationdetail(
            this.props.params.userId,
            communicationDetails
          )
          .then((response) => {
            if (response) {
              Swal.fire({
                title: "Data Updated",
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
        apiService
          .SaveVendorCommunication(communicationDetails)
          .then((response) => {
            this.setState({
              savebutton: true,
            });
            if (response.data.msg === "success") {
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
    } else {
      let newuser = JSON.parse(
        window.sessionStorage.getItem("newregUser")
      )?.newregUser;
      if (newuser) {
        communicationDetails.userId = newuser;
        apiService
          .SaveVendorCommunication(communicationDetails)
          .then((response) => {
            this.setState({
              savebutton: true,
            });
            if (response.data.msg === "success") {
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
      } else {
        apiService
          .SaveVendorCommunication(communicationDetails)
          .then((response) => {
            this.setState({
              savebutton: true,
            });
            if (response.data.msg === "success") {
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
    }
  };
  updatehandleSubmitComDetail = (e) => {
    e.preventDefault();
    const communicationDetails = {
      userId: this.props.params.userId,
      financeSpoccontactName: this.state.financeSpoccontactName,
      financeSpocdesignation: this.state.financeSpocdesignation,
      financeSpocphoneNo: this.state.financeSpocphoneNo,
      financeSpocemail: this.state.financeSpocemail,
      operationSpoccontactName: this.state.operationSpoccontactName,
      operationSpocdesignation: this.state.operationSpocdesignation,
      operationSpocphoneNo: this.state.operationSpocphoneNo,
      operationSpocemail: this.state.operationSpocemail,
      collectionSpoccontactName: this.state.collectionSpoccontactName,
      collectionSpocdesignation: this.state.collectionSpocdesignation,
      collectionSpocphoneNo: this.state.collectionSpocphoneNo,
      collectionSpocemail: this.state.collectionSpocemail,
      managementSpoccontactName: this.state.managementSpoccontactName,
      managementSpocdesignation: this.state.managementSpocdesignation,
      managementSpocphoneNo: this.state.managementSpocphoneNo,
      managementSpocemail: this.state.managementSpocemail,
      contactName: this.state.contactName,
      designation: this.state.designation,
      phoneNo: this.state.phoneNo,
      email: this.state.email,
      mastervendor_email: this.state.mastervendor_email,
    };
    if (this.props.params.userId) {
      // "aravinth"
      if (this.state.commuDetail) {
        apiService
          .updateCommunicationdetail(
            this.props.params.userId,
            communicationDetails
          )
          .then((response) => {
            if (response) {
              Swal.fire({
                title: "Data Updated",
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
        apiService
          .SaveVendorCommunication(communicationDetails)
          .then((response) => {
            this.setState({
              savebutton: true,
            });
            if (response.data.msg === "success") {
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
    }
  };
  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await this.convertBase64(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = this.onreaderLoad.bind(this);
      reader.readAsBinaryString(file);
    }
  };
  onreaderLoad = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    this.setState({
      image: btoa(binaryString),
    });
  };

  updateVendordetail(userId, data) {
    apiService.updateVendordetail(userId, data).then((response) => {});
  }
  componentDidMount() {
    let userid = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId;
    apiService.signupFindByUserId(userid).then((res) => {
      this.setState({ approval: res.data.result.role });
      this.setState({ companyName: res.data.result.companyName });
      this.setState({ vendorId: res.data.result.vendorId });
    });

    let newuser = JSON.parse(
      window.sessionStorage.getItem("newregUser")
    )?.newregUser;
    if (this.props.params.newReg === "newReg") {
      this.setState({
        companyName: JSON.parse(window.sessionStorage.getItem("jwt")).result
          .companyName,
      });
      this.setState({
        approval: JSON.parse(window.sessionStorage.getItem("jwt")).result.role,
      });
    }
    // let userid = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId;
    // apiService.getAllCollection(userid).then((res) => {
    //   this.setState({ companyName: res.data.basicInfo[0].companyName });
    //   if (this.props.params.userId) {
    //     this.setState({ id: res.data.basicInfo[0].id });
    //   }
    // });
    apiService.signupFindByUserId(userid).then((res) => {
      this.setState({ approval: res.data.result.role });
      this.setState({ companyName: res.data.result.companyName });
      this.setState({ vendorId: res.data.result.vendorId });
    });

    if (this.props.params.userId) {
      this.edit = true;
      let finalstatus = "";
      apiService.signupFindByUserId(this.props.params.userId).then((res) => {
        finalstatus = res.data.result.finalStatus;
        console.log("finalstatus", finalstatus);
      });
      apiService.getAllCollection(this.props.params.userId).then((res) => {
        if (
          res.data.basicInfo[0].submitStatus === "Submitted" &&
          finalstatus !== "Approved"
        ) {
          this.setState({ setStyle: "notEditable" });
        }
        this.setState({
          editStatutory: res.data.Statutory,
        });
        Object.entries(res.data.basicInfo).map(([key, value]) => {
          this.setState({
            companyName: value.companyName,
            address1: value.address1,
            address2: value.address2,
            city: value.city,
            state: value.state,
            country: value.country,
            pinCode: value.pinCode,
            image: value.image,
          });
        });
        console.log(
          "commuDetail2222",
          res.data.CommunicationDetails.length,
          res.data.CommunicationDetails
        );
        Object.entries(res.data.CommunicationDetails).map(([key, value]) => {
          this.setState({
            commuDetail:
              res.data.CommunicationDetails.length > 0 ? true : false,
          });
          this.setState({
            financeSpoccontactName: value.financeSpoccontactName,
            financeSpocdesignation: value.financeSpocdesignation,
            financeSpocphoneNo: value.financeSpocphoneNo,
            financeSpocemail: value.financeSpocemail,
            operationSpoccontactName: value.operationSpoccontactName,
            operationSpocdesignation: value.operationSpocdesignation,
            operationSpocphoneNo: value.operationSpocphoneNo,
            operationSpocemail: value.operationSpocemail,
            collectionSpoccontactName: value.collectionSpoccontactName,
            collectionSpocdesignation: value.collectionSpocdesignation,
            collectionSpocphoneNo: value.collectionSpocphoneNo,
            collectionSpocemail: value.collectionSpocemail,
            managementSpoccontactName: value.managementSpoccontactName,
            managementSpocdesignation: value.managementSpocdesignation,
            managementSpocphoneNo: value.managementSpocphoneNo,
            managementSpocemail: value.managementSpocemail,
            contactName: value.contactName,
            designation: value.designation,
            phoneNo: value.phoneNo,
            email: value.email,
            mastervendor_email: value.mastervendor_email,
          });
        });
      });
    } else if (newuser) {
      this.edit = true;
      apiService.getAllCollection(newuser).then((res) => {
        this.setState({
          editStatutory: res.data.Statutory,
        });
        Object.entries(res.data.basicInfo).map(([key, value]) => {
          this.setState({
            companyName: value.companyName,
            address1: value.address1,
            address2: value.address2,
            city: value.city,
            state: value.state,
            country: value.country,
            pinCode: value.pinCode,
            image: value.image,
          });
        });
        Object.entries(res.data.CommunicationDetails).map(([key, value]) => {
          this.setState({
            financeSpoccontactName: value.financeSpoccontactName,
            financeSpocdesignation: value.financeSpocdesignation,
            financeSpocphoneNo: value.financeSpocphoneNo,
            financeSpocemail: value.financeSpocemail,
            operationSpoccontactName: value.operationSpoccontactName,
            operationSpocdesignation: value.operationSpocdesignation,
            operationSpocphoneNo: value.operationSpocphoneNo,
            operationSpocemail: value.operationSpocemail,
            collectionSpoccontactName: value.collectionSpoccontactName,
            collectionSpocdesignation: value.collectionSpocdesignation,
            collectionSpocphoneNo: value.collectionSpocphoneNo,
            collectionSpocemail: value.collectionSpocemail,
            managementSpoccontactName: value.managementSpoccontactName,
            managementSpocdesignation: value.managementSpocdesignation,
            managementSpocphoneNo: value.managementSpocphoneNo,
            managementSpocemail: value.managementSpocemail,
            contactName: value.contactName,
            designation: value.designation,
            phoneNo: value.phoneNo,
            email: value.email,
            mastervendor_email: value.mastervendor_email,
          });
        });
      });
    } else {
      this.edit = false;
    }
    apiService.getCountry().then((response) => {
      this.setState({ countryData: response.data.data });
    });
    apiService
      .getStateAndcityByzipcode(this.state.country, this.state.pinCode)
      .then((response) => {
        this.setState({ getCityAndState: response.data.postalcodes });
      });
  }
  render() {
    const {
      vendorId,
      address1,
      address2,
      city,
      state,
      country,
      pinCode,
      contactName,
      companyName,
      image,
      open,
      commu,
    } = this.state;
    let countriesList =
      this.state.countryData?.length > 0 &&
      this.state.countryData?.map((item, i) => {
        return (
          <option className="mb-4" key={i} value={item.code}>
            {item.name}
          </option>
        );
      }, this);
    const {
      financeSpocdesignation,
      financeSpoccontactName,
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
      email,
      mastervendor_email,
    } = this.state;
    return (
      <>
        <div className="vendor-det">
          <Navbar1 />
          <div class="container-fluid ribbonMain">
            <div
              class="ribbon basic-information-label left"
              onClick={this.togglebutton}
            >
              {" "}
              <span className={open ? "dotActive" : "dotInActive"}></span>
              <label className="labelName">Basic information</label>
            </div>
            <div
              class="ribbon basic-information-label right"
              onClick={this.togglebuttonCommu}
            >
              <span className={commu ? "dotActive" : "dotInActive"}></span>
              <label className="labelName">communication Details</label>
            </div>
          </div>
          <div class="container">
            <div className="mx-auto mt-5">
              {open && (
                <div class="container-fluid">
                  <MDBTypography tag="h5" className="mb-0 info">
                    Basic information
                  </MDBTypography>
                  <br />
                  <MDBRow>
                    <MDBCol md="12" className="mb-12 g">
                      <MDBCard className="mb-12">
                        <div class="container-fluid">
                          <MDBRow>
                            <MDBCol md="8" className="mb-4">
                              <MDBCard className="mb-4 basic">
                                <MDBCardBody>
                                  <form className={this.state.setStyle}>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="companyName">
                                            Company Name*
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            type="text"
                                            className="mb-4 VendorInputCompanyName"
                                            name="companyName"
                                            id="companyName"
                                            onChange={this.formValChange}
                                            value={companyName}
                                          />
                                        </div>
                                      </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          {" "}
                                          <label htmlFor="address1">
                                            Address line - 1*
                                          </label>
                                        </div>
                                        <div>
                                          <textarea
                                            type="text"
                                            className="addressLine"
                                            name="address1"
                                            id="address1"
                                            onChange={this.formValChange}
                                            value={address1}
                                            disabled={
                                              this.state.setStyle ===
                                              "notEditable"
                                                ? true
                                                : false
                                            }
                                          ></textarea>
                                        </div>
                                      </MDBCol>
                                    </MDBRow>
                                    <div>
                                      <label htmlFor="address2">
                                        Address line - 2
                                      </label>
                                    </div>
                                    <div>
                                      <textarea
                                        type="text"
                                        className="addressLine"
                                        name="address2"
                                        id="address2"
                                        onChange={this.formValChange}
                                        value={address2}
                                        disabled={
                                          this.state.setStyle === "notEditable"
                                            ? true
                                            : false
                                        }
                                      ></textarea>
                                    </div>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="country">
                                            Country*
                                          </label>
                                        </div>
                                        <div>
                                          <select
                                            className="mb-4 VendorInput"
                                            name="country"
                                            id="country"
                                            value={this.state.country}
                                            onChange={this.handleChange}
                                            disabled={
                                              this.state.setStyle ===
                                              "notEditable"
                                                ? true
                                                : false
                                            }
                                          >
                                            {countriesList}
                                          </select>
                                        </div>
                                      </MDBCol>
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="pinCode">
                                            Pincode*
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            type="text"
                                            className="mb-4 VendorInput"
                                            name="pinCode"
                                            id="pinCode"
                                            value={pinCode}
                                            onMouseLeave={this.mouseOut}
                                            onChange={this.mouseEnter}
                                          />
                                        </div>
                                      </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="state">State*</label>
                                        </div>
                                        <div>
                                          <input
                                            type="text"
                                            className="mb-4 VendorInput"
                                            name="state"
                                            id="state"
                                            onChange={this.formValChange}
                                            value={this.state.state}
                                          />
                                        </div>
                                      </MDBCol>
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="city">City*</label>
                                        </div>
                                        <div>
                                          <input
                                            type="text"
                                            className="mb-4 VendorInput"
                                            name="city"
                                            id="city"
                                            onChange={this.formValChange}
                                            value={this.state.city}
                                          />
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
                                  {this.state.image != "" ||
                                  undefined ||
                                  null ? (
                                    <div>
                                      <img
                                        className="camera-img"
                                        src={
                                          "data:image/png;base64," +
                                          `${this.state.image}`
                                        }
                                        alt=""
                                      />
                                    </div>
                                  ) : (
                                    <div>
                                      {" "}
                                      <img
                                        className="camera-img"
                                        alt=""
                                        src={uploa}
                                      />
                                    </div>
                                  )}
                                  {/* <img className="camera-img" alt="" src={uploa} /> */}
                                </MDBCol>
                                <input
                                  type="file"
                                  label="Image"
                                  name="image"
                                  accept=".jpeg, .png, .jpg"
                                  onChange={(e) => this.handleFileRead(e)}
                                  id="image"
                                  value={this.base64}
                                  className="mb-4 VendorInput"
                                  disabled={
                                    this.state.setStyle === "notEditable"
                                      ? true
                                      : false
                                  }
                                />
                                <MDBCardHeader className="py-3">
                                  <MDBTypography tag="h5" className="mb-0">
                                    Company's Upload logo
                                  </MDBTypography>
                                </MDBCardHeader>
                              </MDBCard>
                            </MDBCol>
                          </MDBRow>
                          <div className="d-flex justify-content-center">
                            <MDBRow className="mb-4">
                              <div className={this.state.setStyle}>
                                <button
                                  type="button"
                                  onClick={this.cancelBasicInfo}
                                  className="btn basicbtn btn-primary btn-md m-3"
                                >
                                  Cancel
                                </button>
                                {this.props.params.userId &&
                                JSON.parse(window.sessionStorage.getItem("jwt"))
                                  .result.role === "Admin" ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={this.updatehandleSubmit}
                                      className="btn basicbtn btn-md m-3"
                                    >
                                      {" "}
                                      Update
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    {this.state.savebutton === true ? (
                                      <>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            this.handleSubmit();
                                            this.savebutton();
                                          }}
                                          className="btn basicbtn btn-primary btn-md m-3"
                                        >
                                          Save
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        type="button"
                                        disabled
                                        className="btn basicbtn btn-primary btn-md m-3"
                                      >
                                        Save
                                      </button>
                                    )}
                                  </>
                                )}

                                <button
                                  type="button"
                                  onClick={this.togglebuttonCommu}
                                  className="btn basicbtn btn-primary btn-md m-3"
                                >
                                  Next
                                </button>
                              </div>
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
                  <MDBTypography tag="h5" className="mb-0 info">
                    Communication Details*
                  </MDBTypography>
                  <br />
                  <MDBRow>
                    <MDBCol md="12" className="mb-12">
                      <MDBCard className="mb-12">
                        <div class="container-fluid">
                          <form>
                            <form className={this.state.setStyle}>
                              <label className="fieldHeader">
                                Finance Spoc
                                <span className="mandatoryField">*</span>
                              </label>
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <label>Contact name</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="financeSpoccontactName"
                                    id="financeSpoccontactName"
                                    onChange={this.formValChange}
                                    value={financeSpoccontactName}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Designation</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="financeSpocdesignation"
                                    id="financeSpocdesignation"
                                    onChange={this.formValChange}
                                    value={financeSpocdesignation}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Phone No</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="financeSpocphoneNo"
                                    id="financeSpocphoneNo"
                                    onChange={this.formValChange}
                                    value={financeSpocphoneNo}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Email*</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="financeSpocemail"
                                    id="financeSpocemail"
                                    onChange={this.formValChange}
                                    value={financeSpocemail}
                                  />
                                </MDBCol>
                              </MDBRow>
                              <label className="fieldHeader">
                                Operation Spoc
                              </label>
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <label>Contact name</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="operationSpoccontactName"
                                    id="operationSpoccontactName"
                                    onChange={this.formValChange}
                                    value={operationSpoccontactName}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Designation</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="operationSpocdesignation"
                                    id="operationSpocdesignation"
                                    onChange={this.formValChange}
                                    value={operationSpocdesignation}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Phone No</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="operationSpocphoneNo"
                                    id="operationSpocphoneNo"
                                    onChange={this.formValChange}
                                    value={operationSpocphoneNo}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="operationSpocemail"
                                    id="operationSpocemail"
                                    onChange={this.formValChange}
                                    value={operationSpocemail}
                                  />
                                </MDBCol>
                              </MDBRow>
                              <label className="fieldHeader">
                                Collection Spoc
                              </label>
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <label>Contact name</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="collectionSpoccontactName"
                                    id="collectionSpoccontactName"
                                    onChange={this.formValChange}
                                    value={collectionSpoccontactName}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Designation</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="collectionSpocdesignation"
                                    id="collectionSpocdesignation"
                                    onChange={this.formValChange}
                                    value={collectionSpocdesignation}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Phone No</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="collectionSpocphoneNo"
                                    id="collectionSpocphoneNo"
                                    onChange={this.formValChange}
                                    value={collectionSpocphoneNo}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="collectionSpocemail"
                                    id="collectionSpocemail"
                                    onChange={this.formValChange}
                                    value={collectionSpocemail}
                                  />
                                </MDBCol>
                              </MDBRow>
                              <label className="fieldHeader">
                                Management Spoc
                                <span className="mandatoryField">*</span>
                              </label>
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <label>Contact name</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="managementSpoccontactName"
                                    id="managementSpoccontactName"
                                    onChange={this.formValChange}
                                    value={managementSpoccontactName}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Designation</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="managementSpocdesignation"
                                    id="managementSpocdesignation"
                                    onChange={this.formValChange}
                                    value={managementSpocdesignation}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Phone No</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="managementSpocphoneNo"
                                    id="managementSpocphoneNo"
                                    onChange={this.formValChange}
                                    value={managementSpocphoneNo}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="managementSpocemail"
                                    id="managementSpocemail"
                                    onChange={this.formValChange}
                                    value={managementSpocemail}
                                  />
                                </MDBCol>
                              </MDBRow>
                              <label className="fieldHeader">others</label>
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <label>Contact name</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="contactName"
                                    id="contactName"
                                    onChange={this.formValChange}
                                    value={contactName}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Designation</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="designation"
                                    id="designation"
                                    onChange={this.formValChange}
                                    value={designation}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Phone No</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="phoneNo"
                                    id="phoneNo"
                                    onChange={this.formValChange}
                                    value={phoneNo}
                                  />
                                </MDBCol>
                                <MDBCol>
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="email"
                                    id="email"
                                    onChange={this.formValChange}
                                    value={email}
                                  />
                                </MDBCol>
                              </MDBRow>
                              {this.state.approval === "Admin" ? (
                                ""
                              ) : (
                                <MDBRow>
                                  <MDBCol>
                                    <label className="fieldHeader">
                                      Master vendor email id
                                      <span className="mandatoryField">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="mb-4 VendorInput"
                                      name="mastervendor_email"
                                      id="mastervendor_email"
                                      onChange={this.formValChange}
                                      value={mastervendor_email}
                                    />
                                  </MDBCol>
                                  <MDBCol></MDBCol>
                                  <MDBCol></MDBCol>
                                </MDBRow>
                              )}
                              <div className="d-flex justify-content-center">
                                <MDBRow className="mb-4">
                                  <div className={this.state.setStyle}>
                                    <button
                                      type="button"
                                      onClick={this.cancelCommunicationInfo}
                                      className="btn basicbtn btn-primary btn-md m-3"
                                    >
                                      Cancel
                                    </button>
                                    {this.props.params.userId &&
                                    JSON.parse(
                                      window.sessionStorage.getItem("jwt")
                                    ).result.role === "Admin" ? (
                                      <>
                                        <button
                                          type="button"
                                          onClick={
                                            this.updatehandleSubmitComDetail
                                          }
                                          className="btn basicbtn btn-primary btn-md m-3"
                                        >
                                          Update
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        {this.state.savebutton === true ? (
                                          <>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                this.handleSubmitComDetail();
                                                this.savebutton();
                                              }}
                                              className="btn basicbtn btn-primary btn-md m-3"
                                            >
                                              Save
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              type="button"
                                              disabled
                                              className="btn basicbtn btn-primary btn-md m-3"
                                            >
                                              Save
                                            </button>
                                          </>
                                        )}
                                      </>
                                    )}
                                    <button
                                      type="button"
                                      onClick={this.next}
                                      className="btn basicbtn btn-primary btn-md m-3"
                                    >
                                      Next
                                    </button>
                                  </div>
                                </MDBRow>
                              </div>
                            </form>
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
    );
  }
}

export default withRouter(Basic);
