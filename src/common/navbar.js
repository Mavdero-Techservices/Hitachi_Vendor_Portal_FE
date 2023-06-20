import Logo1 from "../img/logo1.png";
import "../css/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import auth from "../auth/auth-helper";
import {useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/api.service";
import { Navigate } from "react-router-dom";
function App() {
  const response = JSON.parse(window.sessionStorage.getItem("newregUser"));
  const hasValue = response?.newregUser !== undefined && response?.newregUser !== null;
  const [hasmaster, sethasmaster] = useState(false);
  const location = useLocation();
  const [Edit, setEdit] = useState(true);
  const [editUser, seteditUser] = useState(); 
  const [editsubUser, seteditsubUser] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const handleClickOpen = () => {
    Swal.fire({
      title: "are You sure?",
      text: "You Want to Logout!",
      icon: "warning",
      dangerMode: true,
      confirmButtonText: "Yes",
      showCloseButton: true,
      cancelButtonText: "No",
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        auth.clearJWT(() => navigate("/login"));
      }
    });
  };
  const VendorDetails = (e) => {
    console.log("editsubUser::",editsubUser);
    if (
      editUser?.basicInfo?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result.role !== "Admin"
    ) {
      navigate(
        `/basic/${
          JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        }`,
        { state: { editUser } }
      );
    } else if (
      editsubUser?.basicInfo?.length > 0 && JSON.parse(window.sessionStorage.getItem("jwt")).result.role === "Admin"
    ) {
      navigate(`/basic/${
        JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
      }`, { state: { editUser } });
    } else {
      navigate("/basic", { state: { editUser } });
    }
  };
  const statutoryDetails = (e) => {
    if (
      editUser?.Statutory?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== "Admin"
    ) {
      navigate(
        `/statutory/${
          JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId
        }`,
        { state: { editUser } }
      );
    } else if (
      editsubUser?.Statutory?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.role === "Admin"
    ) {
      navigate(`/statutory/${params.userId}`, { state: { editUser } });
    } else {
      navigate("/statutory", { state: { editUser } });
    }
  };
  const complianceDetails = (e) => {
    if (
      editUser?.ComplianceDetail?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== "Admin"
    ) {
      navigate(
        `/ComplianceDetail/${
          JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId
        }`,
        { state: { editUser } }
      );
    } else if (
      editsubUser?.ComplianceDetail?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.role === "Admin"
    ) {
      navigate(`/ComplianceDetail/${params.userId}`, { state: { editUser } });
    } else {
      navigate("/ComplianceDetail", { state: { editUser } });
    }
  };
  const bankDetails = (e) => {
    if (
      editUser?.Bankdetail?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== "Admin"
    ) {
      navigate(
        `/bank/${
          JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId
        }`,
        { state: { editUser } }
      );
    } else if (
      editsubUser?.Bankdetail?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.role === "Admin"
    ) {
      navigate(`/bank/${params.userId}`, { state: { editUser } });
    } else {
      navigate("/bank", { state: { editUser } });
    }
  };
  const financialDetails = (e) => {
    if (
      editUser?.FinancialDetail?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== "Admin"
    ) {
      navigate(
        `/FinancialDetail/${
          JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId
        }`,
        { state: { editUser } }
      );
    } else if (
      editsubUser?.FinancialDetail?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.role === "Admin"
    ) {
      navigate(`/FinancialDetail/${params.userId}`, { state: { editUser } });
    } else {
      navigate("/FinancialDetail", { state: { editUser } });
    }
  };
  const redirectToMaster =(e)=>{
    let data = { master: false };
  sessionStorage.setItem("master", JSON.stringify(data));
    navigate("/userCreation");

  }
  const contactDetails = (e) => {
    if (
      editUser?.contactDetail?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== "Admin"
    ) {
      navigate(
        `/ContactTeam/${
          JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId
        }`,
        { state: { editUser } }
      );
    } else if (
      editsubUser?.contactDetail?.length > 0 &&
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.role === "Admin"
    ) {
      navigate(`/ContactTeam/${params.userId}`, { state: { editUser } });
    } else {
      navigate("/ContactTeam", { state: { editUser } });
    }
  };
  useEffect(() => {
    console.log("location.pathname",location.pathname)
    const storedData = sessionStorage.getItem("master");
    const data = storedData ? JSON.parse(storedData) : {};
    console.log("storedData",data.master)
    if (data.master===true) {
console.log("newReg::")
      sethasmaster(true);
    } else {
      console.log("notnewReg::")
      sethasmaster(false);
    }
     const queryParams = new URLSearchParams(location.search);
     const isMaster = queryParams.get("master") === "true";
    (async () => {
   await apiService
      .getAllCollection(
        JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId
      )
      .then((res) => {
        if (res.data.status === "success") {
          setEdit(true);
          seteditUser(res.data);
        } else {
          setEdit(false);
        }
      });

   await apiService
      .getAllCollection(JSON.parse(window.sessionStorage.getItem("subUserid")))
      .then((res) => {
        if (res.data.status === "success") {
          setEdit(true);
          seteditsubUser(res.data);
        } else {
          setEdit(false);
        }
      });
    })();
    
  }, [params.userId,location.search,location]);
  return (
    <>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand>
            {" "}
            <img className="img1" src={Logo1} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={VendorDetails}>Vendor Details</Nav.Link>
              <Nav.Link onClick={statutoryDetails}>Statutory Details</Nav.Link>
              <Nav.Link onClick={complianceDetails}>
                Compliance Details
              </Nav.Link>
              <Nav.Link onClick={bankDetails}>Bank Details</Nav.Link>
              <Nav.Link onClick={financialDetails}>Financial Details</Nav.Link>
              <Nav.Link onClick={contactDetails}>Contact Team</Nav.Link>
              {!hasmaster && (
              <Nav.Link onClick={handleClickOpen} id="b3">
              logOut
            </Nav.Link>
              )}
              {hasmaster && (
                <Nav.Link onClick={redirectToMaster}>Back To Master</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default App;